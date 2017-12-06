/**
 * Created by zhaoshangming on 2017/11/28.
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import { Picker } from 'emoji-mart-vue'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.component('picker', Picker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
