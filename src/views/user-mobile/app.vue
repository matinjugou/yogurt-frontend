<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app height="150px">
      <v-toolbar-title>xxx公司</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container style="height: calc(100vh - 350px)">
          <ul style="list-style: none">
            <li v-for="(singleRecord, index) in currentChatRecord">
              <p class="chat-msg-time">
                <span>{{ singleRecord.time }}</span>
              </p>
              <div class="chat-msg-body" :class="[{'from-me': singleRecord.from.startsWith('1_u')}]">
                <div class="avatar chat-single-record">
                  <v-avatar size="100px" class="indigo">
                    <v-icon x-large dark>account_circle</v-icon>
                  </v-avatar>
                  <!--<Avatar shape="square" icon="person"/>-->
                </div>
                <div v-if="singleRecord.type === 'text'" class="content chat-single-record">
                  {{ singleRecord.msg }}
                </div>
              </div>
            </li>
          </ul>
      </v-container>
      <v-container style="height: 200px">
        <v-layout row>
          <v-flex xs9>
            <v-text-field
              label="在此输入消息"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn fab dark color="cyan">
              <v-icon dark>folder_open</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn fab dark color="cyan">
              <v-icon dark>tag_faces</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn fab dark color="cyan">
              <v-icon dark>chat</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<style>
  .chat-msg-time {
    margin: 15px 0;
    text-align: center;
  }
  .chat-msg-time > span {
    display: inline-block;
    padding: 0 18px;
    font-size: 24px;
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
    padding: 0 20px;
    /*max-width: calc(100vw - 40px);*/
    /*min-height: 100px;*/
    line-height: 2.5;
    font-size: 36px;
    text-align: left;
    word-break: break-all;
    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .chat-msg-body > .content::before {
    content: " ";
    position: absolute;
    top: 25px;
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

</style>
<script>
  export default {
    name: 'UserChatMobile',
    data () {
      return {
        showFunctionPanel: false,
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
        ]
      }
    },
    computed: {
      currentChatRecord () {
        return this.contentList
      }
    }
  }
</script>
