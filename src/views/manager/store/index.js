import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socketServerUrl: 'http://yogurt.magichc7.com',
    httpServerUrl: 'http://yogurt.magichc7.com/api/manager',
    fileServerUrl: 'http://123.206.22.71/api/v2/file/',
    robotServerUrl: 'http://123.206.22.71/api/v1/robot/',
    isLogin: false,
    managerId: '1_m1',
    picUrl: '',
    companyId: 0,
    nickname: '',
    name: '',
    email: '',
    companyName: '',
    companyLogo: '',
    companyRobotAvatar: '',
    companyCorpusFile: ''
  },
  mutations: {
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
    },
    changeCorpusFile (state, payload) {
      state.companyCorpusFile = payload.companyCorpusFile
    },
    changeRobotAvatar (state, payload) {
      state.companyRobotAvatar = payload.companyRobotAvatar
    },
    changeManagerAvatar (state, payload) {
      state.picUrl = payload.picUrl
    },
    changeCompanyInfo (state, payload) {
      if (payload.companyName) {
        state.companyName = payload.companyName
      }
      if (payload.companyLogo) {
        state.companyLogo = payload.companyLogo
      }
      if (payload.companyRobotAvatar) {
        state.companyRobotAvatar = payload.companyRobotAvatar
      }
      if (payload.companyCorpusFile) {
        state.companyCorpusFile = payload.companyCorpusFile
      }
    },
    changeManagerId (state, payload) {
      state.managerId = payload.managerId
      state.picUrl = payload.picUrl
      state.companyId = payload.companyId
      state.name = payload.name
      state.nickname = payload.nickname
      state.email = payload.email
    }
  }
})
