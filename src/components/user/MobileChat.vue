<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app height="56px">
      <v-toolbar-title>xxx公司</v-toolbar-title>
      <v-spacer></v-spacer>
      <span style="font-size: 16px">
        人工客服
      </span>
    </v-toolbar>
    <v-content>
      <v-container id="chat-record-container" :class="{'no-function-panel': !functionPanelVisible, 'with-function-panel': functionPanelVisible}">
        <!--<v-container :class="{'no-function-panel': !functionPanelVisible, 'with-function-panel': functionPanelVisible}" id="chat-record-container">-->
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
            </div>
          </li>
        </ul>
      </v-container>
      <v-container id="input-container">
        <v-layout row>
          <v-flex p>
            <v-btn flat icon color="indigo" @click="showFunctionPanel">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12>
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
        <v-layout v-show="functionPanelVisible" id="function-panel-layout">
          <v-flex p>
            <v-btn flat>
              <v-icon>tag_faces</v-icon>表情
            </v-btn>
          </v-flex>
          <v-flex p>
            <v-btn flat>
              <v-icon>folder_open</v-icon>文件
            </v-btn>
          </v-flex>
          <v-flex p>
            <v-btn flat>
              <v-icon>chat</v-icon>历史
            </v-btn>
          </v-flex>
        </v-layout>
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
        contentList: [
          {
            id: '1',
            msg: 'Hello, I\'m staff_1.',
            from: '1_s1',
            to: '1_u1',
            type: 'text',
            time: '2017-11-19 15:39:14'
          },
          {
            id: '2',
            msg: 'Hello, I\'m user_1.',
            from: '1_u1',
            to: '1_s1',
            type: 'text',
            time: '2017-11-19 15:39:15'
          }
//          {
//            id: '3',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '4',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '3',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '4',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '3',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '4',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '3',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '4',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '3',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '4',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '3',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          },
//          {
//            id: '4',
//            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//            from: '1_u1',
//            to: '1_s1',
//            type: 'text',
//            time: '2017-11-19 15:39:15'
//          }
        ]
      }
    },
    computed: {
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
      logout (event) {
        alert('你确定要离开吗？')
        event.preventDefault()
        this.socket.emit('userLogOut', {
          userId: this.userId,
          token: this.token
        })
        window.localStorage.clear()
      },
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
      getCurrentTime () {
        let curDate = new Date()
        return curDate.toLocaleTimeString('zh-Hans-CN')
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
      // for debug
//      window.localStorage.setItem('userId', '1_u1')
//      window.localStorage.setItem('staffId', '1_s1')
      // send userreg message
//      const io = require('socket.io-client')
//      this.socket = io(this.$store.state.socketIoServerUrl)
      this.socket.emit('userReg', {userId: this.userId, token: this.token})
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
      this.scrollToBottom()
    }
  }
</script>
