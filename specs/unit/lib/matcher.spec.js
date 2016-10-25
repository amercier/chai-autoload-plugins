import { expect } from 'chai';
import {
  buildRegExpMatcher,
  buildArrayMatcher,
  buildMatcher,
  buildFilter,
} from '../../../src/lib/matcher';

/** @test {buildRegExpMatcher} */
describe('buildRegExpMatcher', () => {
  it('exists', () => expect(buildRegExpMatcher).to.exist);

  it('returns a function', () => expect(buildRegExpMatcher(/(foo|bar)/)).to.be.a('function'));

  it('returns a function that matches a regexp', () => {
    const matcher = buildRegExpMatcher(/(foo|bar)/);
    expect(matcher('foo')).to.be.true;
    expect(matcher('bar')).to.be.true;
    expect(matcher('baz')).to.be.false;
    expect(matcher('Foo')).to.be.false;
    expect(matcher('bar foo baz')).to.be.true;
  });
});

/** @test {buildArrayMatcher} */
describe('buildArrayMatcher', () => {
  it('exists', () => expect(buildArrayMatcher).to.exist);

  it('returns a function', () => expect(buildArrayMatcher('')).to.be.a('function'));

  it('returns a function that matches an array', () => {
    const matcher = buildArrayMatcher(['foo', 'bar']);
    expect(matcher('foo')).to.be.true;
    expect(matcher('bar')).to.be.true;
    expect(matcher('baz')).to.be.false;
    expect(matcher('Foo')).to.be.false;
    expect(matcher('bar foo baz')).to.be.false;
  });
});

/** @test {buildMatcher} */
describe('buildMatcher', () => {
  it('exists', () => expect(buildMatcher).to.exist);

  it('returns a function', () => {
    expect(buildMatcher(/(foo|bar)/)).to.be.a('function');
    expect(buildMatcher('')).to.be.a('function');
  });

  it('returns a function that matches a regexp when a string is passed', () => {
    const matcher = buildMatcher('(foo|bar)');
    expect(matcher('foo')).to.be.true;
    expect(matcher('bar')).to.be.true;
    expect(matcher('baz')).to.be.false;
    expect(matcher('Foo')).to.be.false;
    expect(matcher('bar foo baz')).to.be.true;
  });

  it('returns a function that matches an array when an array is passed', () => {
    const matcher = buildMatcher(['foo', 'bar']);
    expect(matcher('foo')).to.be.true;
    expect(matcher('bar')).to.be.true;
    expect(matcher('baz')).to.be.false;
    expect(matcher('Foo')).to.be.false;
    expect(matcher('bar foo baz')).to.be.false;
  });
});

/** @test {buildFilter} */
describe('buildFilter', () => {
  it('exists', () => expect(buildFilter).to.exist);

  it('returns a function', () => expect(buildFilter('(foo|ba)', ['baz'])).to.be.a('function'));

  it('returns a function that filter includes/excludes', () => {
    const filter = buildFilter('(foo|ba)', ['baz']);
    expect(filter('foo')).to.be.true;
    expect(filter('bar')).to.be.true;
    expect(filter('baz')).to.be.false;
    expect(filter('Foo')).to.be.false;
    expect(filter('bar foo zee')).to.be.true;
    expect(filter('bar foo baz')).to.be.true;
  });
});
