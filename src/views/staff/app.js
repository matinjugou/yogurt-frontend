// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import Vuex from 'vuex'
import App from './app.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import { Picker } from 'emoji-mart-vue'
import VueProgressBar from 'vue-progressbar'
import 'iview/dist/styles/iview.css'

// Sentry integration
Raven.config('https://6436e8b73e184fc8ba06f53b35f15ede@sentry.io/256116', {
  release: '1.0.0'
}).addPlugin(RavenVue, Vue).install()

const progressBarOptions = {
  color: 'rgb(45, 140, 240)',
  failedColor: 'red',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(iView)

Vue.use(VueProgressBar, progressBarOptions)
Vue.component('picker', Picker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
