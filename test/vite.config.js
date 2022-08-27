import { defineConfig } from '../config/vite';

export default defineConfig({
  configDir: '../',
  openVisualizer: false,
  quasarOptions: {
    sassVariables: '~test/css/variables.scss',
  },
});
