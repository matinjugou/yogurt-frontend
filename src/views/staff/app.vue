<template>
  <div id="app" class="staff">
    <Row type="flex">
      <Col :span="spanLeft" class="staff-menu-left">
        <Menu active-name="1" theme="dark" width="auto" @on-select="menuAction" v-if="spanLeft">
          <!-- here may have a logo -->
          <div class="menu-header"></div>
          <div class="menu-burger-button">
            <MenuItem name="burger-button">
                <Icon type="navicon" size="32"></Icon>
            </MenuItem>
          </div>
          <div class="menu-items">
          <MenuItem name="chat">
            <Icon type="chatboxes" :size="iconSize"></Icon>
            <span class="staff-text" v-if="showText">会话页面</span>
          </MenuItem>
          <MenuItem name="info">
            <Icon type="person-stalker" :size="iconSize"></Icon>
            <span class="staff-text" v-if="showText">个人信息</span>
          </MenuItem>
          <MenuItem name="quick-reply">
            <Icon type="reply-all" :size="iconSize"></Icon>
            <span class="staff-text" v-if="showText">快捷回复</span>
          </MenuItem>
          <MenuItem name="feedback">
            <Icon type="paper-airplane" :size="iconSize"></Icon>
            <span class="staff-text" v-if="showText">客户反馈</span>
          </MenuItem>
          </div>

          <div class="menu-vertical-spacing"></div>
          <Button :type="restAction" shape="circle" icon="coffee" size="large" @click="changeRestStatus">
            <span v-if="showText">{{ restCaption }}</span>
          </Button>
          <div class="menu-button-space"></div>
          <Button type="error" shape="circle" icon="log-out" size="large" @click="logout">
            <span v-if="showText" @click="logout">&nbsp;&nbsp;登&nbsp;&nbsp;出&nbsp;&nbsp;</span>
          </Button>
          <div class="menu-button-space"></div>
          <footer class="staff-copy">
            Yogurt
          </footer>
        </Menu>
      </Col>
      <Col :span="spanRight">
        <transition name = "fade" mode="out-in">
          <router-view/>
        </transition>  
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      spanLeft: 0,
      iconSize: 25,
      showText: true,
      restStatus: false
    }
  },
  computed: {
    restAction () {
      return this.restStatus ? 'success' : 'primary'
    },
    restCaption () {
      return this.restStatus ? '返回工作' : '准备休息'
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
    logout () {
      // TODO: logout

    },
    menuAction (name) {
      if (name === 'burger-button') {
        this.spanLeft = this.spanLeft === 3 ? 1 : 3
        this.showText = !this.showText
      } else {
        this.$router.push('/' + name)
      }
    }
  },
  created () {
    if (this.$store.state.isLogin === false) {
      this.$router.push('/login')
    } else {
      this.spanLeft = 3
      this.$router.push('/index')
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
.staff {
  border: 1px solid white;
  border-radius: 4px;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.staff-text {
  font-size: 15px;
}
.staff-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.staff-menu-left{
  background: #464c5b;
  text-align: center;
}
.menu-header {
  height: 10px;
}
.menu-burger-button, .menu-items {
  text-align: left;
}
.menu-button-space {
  height: 20px;
}
.menu-vertical-spacing {
   height: calc(100vh - 460px);
}
.ivu-col {
  transition: width .2s ease-in-out;
}
</style>
