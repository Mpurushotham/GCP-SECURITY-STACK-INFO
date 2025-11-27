import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the code using process.env.API_KEY to work in the browser
    'process.env': process.env
  }
});