// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-01', // Your current updated compatibility date
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],

  // Explicitly link Nuxt 4's app directory to the component scanner
    future: {
    compatibilityVersion: 4,
  },
  components: [
    {
      path: '~/app/components',
      global: true, // Esto fuerza el registro global para Nuxt Content
      pathPrefix: false, // This makes sure you don't have to write ::AppComponentsMainUi
    }
  ]
})