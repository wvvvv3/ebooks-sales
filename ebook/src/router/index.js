import Vue from 'vue'
import Router from 'vue-router'

import login from '@/page/login'
import home from '@/page/home'
import book from '@/page/book'
import list from '@/page/list'
// import cart from '@/page/cart'
import manage from '@/page/manage'
import user from '@/page/user'
import order from '@/page/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/book',
      name: 'book',
      component: book,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      meta: {
        isLogin: false
      }
    },
    // {
    //   path: '/cart',
    //   name: 'cart',
    //   component: cart,
    //   meta: {
    //     isLogin: true
    //   }
    // },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      meta: {
        isLogin: true,
        userLevel:true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta: {
        isLogin: true
      }
    }
  ]
})
