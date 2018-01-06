let body = $('body')
body.append(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Yogurt</title>
  <link rel="stylesheet" type="text/css" href="http://unpkg.com/iview/dist/styles/iview.css">
  <script type="text/javascript" src="http://vuejs.org/js/vue.min.js"></script>
  <script type="text/javascript" src="http://unpkg.com/iview/dist/iview.min.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://cdn.bootcss.com/socket.io/2.0.3/socket.io.js"></script>
  <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
<div id="chat">
<div id="chat-window" v-show="showChatWindow">
  <div class="layout">
    <i-row type="flex">
      <div class="chat-header">
        <div class="chat-title">
          {{ companyName }}
        </div>
        <div class="chat-title-actions">
          {{ staffType }}
          <i-button type="text" size="small" @click="showChatWindow = false">
            <Icon type="minus-round" size="18"></Icon>
          </i-button>
        </div>
      </div>
      <div class="chat-content" id="user-chat-content">
        <ul>
          <li v-for="(singleRecord, index) in currentChatRecord">
            <p class="chat-msg-time">
              <span>{{ singleRecord.time }}</span>
            </p>
            <div class="chat-msg-body" :class="[{'from-me': singleRecord.from === userId}]">
              <div class="avatar chat-single-record">
                <Avatar size="small" shape="square" icon="person"/>
              </div>
              <div v-if="singleRecord.type === 'text'" class="content chat-single-record">
                {{ singleRecord.msg }}
              </div>
              <div v-else-if="singleRecord.type === 'image'" class="content chat-single-record" style="cursor: pointer">
                  <img class="chat-image" :src="singleRecord.compressedUrl" alt="聊天图片" @click="showLargeImage(singleRecord.url)">
              </div>
              <div v-else class="content chat-single-record">
                该条消息包含文件，不能在当前页面查看
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- input buttons -->
      <div class="chat-input-actions">
        <div class="chat-window-input-media">
          <!-- <div class="media-button"> -->
          <!-- <div class="media-button" v-if="chatState === 'chat'">
            <i-button type="ghost" size="small" icon="monitor" @click="screenShot()">截屏</Button>
          </div> -->
          <div class="media-button" v-if="chatState !== 'chat'">
            <!-- <i-button type="ghost" size="small" @click="switchToHuman()">转接人工</i-button> -->
            <i-select v-model="staffTypeForm.staffType" size="small">
              <i-option v-for="item in staffTypeOptions" :value="item.value" :key="item.value">{{ item.label }}</i-option>
            </i-select>
          </div>
          <div class="media-button" v-if="chatState !== 'chat'">
            <i-button type="primary" size="small" @click="switchToHuman()">转接人工客服</i-button>
          </div>
        </div>
        <div class="chat-input-send">
          <i-button type="success" size="small" icon="paper-airplane" @click="sendMessage()">发送</i-button>
        </div>
      </div>
      <div class="chat-input">
        <i-input type="textarea" :rows="2" placeholder="在这里输入信息，按Ctrl+Enter发送" v-model="inputText" @on-keyup.ctrl.enter="sendMessage"></i-input>
      </div>
    </i-row>
    <Modal 
      v-model="showAskScreenShotModal" 
      width="80%" 
      title="请求截图"
      @on-ok="screenShot"
      ok-text="允许"
      @on-cancel="showAskScreenShotModal = false"
      cancel-text="拒绝">
        客服向您请求截图
    </Modal>
    <Modal v-model="showLargeImageModal" width="80%" title="聊天图片">
        <div class="large-image">
          <img :src="largeImageSrc" />
        </div>
        <div slot="footer"></div>
      </Modal>
    <Modal 
      v-model="showScreenShotModal" 
      width="80%" 
      title="屏幕截图" 
      @on-ok="sendScreenShot"
      ok-text="发送"
      cancel-text="放弃" 
      @on-cancel="showScreenShotModal = false">
        <div id="screen-shot" class="large-image">
        </div>
    </Modal>
  </div>
</div>
<i-button type="primary" shape="circle" size="large" class="show-chat-window-button" @click="showChatWindow = !showChatWindow;" v-show="!showChatWindow">
  联系客服
</i-button>
</div>
<style scoped>
  #chat-window {
    font-family: 'Avenir', Helvetica, Arial, sans-serif, "Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: fixed;
    right: 0;
    bottom: 0;
    height: 300px;
    width: 450px;
    margin: 0;
    border: 1px solid #d7dde4;
  }
  .show-chat-window-button{
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  .layout{
    background: #f5f7f9;
    /*position: absolute;
    height: 100%;
    width: 100%;*/
    height: 100%;
    border-radius: 4px;
    overflow: auto;
  }
  .chat-header{
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 0px 5px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .chat-title{
    color: #495060;
    font-size: 16px;
    font-weight: Bold;
  }
  .chat-title-actions{
    color: #495060;
    font-size: 14px;
    font-weight: Bold;
  }
  .chat-content{
    height: calc(100% - 122px);
    padding: 5px 5px;
    overflow: auto;
  }
  .chat-msg-time {
    margin: 2px 0;
    text-align: center;
  }
  .chat-msg-time > span {
    display: inline-block;
    padding: 0 18px;
    max-height: 18px;
    color: #fff;
    border-radius: 2px;
    background-color: #dcdcdc;
  }
  .chat-single-record {
    display: inline-flex;
    vertical-align: text-top;
    margin-right: 5px;
  }
  .chat-msg-body > .content {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: 50%;
    min-height: 25px;
    line-height: 2;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .chat-msg-body > .content::before {
    content: " ";
    position: absolute;
    top: 6px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #ffffff;
  }
  .from-me {
    text-align: right;
  }
  .from-me > .avatar {
    float: right;
    margin: 0 0 0 5px;
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
    height: 30px;
    background: #FFFFFF;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 0px 10px 0px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .chat-window-input-media > .media-button{
    display: inline-flex;
  }
  .chat-image {
    max-width: 300px;
    width: expression(this.width>100px?"300px":this.width);
    max-height: 300px;
    height: expression(this.height>100px?"300px":this.height);
    margin-top: 10px;
    margin-bottom: 10px;
    vertical-align: middle;
  }
  .large-image {
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: scroll;
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
</style>`)
new Vue({
      el: '#chat',
      data () {
        return {
          userId: '',
          staffId: '',
          companyId: '',
          companyName: '',
          staffType: '',
          chatState: '',
          token: '',
          staffTypeForm: {
            userId: this.userId,
            staffType: ''
          },
          staffTypeOptions: [
            {
              value: '0',
              label: '售前'
            },
            {
              value: '1',
              label: '售后'
            }
          ],
          // isHuman: false,
          inputText: '',
          showAskScreenShotModal: false,
          showScreenShotModal: false,
          screenShotSrc: '',
          showLargeImageModal: false,
          showChatWindow: false,
          largeImageSrc: '',
          chatRecordList: [],
          fileServerUrl: 'http://123.206.22.71/api/v2/file/',
          fileCompressUrl: 'http://123.206.22.71/api/v1/image/',
          socketIoServerUrl: 'http://60.205.178.28:8361',
          robotUrl: 'http://123.206.22.71/api/v1/robot/',
          apiServerUrl: 'http://yogurt.magichc7.com/api/user',
          userLoginUrl: 'http://yogurt.magichc7.com/api/user/login',
          socket: null
        }
      },
      computed: {
        currentChatRecord () {
          return this.chatRecordList;
        }
      },
      methods: {
        sendMessage () {
          let sendMsg = this.inputText
          if (sendMsg === '') {
            this.showAlert('不可以发送空消息!')
          } else {
            let time = this.getCurrentTime()
            this.currentChatRecord.push({
              'from': this.userId,
              'to': this.staffId,
              'msg': sendMsg,
              'type': 'text',
              'time': time
            })
            this.inputText = ''
            if (this.chatState !== 'chat') {
              // robot
              const self = this
              axios.get(self.robotUrl, {
                params: {
                  'question': self.userId,
                  'companyId': self.companyId
                }
              }).then(response => {
                let code = response.data.code
                if (code !== 0) {
                  self.showAlert('抱歉，暂时无法获得机器人回复')
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
                  self.currentChatRecord.push({
                    'from': self.staffId,
                    'to': self.userId,
                    'msg': resultMessage,
                    'type': 'text',
                    'time': time
                  })
                }
              })
            } else {
              // human
              this.socket.emit('userMsg', {
                staffId: this.staffId,
                userId: this.userId,
                token: this.token,
                msg: sendMsg,
                type: 'text'
              })
            }
          }
        },
        showAlert (alertMessage) {
          this.$Message.warning({
            content: alertMessage,
            duration: 10,
            closable: true
          })
        },
        showInfo (infoMessage) {
          this.$Message.info({
            content: infoMessage,
            duration: 10,
            closable: true
          })
        },
        switchToHuman () {
          if (this.staffTypeForm.staffType === '') {
            this.showAlert('您还没有选择客服类型')
            return
          }
          const self = this
          axios.get(self.apiServerUrl + '/queue', {
            params: {
              'userId': self.userId,
              'tags': self.staffTypeForm.staffType
            }
          }).then(response => {
            let body = response.data.data
            if (!body || body.code !== 0) {
              self.showAlert('暂无空闲的该种类客服，请您耐心等待')
            } else {
              // clear chat record
              while(self.currentChatRecord.length) {
                self.currentChatRecord.pop()
              }
              self.staffId = body.msg
              sessionStorage.setItem('staffId', body.msg)
              self.chatState = 'chat'
              sessionStorage.setItem('chatState', 'chat')
              self.socket.emit('updateQueue', {staffId: body.msg, token: self.token})
              for (let option of self.staffTypeOptions) {
                if (option.value === self.staffTypeForm.staffType) {
                  self.staffType = option.label
                  sessionStorage.setItem('staffType', option.label)
                }
              }
              self.showInfo('成功转接到人工客服!')
            }
          })
        },
        screenShot () {
          const self = this
          setTimeout(function () {
            html2canvas(document.body).then(function (canvas) {
              let el = document.getElementById('screen-shot')
              while (el.lastChild) {
                el.removeChild(el.lastChild)
              }
              el.appendChild(canvas)
              self.showScreenShotModal = true
            })
          }, 1000)
        },
        sendScreenShot () {
          let canvas = document.getElementById('screen-shot').firstChild
          let self = this
          canvas.toBlob(function (blob) {
            let formData = new FormData()
            formData.append('file', blob)
            formData.append('fileType', 'image/png')
            formData.append('validTime', '1')
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            let fileUrl = ''
            let compressedUrl = ''
            let time = self.getCurrentTime()
            axios.post(self.fileServerUrl, formData, config)
              .then(function (res) {
                fileUrl = res.data.data
                if (fileUrl.length) {
                  axios.post(self.fileCompressUrl, {'fileUrl': fileUrl})
                    .then(function (res) {
                      compressedUrl = res.data.data.length ? res.data.data : compressedUrl
                      self.currentChatRecord.push({
                        'from': self.userId,
                        'to': self.staffId,
                        'url': fileUrl,
                        'compressedUrl': compressedUrl,
                        'type': 'image',
                        'time': time
                      })
                      self.socket.emit('userMsg', {
                        time: time,
                        staffId: self.staffId,
                        userId: self.userId,
                        token: self.token,
                        type: 'image',
                        url: fileUrl,
                        compressedUrl: compressedUrl
                      })
                    })
                } else {
                  self.showAlert('上传截图失败!')
                }
              })
            })
        },
        showLargeImage (src) {
          // debug
          console.log('show large image, src: ' + src)
          this.showLargeImageModal = true
          this.largeImageSrc = src
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
        logout (event) {
          event.preventDefault()
          this.socket.emit('userLogOut', {
            userId: this.userId,
            token: this.token
          })
          window.localStorage.clear()
        },
      },
      created () {
        this.userId = '1_u1' // sessionStorage.getItem('userId')
        if (!sessionStorage.getItem('staffId')) {
          this.staffId = 'robot'
        } else {
          this.staffId = sessionStorage.getItem('staffId')
        }
        this.companyId = '1' // sessionStorage.getItem('companyId')
        this.companyName = 'xxx公司' // sessionStorage.getItem('companyName')
        if (!sessionStorage.getItem('staffType')) {
          this.staffType = '机器人'
        } else {
          this.staffType = sessionStorage.getItem('staffType')
        }
        if (!sessionStorage.getItem('chatState')) {
          this.chatState = 'robot'
        } else {
          this.chatState = sessionStorage.getItem('chatState')
        }
        const self = this
        axios.post(self.userLoginUrl, {
          'userId': self.userId
        }).then(response => {
          let body = response.data.data
          if (body.code === 0) {
            sessionStorage.setItem('token', body.token)
            self.token = body.token
          } else {
            self.showAlert('与socket.io服务器通讯失败!')
          }
        })
        this.socket = io(this.socketIoServerUrl, {'transports': ['polling']})
        this.socket.emit('userReg', {userId: this.userId, token: this.token, accessWay: 'embedded-window', sourcePage: sessionStorage.getItem('sourcePage'), data: sessionStorage.getItem('data')})
        // debug
        console.log('Sent userReg.')
        this.socket.on('regResult', (data) => {
          // debug
          console.log('Register result: code: ' + data['code'] + ', msg: ' + data['msg'])
        })
        this.socket.on('staffMsg', (data) => {
          if (data.type === 'snapshot') {
            this.showAskScreenShotModal = true
            return
          }
          let newMsg = {
            'time': data.time,
            'from': data.staffId,
            'to': data.userId,
            'type': data.type
          }
          newMsg.msg = data.msg
          self.currentChatRecord.push(newMsg)
        })
        this.socket.on('sendResult', (data) => {
          // debug
          console.log(data)
        })
        window.addEventListener('beforeunload', e => this.logout(e))
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
  })