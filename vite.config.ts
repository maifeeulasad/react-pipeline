import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import ViteVisualizer from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: './build',
  },
  base: './',
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    // last one is the visualizer
    ViteVisualizer({
      filename: './build/report-rollup-plugin-visualizer.html',
      brotliSize: true,
    }),
  ],
})