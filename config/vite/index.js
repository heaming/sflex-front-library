const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');
const { vueI18n } = require('@intlify/vite-plugin-vue-i18n');
const { quasar, transformAssetUrls } = require('@quasar/vite-plugin');
const { default: eslint } = require('vite-plugin-eslint');
const { default: visualizer } = require('rollup-plugin-visualizer');
const autoImport = require('unplugin-auto-import/vite');
const { resolve } = require('path');

const loadEnv = require('./loadEnv');
const loadConfigAlias = require('./loadConfigAlias');
const loadPages = require('./loadPages');

const context = process.cwd();

const normalizeConfig = (config = {}) => ({
  pages: config.pages || {},
  pagesDir: config.pagesDir || 'src/entries',
  configDir: config.configDir || context,
  envDir: config.envDir || context,
  quasarOptions: config.quasarOptions || {},
  openVisualizer: config.openVisualizer === true,
  define: config.define || {},
  alias: config.alias || {},
});

exports.defineConfig = (config) => {
  config = normalizeConfig(config);

  // https://vitejs.dev/config/
  return defineConfig(({ mode, command }) => {
    const isBuild = command === 'build';
    const pluginArgs = { mode, command, ...config };

    return {
      plugins: [
        vue({
          template: { transformAssetUrls },
        }),

        vueI18n({
          compositionOnly: true,
          runtimeOnly: false,
        }),

        quasar({
          autoImportComponentCase: 'kebab',
          sassVariables: '@/css/variables.scss',
          ...config.quasarOptions,
        }),

        eslint(),

        autoImport({
          // targets to transform
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/, /\.vue\?vue/, // .vue
          ],

          // global imports to register
          imports: [
            // presets
            'vue',
            'vue-router',
            'vuex',
            'vue-i18n',
          ],
        }),

        // load env variables
        loadEnv(pluginArgs),

        // load alias from `compilerOptions.paths` property in jsconfig.json
        loadConfigAlias(pluginArgs),

        // load entry points
        loadPages(pluginArgs),

        config.openVisualizer && visualizer({
          filename: 'dist/visualizer/index.html',
          open: true,
        }),
      ],

      define: {
        // flag indicating the app is test only.
        __VUE_TEST_APP__: false,

        // flag indicating the app is mobile environment.
        __VUE_MOBILE_APP__: false,

        // enable/disable Options API support
        // https://github.com/vuejs/core/blob/main/packages/vue/README.md#bundler-build-feature-flags
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,

        ...(isBuild ? {} : {
          // realgrid use `global` that global object of nodejs.
          global: {},
        }),

        ...config.define,
      },

      resolve: {
        alias: {
          ...config.alias,
          '~assets': resolve(__dirname, '../../src/assets'),
          '~css': resolve(__dirname, '../../src/css'),
        },
      },

      build: {
        sourcemap: true,
      },
    };
  });
};
