/* eslint import/no-dynamic-require:0, global-require:0 */

const { join } = require('path');
const { loadPackagePlugins } = require('./loader');

const packageDefinition = require(join(process.cwd(), 'package.json'));
loadPackagePlugins(packageDefinition);
