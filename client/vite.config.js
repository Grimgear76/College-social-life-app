//tells Vite how to run, build, and resolve your app.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'scenes': path.resolve(__dirname, 'src/scenes'),
    },
  },
});




