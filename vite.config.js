import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from other devices in the network
    port: 5173, // Default Vite port
    proxy: {
      '/api': {
        target: import.meta.env.VITE_BASE_URL, // Uses your .env backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes "/api" prefix before forwarding
      },
    },
  },
});
