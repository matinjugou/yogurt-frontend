// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { Picker } from 'emoji-mart-vue'
// import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(iView)
Vue.component('picker', Picker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
