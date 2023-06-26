import { createHash } from 'crypto';
import { defineConfig } from '../config/vite';

export default defineConfig({
  configDir: '../',
  quasarSassVariables: '~dev/css/variables.scss',
  define: {
    __VUE_TEST_APP__: true,
  },
  openVisualizer: false,
  cssDevSourceMap: true,
  rollupOptions: {
    output: {
      entryFileNames: (chunkInfo) => {
        const hash = createHash('md5')
          .update(Object.values(chunkInfo.modules).map((m) => m.code).join())
          .digest('hex')
          .substr(0, 6);
        return `assets/[name].${hash}.js`;
      },
      chunkFileNames: (chunkInfo) => {
        if (chunkInfo.name === 'plugin-vue_export-helper') {
          return 'assets/[name].js';
        }
        const hash = createHash('md5')
          .update(Object.values(chunkInfo.modules).map((m) => m.code).join())
          .digest('hex')
          .substr(0, 6);
        return `assets/[name].${hash}.js`;
      },
      assetFileNames: () => 'assets/[name][extname]',
    },
  },
});
