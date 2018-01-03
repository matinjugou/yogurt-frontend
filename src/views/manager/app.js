// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import router from './router'
import iView from 'iview'
import Vuetify from 'vuetify'
import store from './store'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(Vuetify)

Raven.config('https://6436e8b73e184fc8ba06f53b35f15ede@sentry.io/256116', {
  release: '1.0.0'
}).addPlugin(RavenVue, Vue).install()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
