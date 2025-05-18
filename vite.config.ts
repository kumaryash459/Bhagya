import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mochaPlugins } from '@getmocha/vite-plugins';

export default defineConfig({
  plugins: [...mochaPlugins(process.env), react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 3000,
  },
  define: {
    'process.env': process.env
  }
});

