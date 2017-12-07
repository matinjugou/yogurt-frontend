import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Welcome = () => import('@/components/staff-first-login/Welcome.vue')
const AddInfo = () => import('@/components/staff-first-login/AddInfo.vue')
const UploadAvatar = () => import('@/components/staff-first-login/UploadAvatar.vue')
const EmailValidate = () => import('@/components/staff-first-login/EmailValidate.vue')
const ChangePassword = () => import('@/components/staff-first-login/ChangePassword.vue')
const Success = () => import('@/components/staff-first-login/Success.vue')

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
      path: '/email-validate',
      name: 'EmailValidate',
      component: EmailValidate
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    }
  ]
})
