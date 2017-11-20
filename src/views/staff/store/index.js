import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    changeLoginStatus (state) {
      this.state.isLogin = !this.state.isLogin
    }
  }
})
