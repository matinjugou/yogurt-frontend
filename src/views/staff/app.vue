<template>
  <div id="app" class="staff">
    <Row type="flex">
      <Col :span="spanLeft" class="staff-menu-left" v-if="spanLeft">
        <Menu active-name="1" theme="dark" width="auto" :open-names="['personal-center']" @on-select="menuAction">
          <!-- here may have a logo -->
          <div class="menu-header"></div>
          <div class="menu-burger-button">
            <MenuItem name="burger-button">
                <Icon type="navicon" size="32"></Icon>
            </MenuItem>
          </div>
          <div class="menu-items">
            <MenuItem name="chat">
              <Icon type="chatboxes" :size="iconSize"></Icon>
              <span class="staff-text" v-show="showMenuText">会话页面</span>
            </MenuItem>
            <MenuItem name="message">
              <Icon type="email" :size="iconSize"></Icon>
              <span class="staff-text" v-show="showMenuText">客户留言</span>
            </MenuItem>
            <MenuItem name="quick-reply">
              <Icon type="reply-all" :size="iconSize"></Icon>
              <span class="staff-text" v-show="showMenuText">快捷回复</span>
            </MenuItem>
            <MenuItem name="feedback">
              <Icon type="paper-airplane" :size="iconSize"></Icon>
              <span class="staff-text" v-show="showMenuText">客户反馈</span>
            </MenuItem>
            <!--TODO: let all the actions in here-->
            <Submenu name="personal-center">
              <template slot="title">
                  <Icon type="home" :size="iconSize"></Icon>
                  <span class="staff-text" v-show="showMenuText">个人中心</span>
              </template>
              <MenuItem name="info">
                <Icon type="person-stalker" :size="iconSize"></Icon>
                <span class="staff-text" v-show="showMenuText">信息维护</span>
              </MenuItem>
              <MenuItem name="rest">
                <Icon type="coffee" :size="iconSize + 4"></Icon>
                <span class="staff-text" v-show="showMenuText">{{ restCaption }}</span>
              </MenuItem>
              <MenuItem name="logout">
                <Icon type="log-out" :size="iconSize"></Icon>
                <span class="staff-text" v-show="showMenuText">登出</span>
              </MenuItem>
            </Submenu>
          </div>
          
          <footer class="staff-copy">
            &copy; Yogurt
          </footer>
        </Menu>
      </Col>
      <Col class="staff-right" :span="spanRight">
        <transition name="slide-fade" mode="out-in">
          <router-view/>
        </transition>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      spanLeft: 3,
      iconSize: 25,
      restStatus: false
    }
  },
  computed: {
    showMenuText () {
      return this.spanLeft >= 3
    },
    restAction () {
      return this.restStatus ? 'success' : 'primary'
    },
    restCaption () {
      return this.restStatus ? '返回工作' : '准备休息'
    },
    spanRight () {
      return 24 - this.spanLeft
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    httpServerUrl () {
      return this.$store.state.httpServerUrl
    },
    socket () {
      return this.$store.state.socket
    }
  },
  methods: {
    socketListenInit () {
      this.socket.on('regResult', (data) => {
        console.log('Register result: code ' + data.code + ' & msg ' + data.msg)
        if (data.code === 0) {
          this.$Notice.success({
            title: '连接消息服务器成功！',
            desc: '开始和用户聊天吧~'
          })
        } else {
          this.$Notice.error({
            title: '连接消息服务器失败！',
            desc: '程序会自动尝试重新连接'
          })
        }
      })

      // TODO: deal with send failure
      // also timeout affair should be taken care of
      this.socket.on('sendResult', (data) => {
        console.log('Send result: code ' + data.code + ' & msg ' + data.msg)
        if (data.code !== 0) {
          this.$Notice.error({
            title: '发送失败，请重新发送'
          })
        } else {
          // success
        }
      })

      // receive user message from socket
      // TODO: update time to time in userMsg
      this.socket.on('userMsg', (data) => {
        console.log('User message: from ' + data.userId + ' & msg type is ' + data.type)
        let date = new Date()
        if (data.type === 'file') {
          this.$store.commit({
            type: 'addChatRecord',
            userId: data.userId,
            content: {
              'userId': data.userId,
              'staffId': this.staffId,
              'direction': 'in',
              'url': data.url,
              'name': data.name,
              'size': data.size,
              'mimeType': data.mimeType,
              'type': data.type,
              'time': date.toLocaleTimeString('zh-Hans-CN')
            }
          })
        } else if (data.type === 'image') {
          this.$store.commit({
            type: 'addChatRecord',
            userId: data.userId,
            content: {
              'userId': data.userId,
              'staffId': this.staffId,
              'direction': 'in',
              'url': data.url,
              'compressedUrl': data.compressedUrl,
              'type': data.type,
              'time': date.toLocaleTimeString('zh-Hans-CN')
            }
          })
        } else {
          // type === 'text'
          this.$store.commit({
            type: 'addChatRecord',
            userId: data.userId,
            content: {
              'userId': data.userId,
              'staffId': this.staffId,
              'direction': 'in',
              'msg': data.msg,
              'type': data.type,
              'time': date.toLocaleTimeString('zh-Hans-CN')
            }
          })
        }
        // update notification badge
        this.$store.commit({
          type: 'addUserUnread',
          userId: data.userId
        })
      })

      // receive new user notification from socket
      this.socket.on('newUser', (data) => {
        console.log('New user: ' + data.userId)
        this.$store.commit({
          type: 'addUser',
          content: {
            userId: data.userId,
            status: 'waiting'
          }
        })
      })

      // receive user stop notification from socket
      this.socket.on('userServiceStop', (data) => {
        console.log('User stop: ' + data.from + ' & msg: ' + data.msg)
        this.$store.commit({
          type: 'removeUser',
          userId: data.from
        })
      })

      // update user queue
      this.socket.on('updateQueue', (data) => {
        console.log('Update queue message')
        axios.get(this.httpServerUrl + '/queue', {
          params: {
            staffId: window.localStorage.getItem('id'),
            token: window.localStorage.getItem('token')
          }
        }).then(response => {
          let body = response.data.data
          console.log(body)
          if (body.code === 0) {
            // successfully get user queue
            let arr = []
            for (let value of body.queue.serving) {
              arr.push({
                userId: value,
                status: 'serving',
                unread: 0
              })
            }
            for (let value of body.queue.waiting) {
              arr.push({
                userId: value,
                status: 'waiting',
                unread: 0
              })
            }
            this.$store.commit({
              type: 'refreshUserList',
              content: arr
            })
          } else {
            // failed to get user queue
            this.$Notice.error({
              title: '没能成功获取用户列表，请刷新重试'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    changeRestStatus () {
      // TODO: give server a message
      this.restStatus = !this.restStatus
    },
    sendLogoutMessage () {
      let storeToken = window.localStorage.getItem('token')
      if (this.socket) {
        this.socket.emit('staffLogOut', {
          staffId: this.$store.state.staffId,
          token: storeToken
        })
      }
    },
    beforeUnloadHandler (e) {
      e.preventDefault()
      this.sendLogoutMessage()
    },
    logout () {
      this.sendLogoutMessage()
      this.$store.commit('logout')
      window.localStorage.removeItem('id')
      window.localStorage.removeItem('type')
      window.localStorage.removeItem('token')
      window.location.href = window.location.origin + '/login'
    },
    menuAction (name) {
      if (name === 'burger-button') {
        this.spanLeft = this.spanLeft === 3 ? 1 : 3
      } else if (name === 'rest') {
        this.changeRestStatus()
      } else if (name === 'logout') {
        this.logout()
      } else {
        this.$router.push('/' + name)
      }
    }
  },
  created () {
    window.addEventListener('beforeunload', e => this.beforeUnloadHandler(e))
    this.$store.commit('buildSocketConnect')
    // check if the token is valid
    let storeType = window.localStorage.getItem('type')
    let storeId = window.localStorage.getItem('id')
    let storeToken = window.localStorage.getItem('token')
    if (storeType === 'staff' && storeId) {
      axios.get(this.$store.state.httpServerUrl + '/login', {
        params: {
          staffId: storeId,
          token: storeToken
        }
      }).then(response => {
        let body = response.data.data
        console.log(body)
        if (body.code === 0) {
          // successfully login
          this.$store.commit('login')
          this.$store.commit({
            type: 'changeStaffId',
            staffId: storeId
          })
          this.socket.emit('staffReg', {
            staffId: this.$store.state.staffId,
            token: storeToken
          })
          // socket listening initialization
          this.socketListenInit()
        } else {
          window.location.href = window.location.origin + '/login?backUrl=' + window.location.href
        }
      }).catch(error => {
        console.log(error)
        window.location.href = window.location.origin + '/login?backUrl=' + window.location.href
      })
    } else {
      window.location.href = window.location.origin + '/login?backUrl=' + window.location.href
    }
  },
  beforeDestroyed () {
    window.removeEventListener('beforeunload', e => this.beforeUnloadHandler(e))
  }
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  margin: 0;
}
.staff {
  border: 1px solid white;
  border-radius: 10px;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.staff-text {
  font-size: 15px;
}
.staff-copy {
  text-align: center;
  height: 20px;
  width: 100%;
  position: absolute;
  top: calc(100vh - 40px);
  color: #9ea7b4;
}
.staff-menu-left{
  background: #464c5b;
  text-align: center;
  height: calc(100vh - 2px);
}
.menu-header {
  height: 10px;
}
.menu-burger-button, .menu-items {
  text-align: left;
}
.menu-button-space {
  height: 20px;
}
.menu-button-logout-text {
  padding: 0 4px 0 4px;
  letter-spacing: 9px;
}
.staff-right {
  height: calc(100vh - 2px);
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active{
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter {
  transform: translateY(50px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.ivu-col {
  transition: width 0.2s ease-in-out;
}
.ivu-menu-item{
  padding-left: 20px;
}
.ivu-menu-submenu .ivu-menu-item {
  padding-left: 24px;
}
</style>
