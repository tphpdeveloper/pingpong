// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath, URL } from 'node:url';

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
      htmlAttrs: {
        lang: 'uk-UA'
      }
    }
  },
  alias: {
    'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
    'components': fileURLToPath(new URL('./components', import.meta.url))
  }
})
