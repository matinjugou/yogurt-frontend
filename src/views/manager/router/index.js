import Vue from 'vue'
import Router from 'vue-router'
import SystemStatus from '@/components/manager/SystemStatus'
import StaffManager from '@/components/manager/StaffManager'
import QuickReplyManager from '@/components/manager/QuickReplyManager'
import RobotManager from '@/components/manager/RobotManager'
import ManagerInfo from '@/components/manager/ManagerInfo'
import UserMessage from '@/components/manager/UserMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'systemstatus',
      component: SystemStatus,
      alias: '/systemstatus'
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
    },
    {
      path: '/settings-robot',
      name: 'robotmanager',
      component: RobotManager
    },
    {
      path: '/mgninfo',
      name: 'managerinfo',
      component: ManagerInfo
    },
    {
      path: '/usermessage',
      name: 'usermessage',
      component: UserMessage
    }
  ]
})
