/* eslint-disable */

var chai = require('chai');
chai.should();

var library = {
  immutable: require('immutable')
};

require('../shared/tdd')(chai, describe, it, chai.assert, chai.expect, library);
