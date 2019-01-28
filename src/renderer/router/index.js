import Vue from 'vue'
import Router from 'vue-router'
import layout from '../layout/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          meta: {
            title: '首页'
          },
          component: resolve => require(['../pages/index'], resolve)
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
