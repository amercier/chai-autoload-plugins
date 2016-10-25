import { expect } from 'chai';
import sinon from 'sinon';
import {
  loadPlugins,
  loadPackagePlugins,
} from '../../../src/lib/loader';

const identity = o => o;
const plugins = ['foo', 'bar', 'baz'];
const config = { include: '(foo|ba)', exclude: ['baz'] };

describe('loadPlugins', () => {
  it('loads included plugins', () => {
    expect(loadPlugins(plugins, identity, config)).to.contain('foo', 'bar');
  });

  it('does not load excluded plugins', () => {
    expect(loadPlugins(plugins, identity, config)).not.to.contain('baz');
  });
});

describe('loadPackagePlugins', () => {
  const packageDefinition = {
    devDependencies: plugins.reduce((obj, val) => { obj[val] = '*'; return obj; }, {}), // eslint-disable-line no-param-reassign
    chaiAutoloadPlugins: config,
  };

  function getMocks() {
    const use = sinon.spy();
    const chai = { use };
    const modules = {
      chai, foo: 'foo', bar: 'bar', baz: 'baz', barthis: 'barthis', '../../package.json': { name: 'barthis' },
    };
    const require = name => modules[name];
    return { use, require, modules };
  }

  it('loads included plugins', () => {
    const { require, use, modules } = getMocks();

    loadPackagePlugins(packageDefinition, require);
    sinon.assert.calledWith(use, modules.foo);
    sinon.assert.calledWith(use, modules.bar);
  });

  it('does not load excluded plugins', () => {
    const { require, use, modules } = getMocks();

    loadPackagePlugins(packageDefinition, require);
    sinon.assert.neverCalledWith(use, modules.baz);
    sinon.assert.neverCalledWith(use, modules.this);
  });
});
