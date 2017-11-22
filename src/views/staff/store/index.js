import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketServerUrl: 'http://yogurt.magichc7.com',
    isLogin: true,
    staffId: '1_s1'
  },
  mutations: {
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
    }
  }
})
