<template>
  <div id="app">
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
            售后
          </div>
        </div>
        <div class="chat-content" v-scroll="getMoreMessage" ref="userChatContent">
            <ul>
              <li v-for="(singleRecord, index) in currentChatRecord">
                <p class="chat-msg-time">
                  <span>{{ singleRecord.time }}</span>
                </p>
                <div class="chat-msg-body" :class="[{'from-me': singleRecord.from.startsWith('1_u')}]">
                  <div class="avatar chat-single-record">
                    <Avatar shape="square" icon="person"/>
                  </div>
                  <div v-if="singleRecord.type === 'text'" class="content chat-single-record">
                    {{ singleRecord.msg }}
                  </div>
                  <div v-else-if="singleRecord.type === 'file'" @click="singleRecord.from === staffId ? downloadFile() : showLocalFile()" class="content chat-single-record" style="cursor: pointer">
                    <template v-if="singleRecord.suffix.startsWith('png')">
                      <div style="margin-top: 10px">
                        <img v-bind:src=singleRecord.imgUrl />
                      </div>
                    </template>
                    <template v-else>
                      <div v-if="singleRecord.suffix.startsWith('doc')" class="fileicon-doc"></div>
                      <div v-else-if="singleRecord.suffix.startsWith('pdf')" class="fileicon-pdf"></div>
                      <div v-else-if="singleRecord.suffix.startsWith('xls')" class="fileicon-xls"></div>
                      <div v-else-if="singleRecord.suffix.startsWith('txt')" class="fileicon-txt"></div>
                      <div v-else class="fileicon-unknown"></div>
                      <div style="float: right">
                        <div class="file-name">
                          {{ singleRecord.msg }}
                        </div>
                        <div class="file-size">
                          {{ singleRecord.size }}
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </li>
            </ul>
        </div>
        <div class="chat-emoji-panel" v-show="showEmojiPanel">
          <picker
            ref="emoji-mart"
            native
            :i18n="emojiLocalization"
            :perLine="10"
            color="#2d8cf0"
            @click="insertEmoji"
          ></picker>
        </div>
        <div class="chat-input-actions">
          <div class="chat-input-media">
            <input type="file" ref="uploadFile" style="display:none" @change="handleUploadChange">
            <Button type="ghost" icon="document" @click="clickUploadFile">文件</Button>
            <Button type="ghost" icon="happy" @click="() => {showEmojiPanel = !showEmojiPanel}">表情</Button>
            <Button type="ghost file">历史消息</Button>
            <Button type="ghost" icon="monitor">截图</Button>
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  .file-name {
    margin-top: 10px;
    line-height: 22px;
    height: 50px;
    width: 240px;
    overflow: hidden;
  }
  .file-size {
    position: absolute;
    bottom: 0;
    margin-right: 10px;
    line-height: 22px;
    height: 30px;
    width: 240px;
    overflow: hidden;
  }
  .from-me > .content::before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #2d8cf0;
  }
  .fileicon-doc,
  .fileicon-pdf,
  .fileicon-txt,
  .fileicon-xls,
  .fileicon-unknown
  {
    float: left;
    margin: 10px;
    margin-left: 0;
    background: url('./assets/file_icon.png');
  }
  .fileicon-doc {
    width: 80px;
    height: 80px;
    background-position: 0 0;
  }
  .fileicon-pdf {
    width: 80px;
    height: 80px;
    background-position: -90px 0;
  }
  .fileicon-txt {
    width: 80px;
    height: 80px;
    background-position: -180px 0;
  }
  .fileicon-unknown {
    width: 80px;
    height: 80px;
    background-position: -270px 0;
  }
  .fileicon-xls {
    width: 80px;
    height: 80px;
    background-position: -360px 0;
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
  .layout-ceiling-msg a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .chat-emoji-panel {
    position: absolute;
    bottom: 225px;
  }
</style>
<script>
  let enableScroll = true
  export default {
    name: 'UserChat',
    data () {
      return {
        userId: '1_u1', // companyid + '_' + u + userid
        staffId: '1_s1',
        token: '12345678',
        inputText: '',
        earlistRecordIndex: '',
        showEmojiPanel: false,
        cachedMsg: {},
        emojiLocalization: {
          search: '搜索',
          notfound: '没有找到表情',
          categories: {
            search: '搜索结果',
            recent: '常用',
            people: '表情符号与人物',
            nature: '动物与自然',
            foods: '食物与饮料',
            activity: '活动',
            places: '旅行与地点',
            objects: '物体',
            symbols: '符号',
            flags: '旗帜',
            custom: '自定义'
          }
        },
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
            msg: 'Hello, I\'m user.',
            from: '1_u1',
            to: '1_s1',
            type: 'text',
            time: '2017-11-19 15:39:15'
          }
        ],
        imgFileIndex: -1
      }
    },
    computed: {
      currentChatRecord () {
        return this.contentList
      }
    },
    methods: {
      getMoreMessage () {
        enableScroll = false

        // debug
        console.log('get more message')
        let newMsgs = [
          {
            msg: 'Hello, I\'m staff_1.',
            from: '1_s1',
            to: '1_u1',
            type: 'text',
            time: '2017-11-19 15:39:14'
          },
          {
            id: '4',
            msg: 'Hello, I\'m user.',
            from: '1_u1',
            to: '1_s1',
            type: 'text',
            time: '2017-11-19 15:39:15'
          }]
//      let newMsgs = []
//      let url = '/char-record?userId=' + this.userId + '&staffId=' + this.staffId + '&index=' + this.earlistRecordIndex
//      this.$http.get(url).then((response) => {
//        let data = response.json()
//        newMsgs = data['records']
//        this.earlistRecordIndex = data['index']
//      }, (response) => {
//      })
        setTimeout(() => {
          for (let i = 0; i < 2; i++) {
            this.contentList.unshift(newMsgs[i])
          }
          let el = this.$refs.userChatContent
          el.scrollTop = 100
          enableScroll = true
        }, 200)
      },
      sendMessage () {
        // debug
        console.log('Sent userTextMsg')
        this.socket.emit('userTextMsg', {staffId: this.staffId, userId: this.userId, token: this.token, msg: this.inputText})
        let curDate = new Date()
        this.cachedMsg = {
          msg: this.inputText, // TODO: how to get this?
          from: this.userId,
          to: this.staffId,
          type: 'text',
          time: curDate.getFullYear() + '-' + curDate.getMonth() + '-' + curDate.getDay() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds()
        }
        this.inputText = ''
      },
      scrollToBottom () {
        this.$nextTick(() => {
          let el = this.$refs.userChatContent
          el.scrollTop = el.scrollHeight
        })
      },
      clickUploadFile () {
        this.$refs.uploadFile.click()
      },
      handleUploadChange () {
        let inputDOM = this.$refs.uploadFile
        let files = inputDOM.files
        this.handleChosenFiles(files)
      },
      handleChosenFiles (files) {
        let len = files.length
        if (len === 0) {
          return
        }
        for (let i = 0; i < len; i++) {
          let file = files[i]
          let curDate = new Date()
          let fileRecord = {
            msg: file.name,
            from: this.userId,
            to: this.staffId,
            type: 'file',
            filetype: file.type,
            size: file.size + ' KB',
            suffix: file.name.substr(file.name.lastIndexOf('.') + 1),
            time: curDate.getFullYear() + '-' + curDate.getMonth() + '-' + curDate.getDay() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds()
          }
//          if (/^image/.test(file.type) && window.FileReader) {
//            let reader = new FileReader()
//            reader.readAsDataURL(file)
//            this.contentList.push(fileRecord)
//            this.scrollToBottom()
//            reader.onload = function (e) {
//              fileRecord.imgUrl = e.target.result
//            }
//          }
          if (/^image/.test(file.type) && URL.createObjectURL) {
            fileRecord.imgUrl = URL.createObjectURL(file)
          }
          this.contentList.push(fileRecord)
          this.scrollToBottom()
        }
      },
      downloadFile () {
        // debug
        console.log('downloadFile')
      },
      showLocalFile () {
        // debug
        console.log('showLocalFile')
      },
      insertEmoji (emoji, event) {
        this.inputText += emoji.native
        console.log(this.inputText)
      },
      preventDefaultEvent (eventName) {
        document.addEventListener(eventName, function (e) {
          e.preventDefault()
        }, false)
      },
      addDropSupport () {
        let chatwindow = this.$refs.userChatContent
        chatwindow.addEventListener('drop', (e) => {
          e.preventDefault()
//          if (this.readonly) return false
//          this.errText = ''
          let fileList = e.dataTransfer.files
          if (fileList.length === 0) {
            return false
          }
          if (fileList.length > 1) {
//            this.errText = '暂不支持多文件'
            return false
          }
          this.handleChosenFiles(fileList)
        })
      }
    },
    created () {
      const io = require('socket.io-client')
      this.socket = io('http://yogurt.magichc7.com')
      this.socket.emit('userReg', {userId: this.userId, token: this.userId + '_token'})
      // debug
      console.log('Sent userReg.')
      this.socket.on('regResult', (data) => {
        // debug
        console.log('Register result: code: ' + data['code'] + ', msg: ' + data['msg'])
      })
      this.socket.on('staffTextMsg', (data) => {
        // debug
        console.log('receive staffTextMsg: msg: ' + data['msg'] + ', from' + data['from'] + ', type: ' + data['type'] + ', time: ' + data['time'])
        let newMsg = {
          msg: data['msg'],
          from: data['from'],
          to: this.userId,
          type: data['type'],
          time: data['time']
        }
        this.contentList.push(newMsg)
        this.scrollToBottom()
      })
      this.socket.on('sendResult', (data) => {
        // debug
        console.log('receive sendResult: code: ' + data['code'] + ', msg: ' + data['msg'])
        if (data['code'] === 1) {
          this.contentList.push(this.cachedMsg)
          this.scrollToBottom()
        }
      })
    },
    directives: {
      scroll: {
        bind: function (el, binding) {
          el.addEventListener('scroll', () => {
            console.log('scrolly: ' + el.scrollTop)
            if (el.scrollTop === 0 && enableScroll) {
              let fnc = binding.value
              fnc()
            }
          })
        }
      }
    },
    mounted () {
      ['dragleave', 'drop', 'dragenter', 'dragover'].forEach(e => {
        this.preventDefaultEvent(e)
      })
      this.addDropSupport()
    }
  }
</script>
