// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  meta: {
    title: '中赋能云商科技',
    meta: [
        { charset: 'utf-8' },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, user-scalable=0',
        },
      
    ],

},
  buildModules: ['@nuxt/typescript-runtime'],
  devtools: { enabled: false },
  plugins: [
    '@/plugins/antd.ts'
  ],

  ssr:true,
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  }
})
