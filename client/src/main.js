import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Home from '@/pages/home'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.emulateJSON = true

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
