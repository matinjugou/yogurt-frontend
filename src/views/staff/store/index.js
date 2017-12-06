import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketServerUrl: 'http://yogurt.magichc7.com',
    httpServerUrl: 'http://yogurt.magichc7.com/api/staff',
    fileServerUrl: 'http://123.206.22.71/api/v2/file/',
    imageCompressUrl: 'http://123.206.22.71/api/v1/image/',
    isLogin: false,
    staffId: '',
    chatRecordList: {},
    userList: [],
    socket: null
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
    },
    addChatRecord (state, payload) {
      if (state.chatRecordList[payload.userId] === undefined) {
        state.chatRecordList[payload.userId] = []
      }
      state.chatRecordList[payload.userId].push(payload.content)
      console.log(state.chatRecordList)
    },
    refreshUserList (state, payload) {
      state.userList = payload.content
      for (let item of state.userList) {
        state.chatRecordList[item.userId] = []
      }
    },
    addUser (state, payload) {
      state.userList.push(payload.content)
    },
    removeUser (state, payload) {
      let userIndex
      for (let index of state.userList.keys()) {
        if (state.userList[index].userId === payload.userId) {
          userIndex = index
        }
      }
      state.userList.splice(userIndex, 1)
    },
    clearUserUnread (state, payload) {
      state.userList.find(function (user) {
        return user.userId === payload.userId
      }).unread = 0
    },
    addUserUnread (state, payload) {
      let user = state.userList.find(function (user) {
        return user.userId === payload.userId
      })
      if (user.unread) {
        user.unread++
      } else {
        user['unread'] = 1
      }
    },
    buildSocketConnect (state) {
      const io = require('socket.io-client')
      state.socket = io(state.socketServerUrl)
    }
  }
})
