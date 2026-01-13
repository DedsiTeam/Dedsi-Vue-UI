import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    shortcuts: [
        ['flex-center', 'flex items-center justify-center'],
        ['flex-between', 'flex items-center justify-between'],
        ['glass-card-base', 'bg-white/70 backdrop-blur-md border border-white/30 rounded-16 shadow-lg'],
    ],
    theme: {
        colors: {
            primary: '#1677ff',
        }
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'Inter',
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})
