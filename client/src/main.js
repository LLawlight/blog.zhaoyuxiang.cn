import Vue from 'vue'
import VueResource from 'vue-resource'

import config from '../../server/config'
import router from './router'
import store from './store'

import App from './App'
import zButton from '@/components/Button'

window.__apiBase = 'http://localhost:3000/api/'
window.__config = config

Vue.use(VueResource)
Vue.component(zButton.name, zButton)

Vue.http.options.emulateJSON = true
Vue.http.options.credentials = true

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
