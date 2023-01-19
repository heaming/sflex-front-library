import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import eslint from 'vite-plugin-eslint';
import autoImport from 'unplugin-auto-import/vite';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const openVisualizer = mode === 'visualizer';

  return {
    plugins: [
      vue({
        template: transformAssetUrls,
      }),

      quasar({
        autoImportComponentCase: 'kebab',
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

        dts: resolve(__dirname, 'types/autoImport.d.ts'),

        eslintrc: {
          enabled: true,
          filepath: resolve(__dirname, 'config/eslint/autoImport.json'),
          globalsPropValue: 'readonly',
        },
      }),

      openVisualizer && visualizer({
        filename: 'dist/visualizer.html',
        open: true,
      }),
    ],

    define: {
      // enable/disable Options API support
      // https://github.com/vuejs/core/blob/main/packages/vue/README.md#bundler-build-feature-flags
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    },

    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'KwLib',
        formats: ['es'],
        fileName: 'index',
      },

      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [
          '@vee-validate',
          '@videojs-player/vue',
          'axios',
          'bootstrap-datepicker',
          'chart.js',
          'chartjs-plugin-datalabels',
          'dayjs',
          'dayjs/locale/ko',
          'dompurify',
          'fast-deep-equal',
          'jquery',
          'jszip',
          'klona',
          'lodash-es',
          'qs',
          // 'quasar',
          // 'quasar/lang/en-US',
          // 'quasar/lang/ko-KR',
          'realgrid',
          'sortablejs',
          'suneditor',
          'suneditor/src/lang',
          'suneditor/src/plugins',
          'vee-validate',
          'viewerjs',
          'video.js',
          'videojs-landscape-fullscreen',
          'vue',
          'vue-chartjs',
          'vue-i18n',
          'vue-router',
          'vuex',
        ],
      },
    },
  };
});
