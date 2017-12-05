import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    staffId: '',
    current: 0,
    name: '',
    nickName: '',
    phoneNumber: ''
  },
  mutations: {
    changeStaffId (state, payload) {
      state.staffId = payload.staffId
    },
    changeName (state, payload) {
      state.name = payload.name
    },
    changeNickName (state, payload) {
      state.nickName = payload.nickName
    },
    changePhoneNumber (state, payload) {
      state.phoneNumber = payload.phoneNumber
    },
    addCurrent (state) {
      state.current++
    },
    subCurrent (state) {
      state.current--
    }
  }
})
