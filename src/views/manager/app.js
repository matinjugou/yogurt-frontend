// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import iView from 'iview'
import Vuetify from 'vuetify'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(Vuetify)
Vue.component()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
