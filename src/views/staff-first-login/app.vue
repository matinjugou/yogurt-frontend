<template>
  <div id="app">
    <div class="first-login-bg"></div>
    <div class="first-login-bg-cover">
      <div class="first-login-body">
        <div class="first-login-body-content">
          <Steps :current="current" :status="status">
              <Step title="欢迎"></Step>
              <Step title="个人信息补充"></Step>
              <Step title="上传头像"></Step>
              <Step title="验证邮箱"></Step>
              <Step title="修改登录密码"></Step>
              <Step title="注册成功"></Step>
          </Steps>
          <div class='first-login-router'>
            <transition :name="slideFadeDirection" mode="out-in">
              <router-view/>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lib from '@/lib'
export default {
  name: 'app',
  data () {
    return {
      msg: '欢迎使用Yogurt客服系统',
      status: 'wait'
    }
  },
  computed: {
    current () {
      return this.$store.state.current
    },
    slideFadeDirection () {
      return 'slide-fade-' + this.$store.state.slideFadeDirection
    }
  },
  methods: {
    // TODO: add methods
  },
  beforeCreate () {
    // handle url params
    let params = lib.getUrlParams(window.location.href)
    if (typeof params.staffId === 'string') {
      if (params.staffId.indexOf('#') >= 0) {
        params.staffId = params.staffId.slice(0, params.staffId.indexOf('#'))
      }
      this.$store.commit({
        type: 'changeStaffId',
        staffId: params.staffId
      })
    } else {
      // TODO: illegal visit
      // jump to login page
      window.location.href = window.location.origin + '/login'
    }
  }
}
</script>
<style scoped>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  width: 100%;
  height: 100vh;
}
.first-login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url(assets/login_bg.svg) fixed no-repeat;
  background-size: cover;
  filter: blur(15px);
}
.first-login-bg-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.first-login-body {
  width: 85vw;
  height: 80vh;
  background: #fff;
  border-radius: 25px;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.2);
  padding-top: 10vh;
  display: flex;
  justify-content: center;
}
.first-login-body-content {
  width: 80%
}
.first-login-router {
  margin: 2% 0 5% 0;
}
.slide-fade-left-enter-active, .slide-fade-right-enter-active {
  transition: all .5s ease;
}
.slide-fade-left-leave-active, .slide-fade-right-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-right-enter, .slide-fade-left-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.slide-fade-right-leave-to, .slide-fade-left-enter {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
