import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '@/pages/index'
import github from '@/pages/github'
import admin from '@/pages/admin/index'
import create from '@/pages/admin/create'
import list from '@/pages/admin/list'

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
    },

    {
      path: '/admin',
      component: admin,
      children: [
        {
          path: 'create',
          component: create
        },
        {
          path: 'list',
          component: list
        },
      ]
    },
  ]
})
