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
            },
            {
              path: '/recordText',
              name: 'recordText',
              meta: {
                title: '记事本'
              },
              component: resolve => require(['../pages/recordText/recordText.vue'], resolve)
            },
            {
              path: '/chartRoom',
              name: 'chartRoom',
              meta: {
                title: '聊天室'
              },
              component: resolve => require(['../pages/chartRoom/chartRoom.vue'], resolve)
            },
            {
              path: '/qq',
              name: 'qq',
              meta: {
                title: 'qq相关'
              },
              component: resolve => require(['../pages/qq/qq.vue'], resolve)
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
