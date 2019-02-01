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
        },
        {
          path: '/tools',
          name: 'tools',
          redirect: '/qrcode',
          meta: {
            title: '工具'
          },
          children: [
            {
              path: '/qrcode',
              name: 'qrcode',
              meta: {
                title: '二维码'
              },
              component: resolve => require(['../pages/qrcode/qrcode.vue'], resolve)
            }
          ],
          component: resolve => require(['../pages/tools/tools.vue'], resolve)
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
