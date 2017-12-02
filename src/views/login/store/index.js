import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    staffLoginUrl: 'http://yogurt.magichc7.com/api/staff/login',
    managerLoginUrl: 'http://yogurt.magichc7.com/api/manager/login'
  }
})
