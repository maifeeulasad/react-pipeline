import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import ViteVisualizer from "rollup-plugin-visualizer";
import { VitePluginRadar } from 'vite-plugin-radar'

// https://stackoverflow.com/a/15802301
const headCommitHash = (): string | undefined => {
  try {
    return require('child_process')
      .execSync('git rev-parse HEAD')
      .toString();
  } catch (_) { }
  return undefined
}

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
    }),
  ],
})