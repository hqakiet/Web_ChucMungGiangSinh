import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [react()],
  base: '/Web_ChucMungGiangSinh/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
});
