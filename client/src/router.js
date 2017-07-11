import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '@/pages/home'
import friends from '@/pages/friends'
import post from '@/pages/post'
import signin from '@/pages/signin'
import github from '@/pages/github'

// 管理后台
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
      redirect: '/home'
    },

    {
      path: '/home',
      component: home
    },

    {
      path: '/friends',
      component: friends
    },


    {
      path: '/post/:id',
      component: post
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
