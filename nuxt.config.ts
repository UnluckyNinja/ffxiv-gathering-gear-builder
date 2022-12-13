export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  // vite: {
  //   devBundler: 'legacy',
  //   define: {
  //     'import.meta.vitest': 'undefined',
  //   },
  // },
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    preference: 'dark',
    classSuffix: '',
  },
})
