import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import StaffManager from '@/components/manager/StaffManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/manager/stfmgn',
      name: 'staffmanager',
      component: StaffManager
    }
  ]
})
