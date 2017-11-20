<template>
  <div id="app">
    <div class="layout-ceiling">
      <div class="layout-ceiling-label">
        <a>Yogurt客服系统</a>
      </div>
      <div class="layout-ceiling-main">
        <a href="#">登录</a> |
        <a href="#">帮助中心</a> |
        <a href="#">服务中心</a>
      </div>
    </div>
    <Row type="flex">
      <Col :xs="6" :sm="6" :md="3" :lg="3">
        <Menu id="left-menu" theme="dark" accordion width="auto">
          <Row id="avatar-block" type="flex" justify="center">
            <Col>
              <Avatar :style="{background: 'orange'}" size="large">USER</Avatar>
              <h3 style="color: white">企业名称</h3>
              <span style="color: white">管理员姓名</span>
            </Col>
          </Row>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              系统状态
            </template>
            <MenuItem name="1-1">系统状态</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              客服管理
            </template>
            <MenuItem name="2-1">
              <router-link to="/stfmgn">客服管理</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              设置
            </template>
            <MenuItem name="3-1">机器人设置</MenuItem>
            <MenuItem name="3-2">
              <router-link to="/settings-quickrly">快捷回复设置</router-link>
            </MenuItem>
            <MenuItem name="3-3">购买设置</MenuItem>
            <MenuItem name="3-4">企业信息设置</MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col :xs="18" :sm="18" :md="21" :lg="21">
        <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
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
</style>
