/**
 * Created by zhaoshangming on 2017/11/28.
 */
import Vue from 'vue'
import Router from 'vue-router'
import MobileChat from '@/components/user/MobileChat'
import MobileRobot from '@/components/user/MobileRobot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/robot',
      name: 'robot',
      component: MobileRobot
    },
    {
      path: '/chat',
      name: 'chat',
      component: MobileChat
    }
  ]
})
