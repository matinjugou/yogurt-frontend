import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import StaffManager from '@/components/manager/StaffManager'
import QuickReplyManager from '@/components/manager/QuickReplyManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/stfmgn',
      name: 'staffmanager',
      component: StaffManager
    },
    {
      path: '/settings-quickrly',
      name: 'quickreplymanager',
      component: QuickReplyManager
    }
  ]
})
