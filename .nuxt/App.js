import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/css/reset.min.css'

import '../assets/css/layout.min.css'

import '../assets/css/pagination.min.css'

import '../assets/css/index.min.css'

import '../assets/css/detail.min.css'


let layouts = {

  "_default": () => import('../layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m),

  "_errorLayout": () => import('../layouts/errorLayout.vue'  /* webpackChunkName: "layouts/errorLayout" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"前端日记","meta":[{"charset":"utf-8"},{"http-equiv":"Content-Type","content":"text\u002Fhtml; charset=UTF-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"keywords","name":"keywords","content":"前端日记,H5,JavaScript,Css3,Vue,React,VueRouter,Html"},{"hid":"description","name":"description","content":"首页"},{"http-equiv":"X-dns-prefetch-control","content":"on"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"dns-prefetch","href":"https:\u002F\u002Fbhome.blogapi.top"}],"script":[{"type":"text\u002Fjavascript","defer":"defer","src":"\u002F\u002Fstatic.blogapi.top\u002Fassets\u002Fjs\u002Flibs\u002Fvue.min.js"},{"type":"text\u002Fjavascript","defer":"defer","src":"\u002F\u002Fstatic.blogapi.top\u002Fassets\u002Fjs\u002Flibs\u002Fvue-router.min.js"},{"type":"text\u002Fjavascript","defer":"defer","src":"\u002F\u002Fstatic.blogapi.top\u002Fassets\u002Fjs\u002Flibs\u002Fvuex.min.js"},{"type":"text\u002Fjavascript","defer":"defer","src":"\u002F\u002Fstatic.blogapi.top\u002Fassets\u002Fjs\u002Flibs\u002Faxios.min.js"},{"type":"text\u002Fjavascript","defer":"defer","src":"\u002F\u002Fstatic.blogapi.top\u002Fassets\u002Fjs\u002Flibs\u002Fvue-meta.min.js"}],"style":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

