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
          <div style="padding-left: 20px">
            <Card style="width: 500px; height:210px">
              <h2 slot="title">
                {{ robotName }}
              </h2>
              <a href="#" slot="extra" @click.prevent="changeRobotName">
                <Icon type="edit"></Icon>
                修改昵称
              </a>
              <div style="max-height:130px; overflow: auto">
                <h5>基本信息</h5>
                <p>XXX公司专属客服机器人</p>
                <h5>诞生日期</h5>
                <p>2017年11月22日</p>
                <h5>专攻领域</h5>
                <p>软件工程</p>
              </div>
            </Card>
          </div>
        </Row>
      </div>
    </div>
    <div style="margin: 15px">
      <Row type="flex" style="padding-bottom: 7px; margin-bottom: 10px;border-bottom: 1px solid #e9eaec">
        <h3 style="padding-left: 5px;border-left: 5px solid orange">
          消息设置
        </h3>
      </Row>
      <Row>
        <h4 style="margin-bottom: 7px">
          接入时显示的消息
        </h4>
        <Input v-model="inMessage"
               type="textarea"
               placeholder="Enter something..."
               style="margin-bottom: 10px"/>
      </Row>
      <Row>
        <h4 style="margin-bottom: 7px">
          结束服务时显示的消息
        </h4>
        <Input v-model="leaveMessage"
               type="textarea"
               placeholder="Enter something..."
               style="margin-bottom: 10px"/>
      </Row>
      <Row>
        <h4 style="margin-bottom: 7px">
          转接时显示的消息
        </h4>
        <Input v-model="transMessage"
               type="textarea"
               placeholder="Enter something..."/>
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
        leaveMessage: '',
        transMessage: ''
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
      }
    },
    computed: {
      robotAvatar () {
        return this.$store.state.companyRobotAvatar
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
