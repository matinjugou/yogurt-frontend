import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketServerUrl: 'http://yogurt.magichc7.com',
    httpServerUrl: 'http://yogurt.magichc7.com/api/manager',
    fileServerUrl: 'http://123.206.22.71/api/v2/file/',
    isLogin: false,
    managerId: '1_m1'
  },
  mutations: {
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
    },
    changeManagerId (state, payload) {
      state.managerId = payload.managerId
    }
  }
})
