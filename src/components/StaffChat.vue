<template>
  <div class="staff-chat">
    <Row type="flex">
      <Col :span="spanLeft" class="chat-user-menu vertical-spacing">
        <Menu
          theme="light" 
          width="auto" 
          :open-names="['chatting', 'switching', 'waiting']"
          @on-select="openChatWindow"
        >
          <Submenu name="chatting">
            <template slot="title">
              处理中
            </template>
            <MenuItem v-for="(user, index) in userList" v-if="user.status === 'chatting'":key="user.userid" :name="user.userid">
              <div class="chat-menu-item">
                <Avatar shape="square" icon="person"/>
              </div>
              <div class="chat-menu-item">
                {{ user.userName }} <br />
                {{ user.status }}
              </div>
            </MenuItem>
          </Submenu>
          <Submenu name="switching">
            <template slot="title">
              待转接
            </template>
            <MenuItem v-for="(user, index) in userList" v-if="user.status === 'switching'" :key="user.userid" :name="user.userid">
              <div class="chat-menu-item">
                <Avatar shape="square" icon="person"/>
              </div>
              <div class="chat-menu-item">
                {{ user.userName }} <br />
                {{ user.status }}
              </div>
            </MenuItem>
          </Submenu>
          <Submenu name="waiting">
            <template slot="title">
              正在排队
            </template>
            <MenuItem v-for="(user, index) in userList" v-if="user.status === 'waiting'" :key="user.userid" :name="user.userid">
              <div class="chat-menu-item">
                <Avatar shape="square" icon="person"/>
              </div>
              <div class="chat-menu-item">
                {{ user.userName }} <br />
                {{ user.status }}
              </div>
            </MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col :span="spanMiddle" class="chat-window vertical-spacing">
        <div v-if="isChatting">
          <div class="chat-window-header">
            <div class="chat-window-title">
              {{ chatUserName }}
            </div>
            <div class="chat-window-title-actions">
              <Button type="text">
                <Icon type="share" size="28"></Icon>
              </Button>
              <Button type="text" @click="showInfo">
                <Icon type="more" size="28"></Icon>
              </Button>
              <Button type="text">
                <Icon type="close-round" size="24"></Icon>
              </Button>
            </div>
          </div>
          <div id="chat-window" class="chat-window-content">
            <ul>
              <li v-for="(singleRecord, index) in currentChatRecord" :key="index">
                <p class="chat-msg-time">
                  <span>{{ singleRecord.time }}</span>
                </p>
                <div class="chat-msg-body" :class="[{'from-me': singleRecord.from.startsWith('s')}]">
                  <div class="chat-single-record" v-if="singleRecord.hasSent === false">
                    <Spin></Spin>
                  </div>
                  <div class="avatar chat-single-record">
                    <Avatar shape="square" icon="person"/>
                  </div>
                  <div class="content chat-single-record" :class="[singleRecord.type]">{{ singleRecord.msg }}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="chat-window-input-actions">
            <div class="chat-window-input-media">
              <Button type="ghost" icon="document">文件</Button>
              <Button type="ghost" icon="happy">表情</Button>
              <Button type="ghost" icon="monitor">请求截图</Button>
            </div>
            <div class="chat-window-input-send">
              <Button type="success" icon="paper-airplane" @click="sendMessage">发送</Button>
            </div>
          </div>
          <div class="chat-window-input">
            <Input v-model="inputText" type="textarea" :rows="8" placeholder="在这里输入信息，按Ctrl+Enter发送" @on-keyup.ctrl.enter="sendMessage"></Input>
          </div>
        </div>
        <div v-else>
          当前没有进行的会话
        </div>
      </Col>
      <Col :span="spanRight" v-if="spanRight">
        detail info
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'StaffChat',
  data () {
    return {
      spanLeft: 6,
      spanRight: 0,
      isChatting: false,
      chatUserName: '',
      chatUserId: '',
      inputText: '',
      userList: [
        {
          userid: 'u1',
          userName: '用户1',
          status: 'chatting'
        },
        {
          userid: 'u2',
          userName: '用户2',
          status: 'chatting'
        }
      ],
      contentList: [],
      socket: null
    }
  },
  computed: {
    spanMiddle () {
      return 24 - this.spanLeft - this.spanRight
    },
    currentChatRecord () {
      let userid = this.chatUserId
      return this.contentList.filter(function (singleRecord) {
        return (singleRecord.from === userid) || (singleRecord.to === userid)
      })
    }
  },
  methods: {
    chatWindowScroll () {
      let element = document.getElementById('chat-window')
      element.scrollTop = element.scrollHeight
    },
    openChatWindow (userid) {
      this.isChatting = true
      let name
      for (let user of this.userList) {
        if (user.userid === userid) {
          name = user.userName
          break
        }
      }
      this.chatUserName = name
      this.chatUserId = userid
      // TODO: refresh chat content
      // clear input
      this.inputText = ''
    },
    showInfo () {
      this.spanRight = this.spanRight === 0 ? 3 : 0
    },
    sendMessage () {
      let sendMsg = this.inputText
      if (sendMsg === '') {
        this.$Message.warning({
          content: '不可以发送空消息',
          duration: 3,
          closable: true
        })
        return
      }
      this.inputText = ''
      let date = new Date()
      // TODO: get the staffid
      this.contentList.push({
        'from': this.$store.state.staffId,
        'to': this.chatUserId,
        'msg': sendMsg,
        'type': 'text',
        'time': date.toLocaleTimeString('zh-Hans-CN')
        // 'hasSent': false
      })
      // TODO: send message
      this.socket.emit('staffTextMsg', {
        'staffId': this.$store.state.staffId,
        'userId': this.chatUserId,
        'token': 's1_token',
        'msg': sendMsg
      })
      // TODO: 异步处理消息返回信息（发送成功与否）
    }
  },
  updated () {
    this.chatWindowScroll()
  },
  created () {
    if (this.$store.state.isLogin === false) {
      this.$router.push('/login')
      return
    }
    const io = require('socket.io-client')
    // socket url
    this.socket = io('http://yogurt.magichc7.com', {
      path: '/websocket'
    })
    // TODO:
    // 's1' -> real staff id
    // 's1_token' -> real token
    this.socket.emit('staffReg', this.$store.state.staffId, 's1_token')
    // TODO:
    // deal with register result
    this.socket.on('regResult', (code, msg) => {
      console.log('Register result: code ' + code + '& msg ' + msg)
      if (code === 0) {
        this.$Message.error({
          content: msg,
          duration: 3,
          closable: true
        })
      }
    })
    // TODO:
    // deal with send failure
    // also timeout affair should be taken care of
    this.socket.on('sendResult', (code, msg) => {
      console.log('Send result: code ' + code + '& msg ' + msg)
      if (code === 0) {
        this.$Message.error({
          content: msg,
          duration: 3,
          closable: true
        })
      } else {

      }
    })
    this.socket.on('userTextMsg', (from, msg) => {
      console.log('User text message: from ' + from + '& msg ' + msg)
      let date = new Date()
      this.contentList.push({
        'from': from,
        'to': this.$store.state.staffId,
        'msg': msg,
        'type': 'text',
        'time': date.toLocaleTimeString('zh-Hans-CN')
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vertical-spacing {
  height: calc(100vh - 2px);
}
.chat-user-menu{
  text-align: left;
  background: #FFFFFF;
  overflow: auto;
}
.chat-window {
  text-align: left;
  background: #F8F8F9
}
.chat-menu-item{
  display: inline-flex;
  vertical-align:middle
}
.chat-window-header {
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  padding: 0px 10px 0px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chat-window-title {
  color: #495060;
  font-size: 20px;
  font-weight: Bold;
}
.chat-window-content {
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
  vertical-align: middle;
}
.chat-msg-body > .avatar {
  margin: 0 10px 0 0;
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
.chat-window-input-actions {
  height: 50px;
  background: #FFFFFF;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  padding: 0px 30px 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ivu-col {
  transition: width .1s ease-in-out;
}
</style>
