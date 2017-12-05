<template>
  <div class="right-content">
    <div class="layout-header">
      <Row type="flex" justify="start" style="padding-left: 10px;padding-top: 10px">
        <h1 style="padding-left: 5px;border-left: 5px solid #2baee9">管理员信息设置
        </h1>
      </Row>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">
        <Row type="flex">
          <my-avatar btnName="修改头像" :imgsrc="avatarSrc" @avatarChanged="avatarChanged">
          </my-avatar>
          <Spin fix v-if="avatarLoading">
            <div class="loader">
              <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
              </svg>
            </div>
          </Spin>
          <div style="padding-left: 20px">
            <Card style="width: 500px; height:210px">
              <h2 slot="title">
                {{ managerName }}
              </h2>
              <a href="#" slot="extra" @click.prevent="changeRobotName">
                修改昵称
              </a>
              <a href="#" slot="extra" @click.prevent="changeRobotName">
                修改密码
              </a>
              <div style="max-height:130px; overflow: auto">
                <p style="padding-bottom: 3px"><b>管理员ID:&nbsp;</b>{{ managerID }}</p>
                <p style="padding-bottom: 3px"><b>所属公司:&nbsp;</b>{{ companyName }}</p>
              </div>
            </Card>
          </div>
        </Row>
      </div>
    </div>
    <div style="margin: 15px">
      <Row type="flex" style="padding-bottom: 7px; margin-bottom: 10px;border-bottom: 1px solid #e9eaec">
        <h3 style="padding-left: 5px;border-left: 5px solid orange">
          其他信息
        </h3>
      </Row>
      <Row>
        <h5 style="padding-bottom: 5px">个人邮箱</h5>
        <p>thss15_huangc@163.com</p>
      </Row>
    </div>
    <div class="layout-copy">
      2017-2017 &copy; HJZY开发小组
    </div>
  </div>
</template>
<script>
  import MyAvatar from '@/components/public/MyAvatar'
  import axios from 'axios'
  export default {
    name: 'managerinfo',
    data () {
      return {
        avatarSrc: '',
        avatarLoading: true,
        managerName: 'Yogurt',
        managerID: '1_m1',
        companyName: '清华大学软件学院',
        avatarData: {
          fileType: 'avatar',
          validTime: 1
        },
        avatarCropRatio: '1:1'
      }
    },
    methods: {
      avatarChanged: function () {
        console.log('excuted')
        const self = this
        axios.get(self.$store.state.httpServerUrl + '/account-info', {
          params: {
            managerId: self.$store.state.managerId
          }
        }).then(function (res) {
          console.log(res)
          const data = res.data.data
          self.avatarSrc = data.picUrl
        }).catch(function (error) {
          console.log(error)
        })
      },
      changeRobotName: function () {
      }
    },
    components: {
      'my-avatar': MyAvatar
    },
    mounted () {
      const self = this
      axios.get(self.$store.state.httpServerUrl + '/account-info', {
        params: {
          managerId: self.$store.state.managerId
        }
      }).then(function (res) {
        console.log(res)
        const data = res.data.data
        self.avatarSrc = data.picUrl
        self.avatarLoading = false
      }).catch(function (error) {
        console.log(error)
      })
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
  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
