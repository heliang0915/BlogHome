var axios = require('axios');
var config = require('./config');
var bodyParser = require('body-parser');
module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '前端日记',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '首页'
      },
      {
        'http-equiv': 'X-dns-prefetch-control',
        content: 'on'
      }
      // ,
      // { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'dns-prefetch',
        href: 'https://bloghome.top'
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  //配置动态效果
  // transition: {
  //   name: 'page',
  //   mode: 'out-in'
  // },
  render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
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
    },
    routes: function() {
      //生成入口
      // return blogQuery.getBlogTotal().then((res) => {
      //
      //   return [res.data].map((page)=>{
      //       return ''
      //   })
      //   // return res.data.map((user) => {
      //   //
      //   //   return '/user/' + user.id
      //   // })
      // })
      return axios.post(`${config.api.proxyBaseURL}/wx/blogList`, {
          page: 1,
          pageSize: 10000,
          params: {}
        })
        .then((res) => {
          // let data=res.data;
          // console.log(data);
          // data=JSON.parse(data)
          // console.log("返回数据...."+Object.keys(data));
          let {
            total,
            models
          } = res.data;
          // let total=res.data.total;
          let firstPages = [];
          let secondPages = [];
          let ary = [];
          //初始化1级页
          for (var i = 0; i < Math.ceil(total / 7); i++) {
            ary.push(i);
          }
          firstPages = ary.map((page) => {
            return `/${page+1}`
          });
          //二级页面
          secondPages = models.map((item) => {
            return `/detail/${item.uuid}`
          })
          ary = firstPages.concat(secondPages);
          return ary;
        }).catch((err) => {
          console.log("err::::" + err);
        })
    }
  },
  css: [
    '~assets/css/reset.min.css',
    '~assets/css/layout.min.css',
    '~assets/css/pagination.min.css',
    '~assets/css/index.min.css',
    '~assets/css/detail.min.css'
  ],
  //配置反向代理解决跨域问题
  // modules: [
  //   '@nuxtjs/axios',
  //   '@nuxtjs/proxy'
  // ],
  // proxy: [
  //   [
  //     '/api',
  //     {
  //       // target: 'https://blogapi.top', // api主机
  //       target: 'http://localhost:8080', // api主机
  //       pathRewrite: { '^/api' : '/' }
  //     }
  //   ]
  // ],
  //
  plugins: [{
      src: '~/plugins/vue-editor.js',
      ssr: false
    },
    {
      src: '~/plugins/seo.js'
    }
  ],
  /*
   ** Build configuration
   */
  build: {
    loaders: [{
      test: /\.css$/,
      loader: 'vue-style-loader!css-loader'
    }],

    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
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
