/* eslint-disable */
import { defineConfig, type PluginOption } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';
import ViteVisualizer from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa'
import { VitePluginRadar } from 'vite-plugin-radar';

const maxAgeSeconds = 365 * 24 * 60 * 60; // Cache for 1 year

// https://stackoverflow.com/a/15802301
const headCommitHash = (): string | undefined => {
  try {
    return require('child_process')
      .execSync('git rev-parse HEAD')
      .toString();
  } catch (_) {
    return undefined;
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __HEAD_COMMIT_HASH__: JSON.stringify(headCommitHash()),
  },
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: './build',
  },
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{html,js,css,png,jpg,svg,ico,json,woff2,ttf,mp4}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: { maxEntries: 10, maxAgeSeconds },
            },
          },
          {
            urlPattern: ({ request }) => ['script', 'style', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: { maxEntries: 50, maxAgeSeconds },
            },
          },
          {
            urlPattern: ({ request }) => ['image', 'font'].includes(request.destination),
            handler: 'CacheFirst',
            options: {
              cacheName: 'media-cache',
              expiration: { maxEntries: 100, maxAgeSeconds },
            },
          },
        ],
      },
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    VitePluginRadar({
      enableDev: true,
      analytics: {
        id: 'G-366693052',
        // UA-136427840-2 // <--- old one, keeping here, for documentation purpose;
      },
    }),
    // last one is the visualizer
    ViteVisualizer({
      filename: './build/report-rollup-plugin-visualizer.html',
      brotliSize: true,
    }) as PluginOption,
  ],
});
