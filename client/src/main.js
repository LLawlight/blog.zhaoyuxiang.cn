import Vue from 'vue'
import VueResource from 'vue-resource'
import '@/components/common'

import MarkdownIt from 'markdown-it'
// import hljs from 'highlight.js'
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

window.__md = md

import config from '../../server/config'
import router from './router'
import store from './store'

import App from './App'
import zHeader from '@/components/header.vue'
import zFooter from '@/components/footer.vue'
import loading from '@/components/loading.vue'

if (process.env.NODE_ENV === "production") {
  window.__apiBase = 'http://zhaoyuxiang.cn:3000/api/'
} else {
  window.__apiBase = 'http://localhost:3000/api/'
}

window.__config = config

Vue.use(VueResource)
Vue.component(zHeader.name, zHeader)
Vue.component(zFooter.name, zFooter)
Vue.component(loading.name, loading)

Vue.http.options.emulateJSON = true
Vue.http.options.credentials = true

Vue.http.get(`${__apiBase}v1/user/login`)
.then((res) => {
  const data = res.data.data
  store.commit('getUserInfo', data)
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
