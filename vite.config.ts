import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the code using process.env.API_KEY to work in the browser
    // We strictly define it to avoid exposing the entire env object if unnecessary, 
    // but mapping process.env is the standard fix for the SDK.
    'process.env': process.env
  }
});