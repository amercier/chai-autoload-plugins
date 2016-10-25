chai-autoload-plugins
=====================

Automatically load chai plugins declared in `package.json`.

[![Latest Stable Version](https://img.shields.io/npm/v/chai-autoload-plugins.svg)](https://www.npmjs.com/package/chai-autoload-plugins)
[![License](https://img.shields.io/npm/l/chai-autoload-plugins.svg)](https://www.npmjs.com/package/chai-autoload-plugins)
[![Build Status](https://img.shields.io/travis/amercier/chai-autoload-plugins/master.svg)](https://travis-ci.org/amercier/chai-autoload-plugins)

[![Dependency Status](http://img.shields.io/gemnasium/amercier/chai-autoload-plugins.svg)](https://gemnasium.com/amercier/chai-autoload-plugins)
[![NPM Downloads](https://img.shields.io/npm/dm/chai-autoload-plugins.svg)](https://www.npmjs.com/package/chai-autoload-plugins)
[![Test Coverage](https://img.shields.io/codecov/c/github/amercier/chai-autoload-plugins/master.svg)](https://codecov.io/github/amercier/chai-autoload-plugins?branch=master)
[![API Documentation](https://doc.esdoc.org/github.com/amercier/chai-autoload-plugins/badge.svg)](https://doc.esdoc.org/github.com/amercier/chai-autoload-plugins/)
[![Code Climate](https://img.shields.io/codeclimate/github/amercier/chai-autoload-plugins.svg)](https://codeclimate.com/github/amercier/chai-autoload-plugins)


Installation
------------

    npm install --save-dev chai-autoload-plugins

Usage with [Mocha](https://www.npmjs.com/package/mocha)
----------------

Example using [dirty-chai](https://www.npmjs.com/package/dirty-chai):

`package.json`

```json
  "devDependencies": {
    "chai": "^3.5.0",
    "chai-autoload-plugins": "*",
    "dirty-chai": "^1.2.2",
    "mocha": "^3.1.0"
  }
```

`test.js`

```js
const chai = require('chai');

expect(true).to.be.true();
```

Run:

```
node_modules/.bin/mocha --require chai-autoload-plugins test.js
```
