/**
 * Created by zhaoshangming on 2017/12/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketIoServerUrl: 'http://yogurt.magichc7.com',
    userLoginUrl: 'http://yogurt.magichc7.com/api/user/login',
    apiServerUrl: 'http://yogurt.magichc7.com/api',
    fileServerUrl: 'http://123.206.22.71/api/v2/file/',
    fileCompressUrl: 'http://123.206.22.71/api/v1/image/',
    robotUrl: 'http://123.206.22.71/api/v1/robot/',
    chatRecordList: [],
    userId: '',
    staffId: '',
    chatState: 'robot',
    socket: null
  },
  mutations: {
    addChatRecord (state, payload) {
      state.chatRecordList.push(payload.content)
    },
    prependChatRecord (state, payload) {
      state.chatRecordList.unshift(payload.content)
    },
    buildSocketConnect (state) {
      const io = require('socket.io-client')
      state.socket = io(state.socketIoServerUrl, {transports: ['polling']})
    }
  }
})
