import Vue from 'vue'
import VueRouter from 'vue-router'

const index = resolve => require(['pages/index'], resolve)
const home = resolve => require(['pages/home'], resolve)
const friends = resolve => require(['pages/friends'], resolve)
const post = resolve => require(['pages/post'], resolve)
const github = resolve => require(['pages/github'], resolve)

// 管理后台
const admin = resolve => require(['admin/index'], resolve)
const create = resolve => require(['admin/create'], resolve)
const list = resolve => require(['admin/list'], resolve)
const edit = resolve => require(['admin/edit'], resolve)

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',

  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: '',
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
          path: '/auth/github',
          component: github
        },
      ]
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
