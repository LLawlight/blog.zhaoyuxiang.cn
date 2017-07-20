import Vue from 'vue'
import VueRouter from 'vue-router'

// const index = resolve => require(['pages/index'], resolve)
import index from 'pages/index'
const home = resolve => require(['pages/home'], resolve)
const friends = resolve => require(['pages/friends'], resolve)
const post = resolve => require(['pages/post'], resolve)
// const github = resolve => require(['pages/github'], resolve)
import github from 'pages/github'

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
          path: '',
          component: list
        },
        {
          path: 'create',
          component: create
        },
        {
          path: 'edit/:id',
          component: edit
        }
      ]
    },
  ]
})
