<template>
  <div class="robot-chat">
    <div class="layout">
      <Row type="flex">
        <Col span="24">
        <div class="chat-header">
          <div class="chat-title chat-title-company-name">
            {{ companyName }}
          </div>
          <div class="chat-title">
            机器人
            <Modal
              v-model="showModal"
              title="选择人工服务类型"
              @on-ok="switchToHuman()">
              请选择人工服务类型：
              <Select v-model="staffTypeForm.staffType">
                <Option value="0">售前</Option>
                <Option value="1">售后</Option>
              </Select>
            </Modal>
            <Modal
              v-model="showChooseModal"
              title="暂无空闲客服"
              ok-text="留言"
              cancel-text="继续等待"
              @on-ok="showLeaveMessageModal = true">
              暂无空闲的该类型人工客服，您可以选择留言或继续等待
            </Modal>
            <Modal
              v-model="showLeaveMessageModal"
              title="留言"
              @on-ok="leaveMessage()"
              @on-cancel="cancelLeaveMessage()"
              :loading="loading">
              <!--请输入邮箱(客服人员将会尽快将回复发送至此邮箱)：-->
              <!--<Input v-model="email" icon="ios-email" placeholder="输入邮箱..."></Input>-->
              <!--请输入您的留言：-->
              <!--<Input v-model="leavedMessage" type="textarea" icon="ios-chatboxes" placeholder="输入留言..."></Input>-->
              <Form ref="leaveMessageForm" label-position="right" :label-width="100" :model="leaveMessageForm" :rules="leaveMessageRules">
                <FormItem prop="email" label="邮箱">
                  <Input v-model="leaveMessageForm.email" size="large" placeholder="在此输入您的邮箱"></Input>
                </FormItem>
                <FormItem prop="leavedMessage" label="留言">
                  <Input v-model="leaveMessageForm.leavedMessage" type="textarea" :rows="4" size="large" placeholder="您的留言"></Input>
                </FormItem>
              </Form>
            </Modal>
          </div>
        </div>

        <!-- chat records -->
        <div class="chat-content" id="user-chat-content">
          <ul>
            <li v-for="(singleRecord, index) in currentChatRecord">
              <p class="chat-msg-time">
                <span>{{ singleRecord.time }}</span>
              </p>
              <div class="chat-msg-body" :class="[{'from-me': singleRecord.from === userId}]">
                <div class="avatar chat-single-record">
                  <Avatar shape="square" icon="person"/>
                </div>
                <div v-if="singleRecord.type === 'text'" class="content chat-single-record">
                  {{ singleRecord.msg }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- input buttons -->
        <div class="chat-input-actions">
          <div class="chat-window-input-media">
            <div class="media-button">
              <Button type="ghost" icon="chatboxes" @click="showModal = true">转接人工</Button>
            </div>
          </div>
          <div class="chat-input-send">
            <Button type="success" icon="paper-airplane" @click="sendMessage">发送</Button>
          </div>
        </div>
        <div class="chat-input">
          <Input v-model="inputText" type="textarea" :rows="8" placeholder="在这里输入信息，按Ctrl+Enter发送" @on-keyup.ctrl.enter="sendMessage"></Input>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif, "Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    margin: 0;
  }
  .layout{
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: auto;
  }
  .layout-copy{
    text-align: center;
    /*padding: 10px 0 20px;*/
    height: 30px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .chat-header{
    height: 60px;
    background: #FFFFFF;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 0px 10px 0px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .chat-title{
    color: #495060;
    font-size: 20px;
    font-weight: Bold;
  }
  .chat-title-switch{
    font-size: 16px;
  }
  .chat-content{
    height: calc(100vh - 290px);
    padding: 10px 15px;
    overflow: auto;
  }
  .chat-msg-time {
    margin: 7px 0;
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
  .chat-single-record {
    display: inline-flex;
    vertical-align: text-top;
    margin-right: 10px;
  }
  .chat-msg-body > .content {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(50vw);
    min-height: 30px;
    line-height: 2;
    font-size: 16px;
    text-align: left;
    word-break: break-all;
    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .chat-msg-body > .content::before {
    content: " ";
    position: absolute;
    top: 9px;
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
    color: #ffffff;
    background-color: #2d8cf0;
  }
  .from-me > .content::before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #2d8cf0;
  }
  .chat-input-actions{
    height: 50px;
    background: #FFFFFF;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 0px 30px 0px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .chat-window-input-media > .media-button{
    display: inline-flex;
  }
  .layout-ceiling-msg a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-modal-body {
    height: auto;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .menu-item-text{
    font-size: 15px;
  }
</style>
<script>
  import axios from 'axios'
  export default {
    name: 'UserChat',
    data () {
      return {
        companyName: '',
        inputText: '',
        leaveMessageForm: {
          email: '',
          leavedMessage: ''
        },
        earlistRecordIndex: '',
        showModal: false,
        showLeaveMessageModal: false,
        showChooseModal: false,
        loading: true,
        staffTypeForm: {
          userId: this.userId,
          staffType: '0'
        },
        leaveMessageRules: {
          email: [
            {
              required: true,
              message: '邮箱不能为空',
              trigger: 'blur'
            },
            {
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '邮箱格式有误',
              trigger: 'blur'
            }
          ],
          leavedMessage: [
            {
              required: true,
              message: '留言不能为空',
              trigger: 'blur'
            },
            {
              type: 'string',
              max: 256,
              message: '留言不得多于256字',
              trigger: 'blur'
            }
          ]
        }
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
        // return window.localStorage.getItem('staffId')
        return 'robot'
      },
      companyId () {
        return 1 // TO DO
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
    },
    methods: {
      sendMessage () {
        let sendMsg = this.inputText
        if (sendMsg === '') {
          this.$Notice.warning({
            title: '不可以发送空消息！'
          })
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
              self.$Notice.error({
                title: '服务器异常，无法获得机器人回答'
              })
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
//        this.socket.emit('userMsg', {
//          'staffId': this.staffId,
//          'userId': this.userId,
//          'token': this.token,
//          'msg': sendMsg,
//          'type': 'text'
//        })
//        // clear input
//        this.inputText = ''
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
      scrollToBottom () {
        let el = document.getElementById('user-chat-content')
        el.scrollTop = el.scrollHeight
      },
      switchToHuman () {
        // debug
        // this.showChooseModal = true
        const self = this
        axios.get(self.$store.state.apiServerUrl + '/user/queue', {
          params: {
            'userId': self.userId,
            'tags': self.staffTypeForm.staffType
          }
        }).then(response => {
          let body = response.data.data
          // debug
          // console.log(body)
          if (!body || body.code !== 0) {
            self.showChooseModal = true
            // self.$Message.info('抱歉，暂时没有空闲的该种类人工客服，请您耐心等待。')
          } else {
            // tell staff to update queue
            // self.socket.emit('updateQueue', {staffId: body.msg, token: self.token})
            // debug
            console.log(body)
            window.localStorage.setItem('staffId', body.msg)
            window.localStorage.setItem('chatState', 'chat')
            window.localStorage.setItem('staffInfo', JSON.stringify(body.data))
            self.socket.emit('updateQueue', {staffId: body.msg, token: self.token})
            self.$store.commit({
              type: 'clearChatRecord',
              content: {}
            })
            self.$router.push({name: 'chat', userId: self.userId, staffId: body.msg})
          }
        })
      },
      leaveMessage () {
        let isValid = this.validateForm('leaveMessageForm')
        if (isValid === false) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }
//        if (this.email === '' || this.leavedMessage === '') {
//          this.$Message.error('邮箱或留言不能为空!')
//          this.loading = false
//          this.$nextTick(() => {
//            this.loading = true
//          })
//          return
//        }
//        let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
//        if (reg.test(this.email) === false) {
//          this.$Message.error('邮箱地址不合法!')
//          this.loading = false
//          this.$nextTick(() => {
//            this.loading = true
//          })
//          return
//        }
//        if (this.leavedMessage.length >= 256) {
//          this.$Message.error('留言不得多于256字!')
//          this.loading = false
//          this.$nextTick(() => {
//            this.loading = true
//          })
//          return
//        }
        const self = this
        axios.post(self.$store.state.apiServerUrl + '/user/note', {'userId': self.userId, 'content': self.leaveMessageForm.leavedMessage, 'email': self.leaveMessageForm.email})
          .then(function (res) {
            let body = res.data.data
            if (body === null || body.code !== 0) {
              self.$Message.error('抱歉，暂时无法留言')
              self.loading = false
              self.$nextTick(() => {
                self.loading = true
              })
            } else {
              self.$Message.info('留言成功!')
              self.showLeaveMessageModal = false
              self.resetForm('leaveMessageForm')
            }
          })
      },
      cancelLeaveMessage () {
        this.resetForm('leaveMessageForm')
      },
      validateForm (name) {
        let result = false
        this.$refs[name].validate((valid) => {
          result = valid
        })
        return result
      },
      resetForm (name) {
        this.$refs[name].resetFields()
      }
    },
    created () {
      // if haven't login, show login page instead
      const self = this
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
      // debug
      console.log('userId in robot-chat: ' + self.userId)
      console.log('token in robot-chat: ' + self.token)
      axios.get(self.$store.state.userLoginUrl, {
        params: {
          'userId': self.userId,
          'token': self.token
        }
      }).then(response => {
        let body = response.data.data
        if (body.code !== 0) {
          self.$router.push('login')
        }
      })
      // send userreg message
//      const io = require('socket.io-client')
//      this.socket = io(this.$store.state.socketIoServerUrl)
//      this.socket.emit('userReg', {userId: this.userId, token: this.token})
//      // debug
//      console.log('Sent userReg.')
//      this.socket.on('regResult', (data) => {
//        // debug
//        console.log('Register result: code: ' + data['code'] + ', msg: ' + data['msg'])
//      })
//      this.socket.on('staffMsg', (data) => {
//        let newMsg = {
//          'time': data.time,
//          'from': data.staffId,
//          'to': data.userId,
//          'type': data.type,
//          'msg': data.msg
//        }
//        this.currentChatRecord.push(newMsg)
//      })
//      this.socket.on('sendResult', (data) => {
//        // TO DO
//      })
    },
    updated () {
      this.scrollToBottom()
    }
  }
</script>
