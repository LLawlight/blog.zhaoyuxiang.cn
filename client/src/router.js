import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '@/pages/index'
import github from '@/pages/github'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',

  routes: [
    {
      path: '/',
      component: index
    },

    {
      path: '/auth/github',
      component: github
    }
  ]
})
