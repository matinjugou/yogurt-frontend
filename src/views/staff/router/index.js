import Vue from 'vue'
import Router from 'vue-router'
import StaffLogin from '@/components/StaffLogin'
import StaffHello from '@/components/StaffHello'
import StaffChat from '@/components/StaffChat'
import StaffInfo from '@/components/StaffInfo'
import StaffQuickReply from '@/components/StaffQuickReply'
import StaffFeedback from '@/components/StaffFeedback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: StaffLogin
    },
    {
      path: '/index',
      name: 'Index',
      component: StaffHello
    },
    {
      path: '/chat',
      name: 'Chat',
      component: StaffChat
    },
    {
      path: '/info',
      name: 'Info',
      component: StaffInfo
    },
    {
      path: '/quick-reply',
      name: 'QuickReply',
      component: StaffQuickReply
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: StaffFeedback
    }
  ]
})
