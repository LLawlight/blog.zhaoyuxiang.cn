import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '@/pages/index'
import signin from '@/pages/signin'
import github from '@/pages/github'
import admin from '@/pages/admin/index'
import create from '@/pages/admin/create'
import list from '@/pages/admin/list'
import edit from '@/pages/admin/edit'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',

  routes: [
    {
      path: '/',
      component: index
    },

    {
      path: '/signin',
      component: signin
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
        {
          path: 'edit/:id',
          component: edit
        }
      ]
    },
  ]
})
