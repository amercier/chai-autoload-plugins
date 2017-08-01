import { buildFilter } from './matcher';

/**
 * Load plugins from a list, including/excluding some based on a given configuration
 * @param {string[]} plugins List of plugins
 * @param {function(plugin:string): *} loadPlugin Function that loads a plugin
 * @param {object} settings Settings
 * @property {?(string|string[])} settings.include Regular expression, or array of names to include
 * @property {?(string|string[])} settings.exclude Regular expression, or array of names to exclude
 *                                (takes precence over `include`)
 * @return {*[]} Values returned by `loadPlugin`
 */
export function loadPlugins(plugins, loadPlugin, { include, exclude }) {
  return plugins
    .filter(buildFilter(include, exclude))
    .map(loadPlugin);
}

/**
 * Load Chai plugins of a package
 * @param {object} packageDefinition Content of `package.json`
 * @property {string[]} devDependencies=[] List of all available plugins
 * @property {?object} chaiAutoloadPlugins={} Settings
 * @property {?(string|string[])} chaiAutoloadPlugins.include Regular expression, or array of names
 *                                                            to include
 * @property {?(string|string[])} chaiAutoloadPlugins.exclude Regular expression, or array of names
 *                                                            to exclude (takes precence over
 *                                                            `include`)
 * @param {?function(name: string): object} _require=require CommonJS-like `require` method
 * @param {?object} chai=_require('chai') Chai
 */
export function loadPackagePlugins(
  packageDefinition,
  _require = require,
  chai = _require('chai'),
) {
  const { devDependencies = [], chaiAutoloadPlugins: config = {} } = packageDefinition;
  const plugins = Object.keys(devDependencies);
  const loadPlugin = (name) => {
    const plugin = _require(name);
    if (typeof plugin === 'function') return chai.use(plugin);
    return null;
  };
  const cfg = Object.assign({ include: '(^chai-|-chai$)', exclude: [] }, config);
  return loadPlugins(plugins, loadPlugin, cfg);
}
