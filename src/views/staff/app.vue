<template>
  <div id="app" class="layout">
    <Row type="flex">
      <Col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="1" theme="dark" width="auto" @on-select="jumpRouter">
          <!-- here may have a logo -->
          <MenuItem name="chat">
            <Icon type="chatboxes" :size="iconSize"></Icon>
            <span class="layout-text">会话页面</span>
          </MenuItem>
          <MenuItem name="info">
            <Icon type="person-stalker" :size="iconSize"></Icon>
            <span class="layout-text">个人信息</span>
          </MenuItem>
          <MenuItem name="quick-reply">
            <Icon type="reply-all" :size="iconSize"></Icon>
            <span class="layout-text">快捷回复</span>
          </MenuItem>
          <MenuItem name="feedback">
            <Icon type="paper-airplane" :size="iconSize"></Icon>
            <span class="layout-text">客户反馈</span>
          </MenuItem>
          <div class="menu-vertical-spacing"></div>
          <MenuItem name='rest' disabled>
            <Button type="primary" shape="circle" icon="coffee" @click="changeRestStatus">{{ restAction }}</Button>
          </MenuItem>
        </Menu>
      </Col>
      <Col :span="spanRight">
          <div class="layout-router-view">
            <router-view/>
          </div>
          <footer class="layout-copy">
            2017 &copy; Yogurt
          </footer>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      spanLeft: 3,
      iconSize: 20,
      restStatus: false
    }
  },
  computed: {
    restAction () {
      return this.restStatus ? '恢复工作' : '准备休息'
    },
    spanRight () {
      return 24 - this.spanLeft
    }
  },
  methods: {
    changeRestStatus () {
      // TODO: give server a message
      this.restStatus = !this.restStatus
    },
    jumpRouter (name) {
      this.$router.push('/' + name)
    }
  }
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  margin: 0;
}
.layout{
  border: 1px solid white;
  border-radius: 4px;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.layout-copy{
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left{
  background: #464c5b;
  text-align: center;
}
.layout-router-view{
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ivu-col{
  transition: width .2s ease-in-out;
}
.menu-vertical-spacing {
   height: calc(100vh - 266.5px);
}
</style>
