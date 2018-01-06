<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app height="56px">
      <v-toolbar-title>{{ companyName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="staffNickName.length" style="font-size: 16px">
        {{staffNickName}}（{{ staffRole }}）
      </span>
      <span v-else style="font-size: 16px">
        {{ staffRole }}
      </span>
    </v-toolbar>
    <v-content>
      <v-container id="chat-record-container" :class="{'no-function-panel': !functionPanelVisible, 'with-function-panel': functionPanelVisible}">
        <!--<v-container :class="{'no-function-panel': !functionPanelVisible, 'with-function-panel': functionPanelVisible}" id="chat-record-container">-->
        <div class="chat-window-get-history">
          <v-progress-circular v-show="isGettingHistoryRecord" indeterminate color="primary"></v-progress-circular>
          <a @click="getHistoryRecord()">
            <Icon type="clock"/>加载历史消息
          </a>
        </div>
        <ul style="list-style: none">
          <li v-for="(singleRecord, index) in currentChatRecord">
            <p class="chat-msg-time">
              <span>{{ singleRecord.time }}</span>
            </p>
            <div class="chat-msg-body" :class="[{'from-me': singleRecord.from === userId}]">
              <div class="avatar chat-single-record">
                <v-avatar size="40px" class="indigo">
                  <v-icon dark>account_circle</v-icon>
                </v-avatar>
              </div>
              <div v-if="singleRecord.type === 'text'" class="content chat-single-record">
                {{ singleRecord.msg }}
              </div>
              <div v-else class="content chat-single-record">
                该条消息包含图片／文件，只能在电脑端查看
              </div>
            </div>
          </li>
        </ul>
      </v-container>
      <v-container id="input-container">
        <v-layout row>
          <!--<v-flex p>-->
            <!--<v-btn flat icon color="indigo" @click="showFunctionPanel">-->
              <!--<v-icon>add</v-icon>-->
            <!--</v-btn>-->
          <!--</v-flex>-->
          <v-flex xs11 offset-xs1>
            <v-text-field id="text-field"
                          @click="textFieldClicked"
                          label="在此输入消息"
                          v-model="inputText"
            ></v-text-field>
          </v-flex>
          <v-flex p>
            <v-btn flat icon color="indigo" @click="sendMessage">
              <v-icon>send</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <!--<v-layout v-show="functionPanelVisible" id="function-panel-layout">-->
          <!--<v-flex p>-->
            <!--<v-btn flat>-->
              <!--<v-icon>folder_open</v-icon>文件-->
            <!--</v-btn>-->
          <!--</v-flex>-->
          <!--<v-flex p>-->
            <!--<v-btn flat>-->
              <!--<v-icon>chat</v-icon>历史-->
            <!--</v-btn>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
      </v-container>
    </v-content>
  </v-app>
</template>
<style scoped>
  .container {
    padding: 8px;
  }
  #chat-record-container {
    position: relative;
    overflow: scroll;
  }
  .chat-window-get-history {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chat-msg-time {
    margin: 4px 0;
    text-align: center;
  }
  .chat-msg-time > span {
    display: inline-block;
    padding: 0 18px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #dcdcdc;
  }
  .with-function-panel {
    height: calc(100vh - 56px - 74px - 58px);
  }
  .no-function-panel {
    height: calc(100vh - 56px - 74px);
  }
  .chat-single-record {
    display: inline-flex;
    vertical-align: text-top;
    margin-right: 10px;
  }
  .chat-msg-body > .content {
    position: relative;
    padding: 7px;
    max-width: 65vw;
    min-height: 36px;
    font-size: 16px;
    line-height: 20px;
    text-align: left;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .chat-msg-body > .content::before {
    content: " ";
    position: absolute;
    top: 12px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #ffffff;
  }
  .from-me {
    text-align: right;
  }
  .from-me > .avatar {
    float: right;
    margin: 0 0 0 10px;
  }
  .from-me > .content {
    margin-right: 0;
    color: #ffffff;
    background-color: #5687f0;
  }
  .from-me > .content::before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #5687f0;
  }
  #input-container {
    padding: 0;
    position: absolute;
    bottom: 0;
  }
  #function-panel-layout {
    height: 58px;
    text-align: center;
  }
