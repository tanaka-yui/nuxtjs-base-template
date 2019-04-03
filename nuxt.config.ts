import NuxtConfiguration from '@nuxt/config'
import DotEnv from 'dotenv-webpack'

import pkg from './package.json'

const nuxtConfig: NuxtConfiguration = {
  /*
   ** SSR & SPA
   */
  mode: 'universal',

  /*
   ** nuxt.js root dir
   */
  srcDir: 'src',

  /*
   ** middleware root
   */
  serverMiddleware: ['~/server'],

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/variables.css',
    '~/assets/css/main.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/element-ui'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (config) {
        if (config.module && ctx.isDev && ctx.isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(ts|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        }
        if (ctx.isClient) {
          config.performance = config.performance || {}
          config.performance.maxEntrypointSize = 1000 * 1024
          config.performance.maxAssetSize = 1000 * 1024
        }
        if (config.plugins) {
          config.plugins = config.plugins = [...config.plugins, new DotEnv()]
        }
      }
    }
  },
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
  }
}

module.exports = nuxtConfig
