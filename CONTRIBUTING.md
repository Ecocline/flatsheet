# Contributing to flatsheet

Please contribute to this repository if any of the following is true:
- You have expertise in community development, communication, or education
- You want open source communities to be more collaborative and inclusive
- You want to help lower the burden to first time contributors

# How to contribute

**Prerequisites:**  
 - Familiarity with [GitHub PRs](https://help.github.com/articles/using-pull-requests) (pull requests) and issues.
 - Knowledge of [markdown](https://help.github.com/articles/markdown-basics/) for editing `.md` documents.
 - Experience with or interest in learning JavaScript.

**In particular, this community seeks the following types of contributions:**
- ideas: participate in an issues thread or start your own to have your voice heard.
- design: create mockups & prototypes
- write: contribute your expertise in an area by helping us expand the included content
- copy editing: fix typos, clarify language, and generally improve the quality of the content
- formatting: help keep content easy to read with consistent formatting
- code: fix issues or contribute new features to this or any related projects

# Communication

- **[flatsheet on Github](http://github.com/flatsheet)**
- **[Discussions, tasks, and issue reporting](http://github.com/flatsheet/flatsheet/issues)**
- **[Chat on Gitter](https://gitter.im/flatsheet/flatsheet)**

GitHub issues are the primary way for communicating about specific proposed
changes to this project.

In both contexts, please follow the conduct guidelines. Language issues
are often contentious and we'd like to keep discussion brief, civil and focused
on what we're actually doing, not wandering off into too much imaginary stuff.

# Conduct

We are committed to providing a friendly, safe and welcoming environment for
all, regardless of gender, sexual orientation, disability, ethnicity, religion,
or similar personal characteristic.

On IRC, please avoid using overtly sexual nicknames or other nicknames that
might detract from a friendly, safe and welcoming environment for all.

Please be kind and courteous. There's no need to be mean or rude.
Respect that people have differences of opinion and that every design or
implementation choice carries a trade-off and numerous costs. There is seldom
a right answer, merely an optimal answer given a set of values and
circumstances.

Please keep unstructured critique to a minimum. If you have solid ideas you
want to experiment with, make a fork and see how it works.

We will exclude you from interaction if you insult, demean or harass anyone.
That is not welcome behaviour. We interpret the term "harassment" as
including the definition in the
[Citizen Code of Conduct](http://citizencodeofconduct.org/);
if you have any lack of clarity about what might be included in that concept,
please read their definition. In particular, we don't tolerate behavior that
excludes people in socially marginalized groups.

Private harassment is also unacceptable. No matter who you are, if you feel
you have been or are being harassed or made uncomfortable by a community
member, please contact one of the channel ops or any of the core team
immediately. Whether you're a regular contributor or a newcomer, we care about
making this community a safe place for you and we've got your back.

Likewise any spamming, trolling, flaming, baiting or other attention-stealing
behaviour is not welcome.

# Steps to contributing

- Tasks are run using npm run scripts. Review the scripts object in the package.json file for details.
- Files in the `public` directory are generated by npm scripts
- Fork this repository.
- Run `npm install`
- Run `npm run watch` to build css & browser js
- Run `npm start` to start the server
- Create a branch for your changes
- Include tests if applicable
- Add/edit documentation for any changes
- Submit a pull request

> This document is inspired by and uses content from https://github.com/jden/CONTRIBUTING.md