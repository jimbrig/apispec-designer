import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swagger-ui-react', '@rapidocweb/rapidoc', 'redoc']
  },
  build: {
    commonjsOptions: {
      include: [/swagger-ui-react/, /@rapidocweb\/rapidoc/, /redoc/]
    }
  }
});