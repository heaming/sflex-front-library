import { defineConfig } from '../config/vite';

export default defineConfig({
  configDir: '../',
  quasarSassVariables: '~dev/css/variables.scss',
  define: {
    __VUE_TEST_APP__: true,
    __VUE_PROD_DEVTOOLS__: true,
  },
  openVisualizer: false,
  cssDevSourceMap: true,
});
