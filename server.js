var fs = require('fs');
var url = require('url');
var http = require('http');
var st = require('st');
var Router = require('routes-router');
var response = require('response');
var Handlebars = require('handlebars');
var hbsLayouts = require('handlebars-layouts')(Handlebars);
var level = require('level');
var accountdown = require('accountdown');
var sublevel = require('level-sublevel');
var levelSession   = require('level-session');
var socketio = require('socket.io');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var getView = require('./util/get-view')(Handlebars);
var Sheets = require('./sheets');

var apiV2 = require('./routes/api-v2');
var sheets = require('./routes/sheets');
var accounts = require('./routes/accounts');
var sessions = require('./routes/sessions');

var config = require('./config');


module.exports = Server;


/*
* Register the layout view as the a handlebars layout
* so it can be used by partial views
*/

Handlebars.registerPartial('layout', fs.readFileSync('views/layout.html', 'utf8'));


/*
* Main server constructor function
*/

function Server (opts) {
  if (!(this instanceof Server)) return new Server(opts);
  opts || (opts = {});

  this.site = config.site;

  /*
  * Set path for static files
  */

  this.staticFiles = opts.staticFiles || __dirname + '/public';

  /*
  * Create leveldb using level-sublevel
  */

  this.db = level(opts.db || './data/db');


  /*
  * Create sublevel for sheets
  */

  this.sheets = Sheets(sublevel(this.db).sublevel('sheets', {
    valueEncoding: 'json'
  }));


  /*
  * Create sublevel for sessions using level-session
  */

  this.session = levelSession({
    db: sublevel(this.db).sublevel('sessions')
  });


  /*
  * Set up accountdown with accountdown-basic for account management
  */

  this.accounts = accountdown(this.db, {
    login: { basic: require('accountdown-basic') },
    keyEncoding: 'buffer',
    valueEncoding: 'json'
  });


  /*
  * Invites sublevel
  */

  this.invites = sublevel(this.db).sublevel('invites', {
    valueEncoding: 'json'
  });


  /*
  * Email
  */

  var options = {
    auth: {
      api_user: config.sendgrid.user,
      api_key: config.sendgrid.pass
    }
  };

  this.email = nodemailer.createTransport(sgTransport(options));


  /*
  * Set up the application's views
  */

  this.views = {};
  this.viewsDir = opts.viewsDir || __dirname + '/views/';
  this.createViews();


  /*
  *  Create the http server
  */

  this.createServer();


  /*
  * Set up the routes of the app
  */

  if (opts.defaultRoutes !== false) {
    apiV2.install(this);
    sheets.install(this);
    accounts.install(this);
    sessions.install(this);
  }
}


/*
*  Method for creating http server
*/

Server.prototype.createServer = function () {
  var self = this;


  /*
  *  Create router
  */

  this.router = Router();

  /*
  *  Static file server
  */

  var staticFiles = st({ path: this.staticFiles, url: '/public/' });


  /*
  *  Set up server with sessions, path matching for router, and static files
  */

  this.server = http.createServer(function (req, res) {
    if (staticFiles(req, res)) return;

    self.session(req, res, function () {
      self.router(req, res);
    });
  });
}


/*
*  listen method for starting the server
*/

Server.prototype.listen = function (port, cb) {
  this.server.listen(port, cb);
}


/*
*  Add a route to the server
*/

Server.prototype.route = function (path, cb) {
  var self = this;

  this.router.addRoute(path, function (req, res, opts) {
    req.session.get(req.session.id, function (err, account) {
      res.account = account;
      cb.call(self, req, res, opts);
    });
  });
}


/*
* Create views on application startup
*/

Server.prototype.createViews = function () {
  var self = this;

  fs.readdir(this.viewsDir, function (err, files) {
    files.forEach(function (file) {
      self.views[file.split('.')[0]] = getView(self.viewsDir + file);
    });
  });
}


/*
* Method for rendering html views
*/

Server.prototype.render = function (view, ctx) {
  return this.views[view]((ctx || {}));
}
