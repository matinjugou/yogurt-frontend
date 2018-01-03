import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const StaffHello = () => import('@/components/staff/StaffHello')
const StaffChat = () => import('@/components/staff/StaffChat')
const StaffInfo = () => import('@/components/staff/StaffInfo')
const StaffQuickReply = () => import('@/components/staff/StaffQuickReply')
const StaffFeedback = () => import('@/components/staff/StaffFeedback')
const StaffMessage = () => import('@/components/staff/StaffMessage')

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
    },
    {
      path: '/message',
      name: 'Message',
      component: StaffMessage
    }
  ]
})
