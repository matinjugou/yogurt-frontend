<template>
  <div class="right-content">
    <link href="https://cdn.bootcss.com/vuetify/0.17.0/vuetify.min.css" rel="stylesheet">
    <div class="layout-header">
      <Row type="flex" justify="start" style="padding-left: 10px;padding-top: 10px">
        <h1 style="padding-left: 5px;border-left: 5px solid #2baee9">机器人设置
        </h1>
      </Row>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">
        <Row type="flex">
          <!--div-- class="img-container" style="width: 307px;height: 307px">
            <img src="http://pic.58pic.com/58pic/13/19/78/59U58PICDad_1024.jpg" center width="300px" height="300px">
          </div-->
          <my-avatar btnName="修改头像" :imgsrc="robotAvatar"
                     @picUploaded="avatarUploaded">
          </my-avatar>
        </Row>
      </div>
    </div>
    <div style="margin: 15px">
      <Row type="flex" style="padding-bottom: 7px; margin-bottom: 10px;border-bottom: 1px solid #e9eaec">
        <h3 style="padding-left: 5px;border-left: 5px solid orange">
          接入时显示的消息
        </h3>
      </Row>
      <Row>
        <Input v-model="inMessage"
               type="textarea"
               placeholder="Enter something..."
               style="margin-bottom: 10px"/>
      </Row>
      <Row type="flex" style="padding-bottom: 7px; margin-bottom: 10px;border-bottom: 1px solid #e9eaec">
        <h3 style="padding-left: 5px;border-left: 5px solid orange">
          语料库设置
        </h3>
      </Row>
      <Row>
        当前语料库，<a :href="corpusFileLink">点此下载</a>
      </Row>
      <Row style="margin-top: 7px">
        <Upload
        multiple
        type="drag"
        :before-upload="uploadCorpusFile"
        :show-upload-list=false
        action="//jsonplaceholder.typicode.com/posts/">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽以上传语料库</p>
          </div>
        </Upload>
      </Row>
    </div>
    <div class="layout-copy">
      2017-2017 &copy; HJZY开发小组
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MyAvatar from '@/components/public/MyAvatar'
  export default {
    name: 'robotmanager',
    data () {
      return {
        robotName: 'Yogurt',
        inMessage: '',
        leaveMessage: ''
      }
    },
    methods: {
      changeRobotName: function () {
      },
      avatarUploaded: function (picUrl) {
        const self = this
        axios.put(self.$store.state.httpServerUrl + '/company-info', {
          companyId: self.$store.state.companyId,
          robotAvatar: picUrl
        }).then(function () {
          axios.get(self.$store.state.httpServerUrl + '/company-info', {
            params: {
              companyId: self.$store.state.companyId
            }
          }).then(function (res) {
            console.log(res)
            const data = res.data.data
            self.$store.commit({
              type: 'changeRobotAvatar',
              companyRobotAvatar: data.robotAvatar
            })
          }).catch(function (error) {
            console.log(error)
          })
        })
      },
      uploadCorpusFile: function (file) {
        const self = this
        const formData = new FormData()
        formData.append('file', file)
        formData.append('companyId', this.$store.state.companyId)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(this.$store.state.robotServerUrl, formData, config)
          .then(function (res) {
            console.log(res)
            axios.put(self.$store.state.httpServerUrl + '/company-info', {
              companyId: self.$store.state.companyId,
              corpusFile: res.data.data
            }).then(function () {
              axios.get(self.$store.state.httpServerUrl + '/company-info', {
                params: {
                  companyId: self.$store.state.companyId
                }
              }).then(function (res) {
                console.log(res)
                const data = res.data.data
                self.$store.commit({
                  type: 'changeCorpusFile',
                  companyCorpusFile: data.corpusFile
                })
              }).catch(function (error) {
                console.log(error)
              })
            })
          })
        return false
      }
    },
    computed: {
      robotAvatar () {
        return this.$store.state.companyRobotAvatar
      },
      corpusFileLink () {
        return this.$store.state.companyCorpusFile
      }
    },
    components: {
      'my-avatar': MyAvatar
    }
  }
</script>

<style scoped>
  .right-content {
    min-height: 100vh;
    width: 960px;
    min-width: 960px;
    overflow: auto
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
