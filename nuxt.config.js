var axios=require('axios');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '首页',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '首页' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  //配置动态效果
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  //静态化
  generate: {
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: false,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: false,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: true,
      sortClassName: false,
      trimCustomFragments: true,
      useShortDoctype: true
    }
    // ,
    // routes: function () {
    //   return axios.get('https://jsonplaceholder.typicode.com/users')
    //     .then((res) => {
    //       return res.data.map((user) => {
    //         return '/user/' + user.id
    //       })
    //     })
    // }
  },
  css: [
    '~assets/css/reset.min.css',
    '~assets/css/layout.min.css',
    '~assets/css/pagination.min.css',
    '~assets/css/index.min.css',
    '~assets/css/detail.min.css'
  ],
  //配置反向代理解决跨域问题
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',
      {
        target: 'http://localhost:8080', // api主机
        pathRewrite: { '^/api' : '/' }
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
