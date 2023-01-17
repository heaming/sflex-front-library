const { loadEnv } = require('vite');
const { resolve } = require('path');
const getPackageJson = require('../utils/getPackageJson');

const context = process.cwd();
const { version } = getPackageJson();

const NODE_ENV_PRODUCTION = 'production';
const NODE_ENV_DEVELOPMENT = 'development';
const MODE_DEV = 'dev';

module.exports = ({ mode, command, envDir }) => {
  const absolutePath = resolve(context, envDir || '');
  const env = loadEnv(mode, absolutePath);
  const metaEnv = {
    ...env,
    MODE: mode,
    DEV: command === 'serve',
    PROD: command === 'build',
    VERSION: version,
    TIMESTAMP: command === 'build' ? Date.now() : undefined,
  };

  const enableProdDevTools = mode === MODE_DEV;

  Object.assign(process.env, {
    ...metaEnv,
    NODE_ENV: metaEnv.PROD ? NODE_ENV_PRODUCTION : NODE_ENV_DEVELOPMENT,
  });

  return {
    name: 'load-env',
    config() {
      return {
        define: {
          __VUE_IMPORT_META_ENV__: metaEnv,
          __VUE_PROD_DEVTOOLS__: enableProdDevTools,
        },
      };
    },
  };
};
