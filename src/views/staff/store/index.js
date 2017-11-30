import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketServerUrl: 'http://yogurt.magichc7.com',
    httpServerUrl: 'http://yogurt.magichc7.com/api/staff',
    isLogin: true,
    staffId: '1_s1',
    chatRecordList: {
      '1_u1': [
        {
          'from': '1_u1',
          'to': '1_s1',
          'msg': 'http://s1.picswalls.com/wallpapers/2015/09/20/wallpaper-2015_111528356_269.jpg',
          'type': 'pic',
          'time': 'test_pic'
        }
      ]
    }
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
      state.chatRecordList[payload.userId].push(payload.content)
    }
  }
})