</style>
<script>
  import axios from 'axios'
  export default {
    name: 'UserChatMobile',
    data () {
      return {
        functionPanelVisible: false,
        inputText: '',
        companyName: '',
        staffNickName: '',
        staffPicUrl: '',
        staffRole: '',
        isGettingHistoryRecord: false,
        isScrollDown: false
      }
    },
    computed: {
      apiServerUrl () {
        return this.$store.state.apiServerUrl
      },
      currentChatRecord () {
        return this.$store.state.chatRecordList
      },
      userId () {
        return window.localStorage.getItem('userId')
      },
      staffId () {
        return window.localStorage.getItem('staffId')
      },
      token () {
        return window.localStorage.getItem('token')
      },
      socket () {
        return this.$store.state.socket
      }
//      chatRecordContainerHeight () {
//        return (this.vh - (this.functionPanelVisible ? 179 : 121))
//      },
//      vh () {
//        return document.documentElement.clientHeight
//      }
    },
    methods: {
      showFunctionPanel () {
        if (!this.functionPanelVisible) {
          this.functionPanelVisible = true
        } else {
          this.functionPanelVisible = false
        }
      },
      textFieldClicked () {
        this.scrollToBottom()
        this.functionPanelVisible = false
      },
      scrollToBottom () {
        let el = document.getElementById('chat-record-container')
        if (el) {
          el.scrollTop = el.scrollHeight
        }
      },
      sendMessage () {
        // debug
        console.log('sending message: ' + this.inputText)
        let sendMsg = this.inputText
        if (sendMsg === '') {
          // debug
          console.log('不能发送空消息！')
          return
        }
        this.isScrollDown = true
        let time = this.getCurrentTime()
        // send text msg
        if (sendMsg !== '') {
          this.$store.commit({
            type: 'addChatRecord',
            content: {
              'from': this.userId,
              'to': this.staffId,
              'msg': sendMsg,
              'type': 'text',
              'time': time
              // 'hasSent': false
            }
          })
          this.socket.emit('userMsg', {
            staffId: this.staffId,
            userId: this.userId,
            token: this.token,
            msg: sendMsg,
            type: 'text'
          })
          // clear input
          this.inputText = ''
        }
      },
      zeroFill (num, size) {
        let s = '000000000' + num
        return s.substr(s.length - size)
      },
      getCurrentTime () {
        let curDate = new Date()
        return curDate.getFullYear() +
          '-' + this.zeroFill(curDate.getMonth() + 1, 2) +
          '-' + this.zeroFill(curDate.getDate(), 2) +
          ' ' + this.zeroFill(curDate.getHours(), 2) +
          ':' + this.zeroFill(curDate.getMinutes(), 2) +
          ':' + this.zeroFill(curDate.getSeconds(), 2)
      },
      getHistoryRecord () {
        this.isGettingHistoryRecord = true
        this.isScrollDown = false
        const self = this
        let currentIndex
        axios.get(this.apiServerUrl + '/user/chat-record', {
          params: {
            'userId': this.userId,
            'staffId': this.staffId,
            'index': -1
          }
        }).then(response => {
          let body = response.data.data
          if (body.length > 0) {
            currentIndex = body[0].index
            currentIndex -= self.currentChatRecord.length
            if (currentIndex < 0) {
              self.isGettingHistoryRecord = false
              return
            }
            axios.get(self.apiServerUrl + '/user/chat-record', {
              params: {
                'userId': self.userId,
                'staffId': self.staffId,
                'index': currentIndex
              }
            }).then(response => {
              let body2 = response.data.data
              if (body2.length > 0) {
                let content = []
                for (let value of body2) {
                  let newMsg = value.content
                  // debug
                  if (value.direction === 's_u') {
                    newMsg.from = value.staffId
                    newMsg.to = value.userId
                  } else {
                    newMsg.from = value.userId
                    newMsg.to = value.staffId
                  }
                  // debug
                  console.log(newMsg)
                  content.unshift(newMsg)
                }
                this.$store.commit({
                  'type': 'prependChatRecord',
                  'content': content
                })
              }
              this.isGettingHistoryRecord = false
            }).catch(error => {
              console.log(error)
              this.isGettingHistoryRecord = false
            })
          } else {
            this.isGettingHistoryRecord = false
          }
        }).catch(error => {
          console.log(error)
          this.isGettingHistoryRecord = false
        })
      },
      logout (event) {
        // TODO
        alert('你确定要离开吗？')
        event.preventDefault()
        this.socket.emit('userLogOut', {
          userId: this.userId,
          token: this.token
        })
        window.localStorage.clear()
      }
    },
    created () {
      const self = this
      window.onresize = () => {
        self.scrollToBottom()
      }
      // if haven't logged in, redirect to login page
      // debug
      console.log('userId in mobilechat: ' + self.userId)
      axios.get(self.$store.state.userLoginUrl, {
        params: {
          'userId': self.userId,
          'token': self.token
        }
      }).then(response => {
        let body = response.data.data
        if (body.code !== 0) {
          window.location.href = window.location.origin + '/user#/login'
        }
      })
      // set company and staff informations
      self.companyName = window.localStorage.getItem('companyName')
      let staffInfo = JSON.parse(window.localStorage.getItem('staffInfo'))
      // debug
      console.log(staffInfo)
      self.staffNickName = staffInfo.nickname
      self.staffPicUrl = staffInfo.picUrl
      self.staffRole = staffInfo.role
      this.socket.emit('userReg', {userId: this.userId, token: this.token, accessWay: 'webpage'})
      // debug
      console.log('Sent userReg.')
      this.socket.on('regResult', (data) => {
        // debug
        console.log('Register result: code: ' + data['code'] + ', msg: ' + data['msg'])
      })
      // socket messages
      this.socket.on('staffMsg', (data) => {
        let newMsg = {
          'time': data.time,
          'from': data.staffId,
          'to': data.userId,
          'type': data.type
        }
        if (data.type === 'text') {
          newMsg.msg = data.msg
        }
        self.$store.commit({
          type: 'addChatRecord',
          content: newMsg
        })
      })
      this.socket.on('sendResult', (data) => {
        // TO DO
      })
      window.addEventListener('beforeunload', e => this.logout(e))
    },
    mounted () {
      this.scrollToBottom()
    },
    updated () {
      if (this.isScrollDown) {
        this.scrollToBottom()
      }
    },
    beforeDestroyed () {
      window.removeEventListener('beforeunload', e => this.logout(e))
    }
  }
</script>
