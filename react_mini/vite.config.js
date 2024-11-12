import path from 'path';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

export default {
  // Your Vite config here
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
