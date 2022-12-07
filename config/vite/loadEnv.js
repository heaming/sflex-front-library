const { loadEnv } = require('vite');
const { resolve } = require('path');
const isInternalContext = require('../utils/isInternalContext');
const getPackageJson = require('../utils/getPackageJson');

const context = process.cwd();
const isOuterContext = !isInternalContext();
const { name, version } = getPackageJson();

const NODE_ENV_PRODUCTION = 'production';
const NODE_ENV_DEVELOPMENT = 'development';
const MODE_DEV = 'dev';

function configPlugin(mode, command, envDir, shouldTransform) {
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
    name: 'load-env:config',
    config() {
      if (shouldTransform) {
        return {
          optimizeDeps: {
            exclude: [`${name}/dist/env`],
          },
          define: {
            __VUE_PROD_DEVTOOLS__: enableProdDevTools,
          },
        };
      }

      return {
        define: {
          __IMPORT_META_ENV__: metaEnv,
          __VUE_PROD_DEVTOOLS__: enableProdDevTools,
        },
      };
    },
  };
}

function transformPlugin(pages, pagesDir) {
  const isMPA = Object.keys(pages).length > 0;

  const entryRegex = isMPA ? new RegExp(`${pagesDir}/\\w+/main\\.js$`) : /src\/main\.js$/;
  const envRegex = new RegExp(`node_modules/${name}/dist/env\\.js`);

  return {
    name: 'load-env:transform',
    transform(src, id) {
      if (entryRegex.test(id)) {
        return {
          code: `import "${name}/dist/env"\n${src}`,
          map: null,
        };
      }

      if (envRegex.test(id)) {
        return {
          code: `const __IMPORT_META_ENV__ = import.meta.env;\n${src}`,
          map: null,
        };
      }
    },
  };
}

module.exports = ({
  mode, command, envDir, pages, pagesDir,
}) => {
  const shouldTransform = isOuterContext
    && command === 'build';

  const plugins = [
    configPlugin(mode, command, envDir, shouldTransform),
  ];

  if (shouldTransform) {
    plugins.push(
      transformPlugin(pages, pagesDir),
    );
  }

  return plugins;
};
