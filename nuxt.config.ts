// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
    // @ts-expect-error: compatibilityDate not yet in Nuxt's type defs
    compatibilityDate: '2025-06-11'
  },

  modules: ['@nuxt/eslint', "vuetify-nuxt-module"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'fa',
      }
    }
  }
})
