import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  components: {
    dirs: [
      {
        path: '~/components/global',
        global: true,
        pathPrefix: false,
      },
      '~/components',
    ],
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'lucide-vue-next', 'mermaid'],
    },
    build: {
      chunkSizeWarningLimit: 2500,
      sourcemap: false,
    },
  },
  sourcemap: {
    server: false,
    client: false,
  },
  devtools: { enabled: true },

  routeRules: {
    '/': { prerender: true },
    '/**': { prerender: true },
  },
  nitro: {
    preset: 'static',
  },
  compatibilityDate: '2024-04-03',
})
