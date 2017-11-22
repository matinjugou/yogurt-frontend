// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import { Picker } from 'emoji-mart-vue'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(iView)
Vue.component('picker', Picker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
