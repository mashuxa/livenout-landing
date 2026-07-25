import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    emptyOutDir: false,
    rollupOptions: {
      input: fileURLToPath(new URL('./test/index.html', import.meta.url)),
    },
  },
});
