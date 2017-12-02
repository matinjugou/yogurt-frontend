import Vue from 'vue'
import Router from 'vue-router'
import StaffHello from '@/components/staff/StaffHello'
import StaffChat from '@/components/staff/StaffChat'
import StaffInfo from '@/components/staff/StaffInfo'
import StaffQuickReply from '@/components/staff/StaffQuickReply'
import StaffFeedback from '@/components/staff/StaffFeedback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
