import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the existing process.env.API_KEY code to work, 
    // though in Vite it's usually import.meta.env
    'process.env': process.env
  }
});