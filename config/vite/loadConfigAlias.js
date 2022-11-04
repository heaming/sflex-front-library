const { resolve } = require('path');
const getConfigAlias = require('../utils/getConfigAlias');

const context = process.cwd();

function resolveAlias(configDir) {
  const absolutePath = resolve(context, configDir || '');
  return getConfigAlias(absolutePath)
    .reduce((a, [k, v]) => { a[k] = v; return a; }, {});
}

module.exports = ({ configDir }) => ({
  name: 'load-config-alias',
  config: () => ({
    resolve: {
      alias: resolveAlias(configDir),
    },
  }),
});
