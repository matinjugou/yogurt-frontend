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
    chatRecordList: {
      '1_u1': [
        {
          'from': '1_u1',
          'to': '1_s1',
          'url': 'http://s1.picswalls.com/wallpapers/2015/09/20/wallpaper-2015_111528356_269.jpg',
          'compressedUrl': 'http://s1.picswalls.com/wallpapers/2015/09/20/wallpaper-2015_111528356_269.jpg',
          'type': 'image',
          'time': 'test_image'
        }
      ]
    },
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
      if (!state.chatRecordList[payload.userId]) {
        state.chatRecordList[payload.userId] = []
      }
      state.chatRecordList[payload.userId].push(payload.content)
    },
    refreshUserList (state, payload) {
      state.userList = payload.content
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
      state.userList.find(function (user) {
        return user.userId === payload.userId
      }).unread++
    },
    buildSocketConnect (state) {
      const io = require('socket.io-client')
      state.socket = io(state.socketServerUrl)
    }
  }
})
