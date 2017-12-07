<template>
  <div class="robot-chat">
    <div class="layout">
      <Row type="flex">
        <Col span="5" class="layout-menu-left">
        <Menu active-name="1" theme="dark" width="auto">
        </Menu>
        </Col>
        <Col span="19">
        <div class="chat-header">
          <div class="chat-title chat-title-company-name">
            XXX公司
          </div>
          <div class="chat-title chat-title-staff-type">
            机器人
            <Button type="text" @click="showModal = true">
              <Icon type="android-share" size="28"></Icon>
            </Button>
            <Modal
              v-model="showModal"
              title="选择人工服务类型"
              @on-ok="switchToHuman()">
              请选择人工服务类型：
              <Select v-model="formItem.staffType">
                <Option value="0">售前</Option>
                <Option value="1">售后</Option>
              </Select>
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
              <Button type="ghost" icon="chatboxes">历史消息</Button>
            </div>
          </div>
          <div class="chat-input-send">
            <Button type="success" icon="paper-airplane" @click="sendMessage">发送</Button>
          </div>
        </div>
        <div class="chat-input">
          <Input v-model="inputText" type="textarea" :rows="8" placeholder="在这里输入信息，按Ctrl+Enter发送"></Input>
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
    max-width: calc(100vw - 40px);
    min-height: 30px;
    line-height: 2.5;
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
</style>
<script>
  import axios from 'axios'
  export default {
    name: 'UserChat',
    data () {
      return {
        inputText: '',
        earlistRecordIndex: '',
        uploadList: [],
        imgFileIndex: -1,
        showModal: false,
        formItem: {
          userId: this.userId,
          staffType: '0'
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
        return window.localStorage.getItem('staffId')
      },
      token () {
        return window.localStorage.getItem('token')
      },
      chatState () {
        return window.localStorage.getItem('chatState')
      }
    },
    methods: {
      sendMessage () {
        let sendMsg = this.inputText
        if (sendMsg === '') {
          this.$Notice.warning({
            title: '不可以发送空消息！'
          })
          return
        }
        let time = this.getCurrentTime()
        // send text msg
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
          'staffId': this.staffId,
          'userId': this.userId,
          'token': this.token,
          'msg': sendMsg,
          'type': 'text'
        })
        // clear input
        this.inputText = ''
      },
      getCurrentTime () {
        let curDate = new Date()
        return curDate.toLocaleTimeString('zh-Hans-CN')
      },
      scrollToBottom () {
        let el = document.getElementById('user-chat-content')
        el.scrollTop = el.scrollHeight
      },
      switchToHuman () {
        const self = this
        axios.get(self.$store.state.apiServerUrl + '/queue', {
          params: {
            'userId': self.userId,
            'tags': self.formItem.staffType
          }
        }).then(response => {
          let body = response.data.data
          // debug
          console.log(body)
          if (!body || body.code !== 0) {
            self.$Message.info('抱歉，暂时没有空闲的该种类人工客服，请您耐心等待。')
          } else {
            // tell staff to update queue
            self.socket.emit('updateQueue', {staffId: body.msg, token: self.token})
            window.localStorage.setItem('staffId', body.msg)
            window.localStorage.setItem('chatState', 'chat')
            self.$router.push({name: 'chat', userId: self.userId, staffId: body.msg})
          }
        })
      }
    },
    created () {
      // if haven't login, show login page instead
      const self = this
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
      const io = require('socket.io-client')
      this.socket = io(this.$store.state.socketIoServerUrl)
      this.socket.emit('userReg', {userId: this.userId, token: this.token})
      // debug
      console.log('Sent userReg.')
      this.socket.on('regResult', (data) => {
        // debug
        console.log('Register result: code: ' + data['code'] + ', msg: ' + data['msg'])
      })
      this.socket.on('staffMsg', (data) => {
        let newMsg = {
          'time': data.time,
          'from': data.staffId,
          'to': data.userId,
          'type': data.type,
          'msg': data.msg
        }
        this.currentChatRecord.push(newMsg)
      })
      this.socket.on('sendResult', (data) => {
        // TO DO
      })
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    },
    updated () {
      this.scrollToBottom()
    }
  }
</script>
