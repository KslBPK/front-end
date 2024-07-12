import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 首页使用懒加载
      // 1.使用import方法（常用）
      path: '/',
      name: 'Home',
      // component: Home
      component: () => import('@/components/Home')
      // 2.使用require方法
      // path: '/',
      // name: 'Home',
      // components: require('@/components/Home')
    },
    {
      // 登录页面使用懒加载
      // 3.使用异步方法（常用）
      path: '/login',
      name: 'Login',
      // component: Login
      component: resolve => require((['@/components/Login']),resolve)
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
  ],
  mode: 'history'
})
