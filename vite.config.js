import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({ 
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            manifest: {
                name: 'DontAskToAsk',
                short_name: 'dontasktoask',
                description: 'Dont Ask To Ask, Just Ask',
                theme_color: '#e91e63',
                icons: [
                  {
                    src: '/assets/icons/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                  },
                  {
                    src: '/assets/icons/android-chrome-maskable-512x512',
                    sizes: '512x512',
                    type: 'image/png'
                  }
                ]
              }
        }),
    ],
    build: {
        outDir: './docs',
        rollupOptions: {
            input: {
                main: './index.html',
                404: './404.html'
            }
        }
    }
});