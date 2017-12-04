import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLoginUrl: 'http://yogurt.magichc7.com/api/user/login',
    fileServerUrl: 'http://123.206.22.71/api/v2/file/',
    fileCompressUrl: 'http://123.206.22.71/api/v1/image/',
    chatRecordList: [],
    userId: '',
    staffId: ''
  },
  mutations: {
    addChatRecord (state, payload) {
      state.chatRecordList.push(payload.content)
    }
  }
})
