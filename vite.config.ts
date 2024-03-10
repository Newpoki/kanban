import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react(), TanStackRouterVite()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
