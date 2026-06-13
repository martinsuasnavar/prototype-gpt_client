// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-05-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],

  future: {
    compatibilityVersion: 4,
  },
  components: [
    {
      path: '~/app/components',
      global: true, 
      pathPrefix: false, 
    }
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        // If crawling misses pages, explicitly add your primary index hubs here:
        // '/blog', '/docs'
      ]
    }
  },
  // Crucial for Nuxt Content in Nuxt 4 to prevent SSR/CSR sync mismatches
  routeRules: {
    '/': { prerender: true },
    // This tells Vercel to pre-render every markdown file parsed by Nuxt Content
    '/**': { prerender: true } 
  }
})
