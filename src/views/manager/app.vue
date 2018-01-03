<template>
  <div id="app">
    <div class="layout-ceiling">
      <div class="layout-ceiling-label">
        <a>Yogurt客服系统</a>
      </div>
      <div class="layout-ceiling-main">
        <a @click="logout">登出</a>
      </div>
    </div>
    <Row type="flex">
      <Col :xs="6" :sm="6" :md="3" :lg="3">
        <Menu id="left-menu" theme="dark" accordion width="auto">
          <Row id="avatar-block" type="flex" justify="center">
            <Col>
              <Avatar :src="avatarSrc" :style="{background: 'orange'}" size="large" @click.native="jump('/mgninfo')"></Avatar>
              <h3 style="color: white">{{ companyName }}</h3>
              <span style="color: white">{{ managerName }}</span>
            </Col>
          </Row>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              系统状态
            </template>
            <MenuItem name="1-1" @click.native="jump('/systemstatus')">系统状态</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              留言管理
            </template>
            <MenuItem name="2-1" @click.native="jump('/usermessage')">留言管理</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              客服管理
            </template>
            <MenuItem name="3-1" @click.native="jump('/stfmgn')">
              客服管理
            </MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              设置
            </template>
            <MenuItem name="4-1" @click.native="jump('/settings-robot')">
              机器人设置
            </MenuItem>
            <MenuItem name="4-2" @click.native="jump('/settings-quickrly')">
              快捷回复设置
            </MenuItem>
            <!--MenuItem name="4-3">购买设置</MenuItem>
            <MenuItem name="4-4">企业信息设置</MenuItem-->
          </Submenu>
        </Menu>
      </Col>
      <Col :xs="18" :sm="18" :md="21" :lg="21">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </Col>
    </Row>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
      }
    },
    computed: {
      avatarSrc () {
        return this.$store.state.picUrl
      },
      companyName () {
        return this.$store.state.companyName
      },
      managerName () {
        return this.$store.state.nickname
      }
    },
    methods: {
      jump: function (str) {
        this.$router.push(str)
      },
      logout () {
        this.$store.commit('logout')
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('type')
        window.localStorage.removeItem('token')
        window.location.href = window.location.origin + '/login'
      }
    },
    created () {
      const self = this
      let storeType = window.localStorage.getItem('type')
      let storeId = window.localStorage.getItem('id')
      let storeToken = window.localStorage.getItem('token')
      if (storeType === 'manager' && storeId) {
        axios.get(self.$store.state.httpServerUrl + '/login', {
          params: {
            managerId: storeId,
            token: storeToken
          }
        }).then(response => {
          let body = response.data.data
          if (body.code === 0) {
            self.$store.commit('login')
            self.$store.commit({
              type: 'changeManagerId',
              managerId: storeId
            })
            axios.get(self.$store.state.httpServerUrl + '/account-info', {
              params: {
                managerId: self.$store.state.managerId
              }
            }).then(res => {
              console.log(res)
              self.$store.commit({
                type: 'changeManagerId',
                ...res.data.data
              })
              const companyId = res.data.data.companyId
              axios.get(self.$store.state.httpServerUrl + '/company-info', {
                params: {
                  companyId: companyId
                }
              }).then(res => {
                const data = res.data.data
                self.$store.commit({
                  type: 'changeCompanyInfo',
                  companyName: data.name,
                  companyLogo: data.picUrl,
                  companyRobotAvatar: data.robotAvatar,
                  companyCorpusFile: data.corpusFile
                })
              })
            })
          } else {
            window.location.href = window.location.origin + '/login?backUrl=' + window.location.href
          }
        }).catch(error => {
          console.log(error)
          window.location.href = window.location.origin + '/login?backUrl=' + window.location.href
        })
      } else {
        window.location.href = window.location.origin + '/login?backUrl=' + window.location.href
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 0;
  }
  #left-menu {
    min-height: 100vh;
  }
  #avatar-block {
    padding-top: 20px;
    padding-bottom: 5px;
    text-align: center;
  }
  #avatar-block .ivu-avatar {
    margin-bottom: 10px;
  }
  #left-menu a.router-link-active{
    color: white;
  }
  .layout-ceiling{
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
    min-height: 30px;
  }
  .layout-ceiling-label{
    float: left;
    margin-left: 15px;
  }
  .layout-ceiling-label a{
    color: white;
  }
  .layout-ceiling-main{
    float: right;
    margin-right: 15px;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active{
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter {
    transform: translateY(50px);
    opacity: 0;
  }
  .slide-fade-leave-to {
    transform: translateY(50px);
    opacity: 0;
  }
</style>
