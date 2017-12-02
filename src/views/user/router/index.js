import Vue from 'vue'
import Router from 'vue-router'
import UserChat from '@/components/user/UserChat'
import UserLogin from '@/components/user/UserLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: UserLogin
    },
    {
      path: '/chat',
      name: 'chat',
      component: UserChat
    }
  ]
})
