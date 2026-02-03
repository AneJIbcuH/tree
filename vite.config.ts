import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component',
      svgoConfig: {
        plugins: [
          {
            name: 'removeStyleElement',
          },
        ],
      },
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'motion-v': ['motion'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    Components({
      dts: 'src/components.d.ts',
    }),
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: true,
  },
});
