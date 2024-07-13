import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    { // 重定向
      // 访问根路径时跳转到登录界面
      path: '/',
      redirect: '/login',
      hidden: true,
    },
    {
      // 这是原先配置路由的方法，在上面写引入语法
      path: '*',
      name: 'NotFound',
      hidden: true,
      component: NotFound
    },
    {
      // 登录页面使用懒加载
      // 3.使用异步方法（常用）
      path: '/login',
      name: 'Login',
      hidden: true,
      // component: Login
      component: resolve => require((['@/components/Login']),resolve)
    },
    {
      // 首页使用懒加载
      // 1.使用import方法（常用）
      path: '/home',
      name: '学生管理',
      // 重定向
      redirect: '/home/student',
      // component: Home
      component: () => import('@/components/Home'),
      // 2.使用require方法
      // path: '/',
      // name: 'Home',
      // components: require('@/components/Home')

      // 添加子页面路由
      children: [
        {
          path: '/home/student',
          name: '学生列表',
          component: () => import('@/components/student/StudentList'),
        },
        {
          path: '/home/work',
          name: '作业列表',
          component: () => import('@/components/student/WorkList'),
        },{
          path: '/home/info',
          name: '信息列表',
          component: () => import('@/components/student/InfoList'),
        },
      ]
    },
    //为了页面工整，接下来均使用懒加载第一种方法

  ],
  mode: 'history'
})
