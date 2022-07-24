import { defineConfig } from '../config/vite';

export default defineConfig({
  quasarOptions: {
    sassVariables: '~/css/variables.scss',
  },
  configDir: '../',
  openVisualizer: false,
  define: {
    __VUE_TEST_APP__: true,
  },
});
