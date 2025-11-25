import vuetifyConfig from './config/vuetify.config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['vuetify-nuxt-module'],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: vuetifyConfig,
  },
  css: ['normalize.css/normalize.css', '~/assets/css/main.css'],
  alias: {
    '@root': process.cwd(),
  },
  plugins: ['./plugins/firebase-init.client.ts'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000',
      apiPersonPrefix:
        process.env.NUXT_PUBLIC_API_PERSON_PREFIX || '/api/v1/person',
      apiAdminPrefix:
        process.env.NUXT_PUBLIC_API_ADMIN_PREFIX || '/api/v1/admin',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'My Blog',
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  },
});
