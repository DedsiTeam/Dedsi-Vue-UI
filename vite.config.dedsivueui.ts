import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
        dts({
            tsconfigPath: './tsconfig.app.json',
            include: ['src/components/**/*'],
            insertTypesEntry: true,
            rollupTypes: true
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/components/index.ts'),
            name: 'DedsiVueUI',
            fileName: (format) => `dedsi-vue-ui.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: [
                'vue',
                'vue-router',
                'qrcode',
                '@ant-design/icons-vue'
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    'vue-router': 'VueRouter',
                    'qrcode': 'QRCode',
                    '@ant-design/icons-vue': 'AntDesignIconsVue'
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'theme.css';
                    }
                    return assetInfo.name || '[name][extname]';
                }
            }
        },
        cssCodeSplit: false
    }
})
