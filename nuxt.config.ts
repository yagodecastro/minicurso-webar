import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lucide-vue-next',
        'mermaid',
      ],
    },
  },
  devtools: { enabled: true },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'dracula',
          },
          langs: [
            'html',
            'mermaid',
            'mmd',
            'css',
            'javascript',
            'typescript',
            'bash',
            'json',
            'vue',
            'markdown',
          ],
        },
      },
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/**': { prerender: true },
  },
  compatibilityDate: '2024-04-03',
})
