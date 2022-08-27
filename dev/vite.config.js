import { defineConfig } from '../config/vite';

export default defineConfig({
  configDir: '../',
  openVisualizer: false,
  quasarOptions: {
    sassVariables: '~dev/css/variables.scss',
  },
  define: {
    __VUE_TEST_APP__: true,
  },
});
