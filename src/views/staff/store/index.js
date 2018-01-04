import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketServerUrl: '60.205.178.28:8361',
    httpServerUrl: 'http://yogurt.magichc7.com/api/staff',
    fileServerUrl: 'http://123.206.22.71/api/v2/file/',
    imageCompressUrl: 'http://123.206.22.71/api/v1/image/',
    isLogin: false,
    staffId: '',
    companyId: '',
    avatarUrl: '',
    chatRecordList: {},
    userList: [],
    userInfo: {},
    userAvatarUrl: {},
    quickReplyList: [],
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
    changeCompanyId (state, payload) {
      state.companyId = payload.companyId
    },
    changeAvatarUrl (state, payload) {
      state.avatarUrl = payload.avatarUrl
    },
    prependChatRecord (state, payload) {
      if (state.chatRecordList[payload.userId] === undefined) {
        state.chatRecordList[payload.userId] = []
      }
      console.log(payload.content)
      state.chatRecordList[payload.userId].unshift(...payload.content)
      console.log(state.chatRecordList)
    },
    addChatRecord (state, payload) {
      if (state.chatRecordList[payload.userId] === undefined) {
        state.chatRecordList[payload.userId] = []
      }
      state.chatRecordList[payload.userId].push(payload.content)
      console.log(state.chatRecordList)
    },
    addUserInfo (state, payload) {
      state.userInfo[payload.userId] = payload.content
    },
    changeMessageSentStatus (state, payload) {
      if (state.chatRecordList[payload.userId]) {
        let content = payload.content
        let record = state.chatRecordList[payload.userId].find(function (value) {
          if (value.type !== content.type || value.hasSent !== false) {
            return false
          }
          if (value.type === 'text') {
            return value.msg === content.msg
          } else {
            return value.url === content.url
          }
        })
        record.hasSent = true
      }
    },
    refreshUserList (state, payload) {
      let arr = payload.content
      for (let item of state.userList) {
        let i
        for (i = 0; i < arr.length; i++) {
          if (item.userId === arr[i].userId) {
            arr[i].unread = item.unread
            break
          }
        }
      }
      state.userList = arr
      for (let item of state.userList) {
        if (state.chatRecordList[item.userId] === undefined) {
          state.chatRecordList[item.userId] = []
        }
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
      let user = state.userList.find(function (u) {
        return u.userId === payload.userId
      })
      if (user === undefined) {
        return
      }
      user['unread'] = 0
    },
    addUserUnread (state, payload) {
      let user = state.userList.find(function (u) {
        return u.userId === payload.userId
      })
      if (user === undefined) {
        return
      }
      if (typeof user.unread === 'number') {
        user['unread']++
      } else {
        user['unread'] = 1
      }
    },
    updateQuickReplyList (state, payload) {
      state.quickReplyList = payload.quickReplyList
    },
    buildSocketConnect (state) {
      const io = require('socket.io-client')
      state.socket = io(state.socketServerUrl, {
        transports: ['websocket']
      })
    }
  }
})
