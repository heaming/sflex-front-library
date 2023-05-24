const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');
const { vueI18n } = require('@intlify/vite-plugin-vue-i18n');
const { quasar, transformAssetUrls } = require('@quasar/vite-plugin');
const { default: eslint } = require('vite-plugin-eslint');
const { default: visualizer } = require('rollup-plugin-visualizer');
const autoImport = require('unplugin-auto-import/vite');

const isInternalContext = require('../utils/isInternalContext');
const loadEnv = require('./loadEnv');
const loadConfigAlias = require('./loadConfigAlias');
const loadPages = require('./loadPages');

const context = process.cwd();

const normalizeConfig = (config = {}) => ({
  pages: config.pages || {},
  pagesDir: config.pagesDir || 'src/entries',
  configDir: config.configDir || context,
  envDir: config.envDir || context,
  quasarSassVariables: config.quasarSassVariables || '~/css/variables.scss',
  define: config.define || {},
  alias: config.alias || {},
  openVisualizer: config.openVisualizer === true,
  cssDevSourcemap: config.cssDevSourcemap === true,
  buildSourcemap: config.buildSourcemap === true,
  optimizeDepsInclude: config.optimizeDepsInclude || [],
  rollupOptions: config.rollupOptions || {},
});

exports.defineConfig = (config) => {
  config = normalizeConfig(config);

  // https://vitejs.dev/config/
  return defineConfig(({ mode, command }) => {
    const isBuild = command === 'build';
    const enableEslint = !isBuild || mode === 'dev';
    const pluginArgs = { mode, command, ...config };

    const defaultOptimizeDepsInclude = isInternalContext() ? [] : [
      'axios',
      'dayjs',
      'kw-lib',
      'lodash-es',
      'realgrid',
      'vue',
      'vue-i18n',
      'vue-router',
      'vuex',
    ];

    return {
      base: loadEnv(pluginArgs)?.config()?.define?.__VUE_IMPORT_META_ENV__?.VITE_CDN_ORIGIN || '/',
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
          sassVariables: config.quasarSassVariables,
        }),

        enableEslint && eslint(),

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
        // flag indicating the app is test only
        __VUE_TEST_APP__: false,

        // enable/disable Options API support
        // https://github.com/vuejs/core/blob/main/packages/vue/README.md#bundler-build-feature-flags
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,

        ...(isBuild ? {} : {
          // realgrid use `global` that  occur error in dev(serve command)
          global: {},
        }),

        ...config.define,
      },

      resolve: {
        alias: config.alias,
      },

      css: {
        devSourcemap: config.cssDevSourcemap,
      },

      build: {
        sourcemap: config.buildSourcemap,
        rollupOptions: config.rollupOptions,
      },

      optimizeDeps: {
        include: [
          ...config.optimizeDepsInclude,
          ...defaultOptimizeDepsInclude,
        ],
      },
    };
  });
};
