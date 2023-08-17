import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  plugins: [react()],
});

// import { defineConfig } from 'vite';
// import path from 'path';
// import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr';

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '/',
//   resolve: {
//     alias: {
//       '@assets': path.resolve(__dirname, './src/assets/'),
//       '@features': path.resolve(__dirname, './src/features/'),
//       '@pages': path.resolve(__dirname, './src/pages/'),
//       '@utils': path.resolve(__dirname, './src/utils/'),
//       '@hooks': path.resolve(__dirname, './src/hooks/'),
//       '@styles': path.resolve(__dirname, './src/styles/'),
//       '@layouts': path.resolve(__dirname, './src/layouts/'),
//       '@components': path.resolve(__dirname, './src/components/'),
//       '@services': path.resolve(__dirname, './src/services/'),
//       '@': path.resolve(__dirname, './src/'),
//     },
//   },
//   plugins: [react(), svgr()],
//   server: {
//     open: true,
//   },
//   optimizeDeps: {
//     include: ['esm-dep > cjs-dep'],
//   },
//   define: { 'process.env': process.env },
// });
