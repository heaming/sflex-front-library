const { resolve } = require('path');
const getConfigAlias = require('../utils/getConfigAlias');

const reservedAliasKeys = [
  '~assets',
  '~css',
];

const context = process.cwd();

function resolveAlias(configDir) {
  const absolutePath = resolve(context, configDir || '');
  return getConfigAlias(absolutePath)
    .reduce((a, [k, v]) => { a[k] = v; return a; }, {});
}

module.exports = ({ configDir }) => {
  const alias = resolveAlias(configDir);

  reservedAliasKeys.forEach((key) => {
    if (key in alias) {
      throw new Error(`The alias '${key}' is reserved, do not use this.`);
    }
  });

  return {
    name: 'load-config-alias',
    config: () => ({
      resolve: {
        alias,
      },
    }),
  };
};
