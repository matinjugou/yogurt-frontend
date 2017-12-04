import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/staff-first-login/Welcome.vue'
import AddInfo from '@/components/staff-first-login/AddInfo.vue'
import UploadAvatar from '@/components/staff-first-login/UploadAvatar.vue'
import EmailVerify from '@/components/staff-first-login/EmailVerify.vue'
import Success from '@/components/staff-first-login/Success.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/add-info',
      name: 'AddInfo',
      component: AddInfo
    },
    {
      path: '/upload-avatar',
      name: 'UploadAvatar',
      component: UploadAvatar
    },
    {
      path: '/email-verify',
      name: 'EmailVerify',
      component: EmailVerify
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    }
  ]
})
