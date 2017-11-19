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
          <!--<Button type="text" @click="toggleClick">-->
            <!--<Icon type="navicon" size="32"></Icon>-->
          <!--</Button>-->
          <!--<Avatar class="inline-middle" shape="square" icon="person"/>-->
          <!--<span class="inline-middle">xxx公司</span>-->
          <!--<span style="float: right;margin-top: 12px;margin-right: 21px">人工客服</span>-->
        </div>
        <!--<div class="layout-content-msg">-->
          <!--<div class="layout-content-msg-main">messages</div>-->
        <!--</div>-->
        <div class="chat-content">
          <Scroll :on-reach-top="getMoreMessage">
            <ul>
              <li v-for="(singleRecord, index) in currentChatRecord" :key="singleRecord.id">
                <p class="chat-msg-time">
                  <span>{{ singleRecord.time }}</span>
                </p>
                <div class="chat-msg-body" :class="[{'from-me': singleRecord.from.startsWith('user')}]">
                  <div class="avatar chat-single-record">
                    <Avatar shape="square" icon="person"/>
                  </div>
                  <div class="content chat-single-record" :class="[singleRecord.type]">{{ singleRecord.msg }}</div>
                </div>
              </li>
            </ul>
          </Scroll>
        </div>
        <div class="chat-input-actions">
          <div class="chat-input-media">
            <Button type="ghost" icon="document">文件</Button>
            <Button type="ghost" icon="happy">表情</Button>
            <Button type="ghost">历史消息</Button>
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
    /*text-align: center;*/
    height: 100%;
    margin: 0;
  }
  .layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  /*.layout-content-msg{*/
    /*height: calc(100vh - 60px - 30px - 30px - 200px);*/
    /*margin: 15px;*/
    /*margin-bottom: 2px;*/
    /*overflow: hidden;*/
    /*background: #fff;*/
    /*border-radius: 4px;*/
    /*box-shadow: 0 0 1px rgba(0,0,0,.1);*/
  /*}*/
  /*.layout-content-msg-main{*/
    /*padding: 10px;*/
  /*}*/
  /*.layout-content-input{*/
    /*height: 200px;*/
    /*overflow: hidden;*/
    /*margin: 15px;*/
    /*margin-top: 0;*/
    /*background: #fff;*/
    /*border-radius: 4px;*/
    /*box-shadow: 0 1px 1px rgba(0,0,0,.1);*/
  /*}*/
  /*.layout-content-input-main{*/
    /*padding: 10px;*/
    /*max-height: 200px;*/
  /*}*/
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
    /*font-size: 18px;*/
    /*height: 60px;*/
    /*background: #fff;*/
    /*box-shadow: 0 1px 1px rgba(0,0,0,.1);*/
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
  .layout-ceiling-msg a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
</style>
<script>
//  export default {
//    data () {
//      return {
//        spanLeft: 5,
//        spanRight: 19
//      }
//    },
//    computed: {
//      iconSize () {
//        return this.spanLeft === 5 ? 14 : 24
//      }
//    },
//    methods: {
//      toggleClick () {
//        if (this.spanLeft === 5) {
//          this.spanLeft = 2
//          this.spanRight = 22
//        } else {
//          this.spanLeft = 5
//          this.spanRight = 19
//        }
//      }
//    }
//  }
export default {
  name: 'UserChat',
  data () {
    return {
      userId: '1',
      staffId: '2',
      token: '12345678',
      inputText: '',
      earlistRecordIndex: '',
      cachedMsg: {},
      contentList: [
        {
          id: '1',
          msg: 'Hello, I\'m staff_1.',
          from: 'staff_2',
          to: 'user_1',
          type: 'text',
          time: '2017-11-19 15:39:14'
        },
        {
          id: '2',
          msg: 'Hello, I\'m user.',
          from: 'user_1',
          to: 'staff_2',
          type: 'text',
          time: '2017-11-19 15:39:15'
        }
      ]
    }
  },
  computed: {
    currentChatRecord () {
      return this.contentList
    }
  },
  methods: {
    getMoreMessage () {
      let newMsgs = [
        {
          id: '3',
          msg: 'Hello, I\'m staff_1.',
          from: 'staff_2',
          to: 'user_1',
          type: 'text',
          time: '2017-11-19 15:39:14'
        },
        {
          id: '4',
          msg: 'Hello, I\'m user.',
          from: 'user_1',
          to: 'staff_2',
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
      return new Promise(resolve => {
        setTimeout(() => {
          for (let i = 0; i < 2; i++) {
            this.contentList.unshift(newMsgs[i])
          }
          resolve()
        }, 200)
      })
    },
    sendMessage () {
      this.$socket.emit('userTextMsg', {staffId: this.staffId, userId: this.userId, token: this.token, msg: this.inputText})
      let curDate = new Date()
      this.cachedMsg = {
        id: '???',  // TODO: get this from backend?
        msg: 'message', // TODO: how to get this?
        from: this.staffId,
        to: this.userId,
        type: 'text',
        time: curDate.getYear() + '-' + curDate.getMonth + '-' + curDate.getDay() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds()
      }
      this.contentList.push(this.cachedMsg)
    }
  },
  sockets: {
    sendResult (data) {
      if (data['code'] === '1') {
        this.contentList.push(this.cachedMsg)
        this.cachedMsg = {}
      }
    }
  }
}
</script>
