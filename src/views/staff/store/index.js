import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketServerUrl: 'http://yogurt.magichc7.com',
    httpServerUrl: 'http://yogurt.magichc7.com/api/staff',
    isLogin: false,
    staffId: '1_s1'
  },
  mutations: {
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
    },
    changeStaffId (state, payload) {
      state.staffId = payload.staffId
    }
  }
})
