/* eslint-disable */

var path = require('path');

function resolveAfterDelay(result, delay) {
  return new Promise(function (resolve) {
    setTimeout(function() { resolve(result) }, delay);
  });
}

function describeChaiAjvJsonSchema(chai, describe, it, assert, expect, library) {
  chai.ajv.addSchema({
    title: 'Test Schema',
    type: 'object',
    properties: {
      'firstName': { type: 'string' },
      'lastName': { type: 'string' },
      'age': { type: 'integer', minimum: 0, description: 'Age in years' },
    },
    required: ['firstName', 'lastName']
  }, 'test_schema');

  describe('chai-ajv-json-schema', function() {
    it('supports the expect syntax', function() {
      expect({ firstName: 'John', lastName: 'Doe' }).to.be.validWithSchema('test_schema');
      expect({ firstName: 'John', lastName: 'Doe', age: 20 }).to.be.validWithSchema('test_schema');
    });
  });
}

function describeChaiAsPromised(chai, describe, it, assert, expect, library) {
  describe('chai-as-promised', function() {
    it('supports the should syntax', function() {
      return resolveAfterDelay('foo').should.eventually.equal('foo');
    });

    it('supports the expect syntax', function() {
      return expect(resolveAfterDelay('bar')).to.eventually.equal('bar');
    });
  });
}

function describeChaiCheckmark(chai, describe, it, assert, expect, library) {
  describe('chai-checkmark', function() {
    it('supports the should syntax', function (next) {
      expect(2).checks(next);
      'sync test'.should.be.a('string').mark()
      setTimeout(function() {
        'async test'.should.be.a('string').mark()
      }, 0);
    });
  });
}

function describeChaiDatetime(chai, describe, it, assert, expect, library) {
  describe('chai-datetime', function() {
    const date = new Date(1985, 9, 12); // Oct. 12, 1985

    it('supports the should syntax', function () {
      (new Date(1985, 9, 12)).should.equalDate(date);
      (new Date(1955, 10, 5)).should.not.equalDate(date);
    });

    it('supports the expect syntax', function() {
      expect(new Date(1985, 9, 12)).to.equalDate(date);
      expect(new Date(1955, 10, 5)).not.to.equalDate(date);
    });

    it('supports the assert syntax', function() {
      assert.equalDate(new Date(1985, 9, 12), date);
    });
  });
}

function describeChaiFuzzy(chai, describe, it, assert, expect, library) {
  describe('chai-fuzzy', function() {
    it('supports the should syntax', function () {
      ({ a: 'a' }).should.be.like({ a: 'a' });
      ({ a: 'a' }).should.not.be.like({ a: 'a', b: 'b' });
    });

    it('supports the expect syntax', function() {
      expect({ a: 'a' }).to.be.like({ a: 'a' });
      expect({ a: 'a' }).not.to.be.like({ a: 'a', b: 'b' });
    });

    it('supports the assert syntax', function() {
      assert.like({ a: 'a' }, { a: 'a' });
      assert.notLike({ a: 'a' }, { a: 'a', b: 'b' });
    });
  });
}

function describeChaiImmutable(chai, describe, it, assert, expect, library) {
  describe('chai-immutable', function() {
    it('supports the expect syntax', function() {
      var List = library.immutable.List;
      expect(List()).to.be.empty;
      expect(List.of(1, 2, 3)).to.not.be.empty;
    });
  });
}

function describeChaiJsonSchema(chai, describe, it, assert, expect, library) {
  describe('chai-json-schema', function() {
    var fruitSchema = {
      title: 'fresh fruit schema v1',
      type: 'object',
      required: ['skin', 'colors', 'taste'],
      properties: {
        colors: { type: 'array', minItems: 1, uniqueItems: true, items: { type: 'string' } },
        skin: { type: 'string' },
        taste: { type: 'number', minimum: 5 }
      }
    };

    var goodApple = { skin: 'thin', colors: ['red', 'green', 'yellow'], taste: 10 };
    var badApple = { colors: ['brown'], taste: 0, worms: 2 };

    it('supports the expect syntax', function() {
      expect(goodApple).to.be.jsonSchema(fruitSchema);
      expect(badApple).to.not.be.jsonSchema(fruitSchema);
    });

    it('supports the should syntax', function() {
      goodApple.should.be.jsonSchema(fruitSchema);
      badApple.should.not.be.jsonSchema(fruitSchema);
    });

    it('supports the assert syntax', function() {
      assert.jsonSchema(goodApple, fruitSchema);
      assert.notJsonSchema(badApple, fruitSchema);
    });
  });
}

function describeChaiString(chai, describe, it, assert, expect, library) {
  describe('chai-string', function() {
    it('supports the assert syntax', function() {
      assert.startsWith('abcdef', 'abc');
      assert.endsWith('abcdef', 'def');
      assert.equalIgnoreCase('abcdef', 'AbCdEf');
      assert.equalIgnoreSpaces('abcdef', 'a\nb\tc\r d  ef');
    });

    it('supports the expect syntax', function() {
      expect('abcdef').to.startsWith('abc');
      expect('abcdef').to.endsWith('def');
      expect('abcdef').to.equalIgnoreCase('AbCdEf');
      expect('abcdef').to.equalIgnoreSpaces('a\nb\tc\r d  ef');
    });

    it('supports the should syntax', function() {
      'abcdef'.should.startWith('abc');
      'abcdef'.should.endWith('def');
    });
  });
}

function describeDirtyChai(chai, describe, it, assert, expect, library) {
  describe('dirty-chai', function() {
    it('supports the default chai syntax', function() {
      expect(true).to.be.true;
    });

    it('supports the dirty-chai syntax', function() {
      expect(true).to.be.true();
    });
  });
}

module.exports = function(chai, describe, it, assert, expect, library) {
  describeChaiAjvJsonSchema(chai, describe, it, assert, expect, library);
  describeChaiAsPromised(chai, describe, it, assert, expect, library);
  describeChaiCheckmark(chai, describe, it, assert, expect, library);
  describeChaiDatetime(chai, describe, it, assert, expect, library);
  describeChaiFuzzy(chai, describe, it, assert, expect, library);
  describeChaiImmutable(chai, describe, it, assert, expect, library);
  describeChaiJsonSchema(chai, describe, it, assert, expect, library);
  describeChaiString(chai, describe, it, assert, expect, library);
  describeDirtyChai(chai, describe, it, assert, expect, library);
};
