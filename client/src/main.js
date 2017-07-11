import Vue from 'vue'
import VueResource from 'vue-resource'
import '@/components/common'

import config from '../../server/config'
import router from './router'
import store from './store'

import App from './App'
import zHeader from '@/components/header.vue'
import zFooter from '@/components/footer.vue'

if (process.env.NODE_ENV === "production") {
  window.__apiBase = 'http://zhaoyuxiang.cn:3000/api/'
} else {
  window.__apiBase = 'http://localhost:3000/api/'
}
window.__config = config

Vue.use(VueResource)
Vue.component(zHeader.name, zHeader)
Vue.component(zFooter.name, zFooter)

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
