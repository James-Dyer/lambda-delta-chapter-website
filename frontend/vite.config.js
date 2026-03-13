import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    // Treat .js files with JSX as jsx so Rollup's import-analysis can parse them
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, { loader: 'jsx' });
      },
    },
    react(),
  ],
  base: '/',
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: { provider: 'v8' },
  },
});
