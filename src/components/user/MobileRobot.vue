<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app height="56px">
      <v-toolbar-title>{{ companyName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span style="font-size: 16px">
        机器人
      </span>
      <v-btn color="indigo" @click="showSelectStaffTypeDialog = true" >
        <!--<v-icon>redo</v-icon>-->
        转接人工
      </v-btn>
    </v-toolbar>
    <v-dialog v-model="showSelectStaffTypeDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">选择人工客服类型</span>
        </v-card-title>
        <v-card-text style="padding-top: 0; padding-bottom: 0">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-select
                  v-bind:items="items"
                  v-model="staffType"
                  return-object
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="showSelectStaffTypeDialog = false">取消</v-btn>
          <v-btn color="blue darken-1" flat @click.native="switchToHuman">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showChooseDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">客服繁忙</v-card-title>
        <v-card-text>抱歉，暂时没有空闲的该种类人工客服，您可以选择留言或继续等待。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="showChooseDialog = false">继续等待</v-btn>
          <v-btn color="blue darken-1" flat @click.native="showChooseDialog = false; showLeaveMessageDialog = true">留言</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showLeaveMessageDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">留言</v-card-title>
        <v-card-text style="padding-top: 0; padding-bottom: 0">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-form  ref="leaveMessageForm">
                  <v-text-field
                    label="邮箱"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="留言"
                    v-model="leavedMessage"
                    :rules="leavedMessageRules"
                    :counter="256"
                    required
                  ></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cancelLeaveMessage()">取消</v-btn>
          <v-btn color="blue darken-1" flat @click.native="leaveMessage()">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-content>
      <v-alert color="error" icon="warning" dismissible v-model="showAlert">
        {{ alertMessage }}
      </v-alert>
      <v-alert color="success" icon="check_circle" dismissible v-model="showLeaveMessageSuccess">
        留言成功!
      </v-alert>
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
        showSelectStaffTypeDialog: false,
        showChooseDialog: false,
        showLeaveMessageDialog: false,
        showAlert: false,
        showLeaveMessageSuccess: false,
        inputText: '',
        alertMessage: '',
        staffType: { text: '售前', value: '0' },
        email: '',
        companyName: '',
        staffNickName: '',
        staffPicUrl: '',
        staffRole: '',
        emailRules: [
          (v) => !!v || '邮箱不能为空',
          (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || '邮箱格式不合法'
        ],
        leavedMessage: '',
        leavedMessageRules: [
          (v) => !!v || '留言不能为空',
          (v) => v.length <= 256 || '留言不得多于256字'
        ],
        items: [
          { text: '售前', value: '0' },
          { text: '售后', value: '1' }
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
      companyId () {
        return 1
      },
      token () {
        return window.localStorage.getItem('token')
      },
      chatState () {
        return window.localStorage.getItem('chatState')
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
        let sendMsg = this.inputText
        if (sendMsg === '') {
          this.alertMessage = '不可以发送空消息!'
          this.showAlert = true
        } else {
          // send text msg
          let time = this.getCurrentTime()
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
          this.inputText = ''
          // get answer
          const self = this
          axios.get(self.$store.state.robotUrl, {
            params: {
              'question': self.userId,
              'companyId': self.companyId
            }
          }).then(response => {
            let code = response.data.code
            // debug
            // console.log(response.data)
            if (code !== 0) {
              self.alertMessage = '服务器异常，无法获得机器人回答'
              self.showAlert = true
            } else {
              let results = response.data.data.split('\n')
              let len = results.length
              let resultMessage = '我们筛选到' + len + '条可能有用的答案:'
              for (let i = 0; i < len; i++) {
                resultMessage += (i + 1) + results[i]
                if (i !== len - 1) {
                  resultMessage += ';'
                }
              }
              time = self.getCurrentTime()
              self.$store.commit({
                type: 'addChatRecord',
                content: {
                  'from': self.staffId,
                  'to': self.userId,
                  'msg': resultMessage,
                  'type': 'text',
                  'time': time
                  // 'hasSent': false
                }
              })
            }
          })
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
      switchToHuman () {
        // debug
//        this.showSelectStaffTypeDialog = false
//        this.showChooseDialog = true
        this.showSelectStaffTypeDialog = false
        const self = this
        axios.get(self.$store.state.apiServerUrl + '/user/queue', {
          params: {
            'userId': self.userId,
            'tags': self.staffType.value
          }
        }).then(response => {
          let body = response.data.data
          // debug
          console.log(body)
          if (!body || body.code !== 0) {
            self.showChooseDialog = true
          } else {
            // tell staff to update queue
            self.socket.emit('updateQueue', {staffId: body.msg, token: self.token})
            window.localStorage.setItem('staffId', body.msg)
            window.localStorage.setItem('chatState', 'chat')
            window.localStorage.setItem('staffInfo', JSON.stringify(body.data))
            self.$store.commit({
              type: 'clearChatRecord',
              content: {}
            })
            self.$router.push({name: 'chat', userId: self.userId, staffId: body.msg})
          }
        })
      },
      leaveMessage () {
        const self = this
        // debug
        console.log('enter leave message')
        if (this.$refs.leaveMessageForm.validate()) {
          // debug
          console.log('leave message: after validate')
          axios.post(self.$store.state.apiServerUrl + '/user/note', {
            'userId': self.userId,
            'content': self.leavedMessage,
            'email': self.email
          })
            .then(function (res) {
              let body = res.data.data
              if (body === null || body.code !== 0) {
                self.alertMessage = '抱歉，暂时无法留言'
                self.showAlert = true
              } else {
                self.showLeaveMessageSuccess = true
                self.showLeaveMessageDialog = false
                self.$refs.leaveMessageForm.reset()
              }
            })
        }
      },
      cancelLeaveMessage () {
        this.showLeaveMessageDialog = false
        this.$refs.leaveMessageForm.reset()
      }
    },
    created () {
      // check chat state
      if (this.chatState === 'chat') {
        this.$router.push({name: 'chat'})
      }
      const self = this
      window.onresize = () => {
        self.scrollToBottom()
      }
      // if haven't logged in, redirect to login page
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
      axios.get(self.$store.state.apiServerUrl + '/user/company', {
        params: {
          userId: self.userId
        }
      }).then(response => {
        let body = response.data.data
        // debug
        // console.log(body)
        self.companyName = body.company.name
        window.localStorage.setItem('companyName', body.company.name)
      })
    },
    mounted () {
      this.scrollToBottom()
    },
    updated () {
      this.scrollToBottom()
    },
    beforeDestroyed () {
      window.removeEventListener('beforeunload', e => this.logout(e))
    }
  }
</script>
