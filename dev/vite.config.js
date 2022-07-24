import { defineConfig } from '../config/vite';

export default defineConfig({
  configDir: '../',
  openVisualizer: false,
  define: {
    __VUE_TEST_APP__: true,
  },
});
