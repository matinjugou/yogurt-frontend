<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app height="56px">
      <v-toolbar-title>xxx公司</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container :class="{'no-function-panel': !functionPanelVisible, 'with-function-panel': functionPanelVisible}">
          <ul style="list-style: none">
            <li v-for="(singleRecord, index) in currentChatRecord">
              <p class="chat-msg-time">
                <span>{{ singleRecord.time }}</span>
              </p>
              <div class="chat-msg-body" :class="[{'from-me': singleRecord.from.startsWith('1_u')}]">
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
      <v-container class="input-container">
        <v-layout row>
          <v-flex p>
            <v-btn flat icon color="indigo" @click="showFunctionPanel()">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <v-text-field id="text-field"
              label="在此输入消息"
            ></v-text-field>
          </v-flex>
          <v-flex p>
            <v-btn flat icon color="indigo">
              <v-icon>send</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <trainsition name="function-panel-slide">
        <container v-show="functionPanelVisible" class="function-panel-container">
          <v-layout>
            <v-flex p style="text-align: left">
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
        </container>
      </trainsition>
    </v-content>
  </v-app>
</template>
<style>
  .container {
    padding: 8px;
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
    height: calc(100vh - 179px);
  }
  .no-function-panel {
    height: calc(100vh - 121px);
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
    /*min-height: 30px;*/
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
    background-color: #2d8cf0;
  }
  .from-me > .content::before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #2d8cf0;
  }
  .input-container {
    padding: 0;
    height: 65px;
    overflow: hidden;
  }
  .function-panel-container {
    height: 58px;
  }
</style>
<script>
  export default {
    name: 'UserChatMobile',
    data () {
      return {
        functionPanelVisible: false,
//        chatRecordContainerHeight: 'calc(100vh-178px)',
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
            msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            from: '1_u1',
            to: '1_s1',
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
      showFunctionPanel () {
        if (!this.functionPanelVisible) {
          this.functionPanelVisible = true
        } else {
//          let el = document.getElementById('text-field')
//          el.focus()
          this.functionPanelVisible = false
        }
      }
    }
  }
</script>
