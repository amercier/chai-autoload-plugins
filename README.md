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
-------------------------------------------------------

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

See [Mocha integration tests](./specs/integration/mocha) for more details.

Usage with other frameworks
---------------------------

The only difference is that you have to have to require `chai-autoload-plugins` manually in the test
files:

`test.js`

```js
const chai = require('chai');
require('chai-autoload-plugins');

expect(true).to.be.true();
```

See [Jasmine integration tests](./specs/integration/jasmine) or
[Jest integration tests](./specs/integration/jest) for more details.

Options
-------

By default, `chai-autoload-plugins` look for NPM modules whose name start with  `chai-` or ends
with `-chai`. This behavior can be overriden by declaring a `chaiAutoloadPlugins` field in
`package.json`. Ex:

```json
  "devDependencies": {
    "chai": "^3.5.0",
    "chai-autoload-plugins": "*",
    "my-custom-chai-plugin": "*",
    "mocha": "^3.1.0"
  },
  "chaiAutoloadPlugins": {
    "include": ["my-custom-chai-plugin"],
    "exclude": []
  }
```

Note: if an array is given, it will include/exclude the exact names in the array. If a string is
given, it will interpret it as a regular expression (ex: `"include": "^.*-chai-.*$"`).

### `include`

Regular expression or list of plugins to include.

- Type: `String|String[]`
- Default: `"(^chai|-chai$)"`

### `exclude`

Regular expression or list of plugins to exclude. Precedes `include`.

- Type: `String|String[]`
- Default: `[]`

Notes
-----

### Browser support

This modules needs to read the contents of `package.json` on the disk, and therefore is not
compatible with in-browser tests (ex: Karma). It is and will only be targeting NodeJS.
