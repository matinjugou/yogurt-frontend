import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketIoServerUrl: 'http://yogurt.magichc7.com',
    userLoginUrl: 'http://yogurt.magichc7.com/api/user/login',
    apiServerUrl: 'http://yogurt.magichc7.com/api/user',
    fileServerUrl: 'http://123.206.22.71/api/v2/file/',
    fileCompressUrl: 'http://123.206.22.71/api/v1/image/',
    chatRecordList: [],
    userId: '',
    staffId: '',
    chatState: ''
  },
  mutations: {
    addChatRecord (state, payload) {
      state.chatRecordList.push(payload.content)
    }
  }
})
