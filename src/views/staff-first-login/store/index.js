import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    staffId: '',
    current: 0,
    name: '',
    nickName: '',
    phoneNumber: '',
    avatarUrl: '',
    email: '',
    slideFadeDirection: 'right'
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
    changeInfo (state, payload) {
      state.name = payload.name
      state.nickName = payload.nickName
      state.phoneNumber = payload.phoneNumber
    },
    changeAvatarUrl (state, payload) {
      state.avatarUrl = payload.avatarUrl
    },
    changeEmail (state, payload) {
      state.email = payload.email
    },
    addCurrent (state) {
      state.current++
    },
    subCurrent (state) {
      state.current--
    },
    changeCurrent (state, payload) {
      state.current = payload.current
    },
    leftDirection (state) {
      state.slideFadeDirection = 'left'
    },
    rightDirection (state) {
      state.slideFadeDirection = 'right'
    }
  }
})
