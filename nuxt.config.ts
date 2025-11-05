// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  alias: {
    "@assets": "/assets",
    "@components": "/components",
    "@/": "/",
  },
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/api/v1",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || "My Blog",
    },
  },
});
