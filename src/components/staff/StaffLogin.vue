<template>
  <div class="staff-login">
    <!-- should have a logo here -->
    <div class="login-logo">{{ title }}</div>
    <transition name="slide-fade">
    <div class="staff-login-action" v-show="showInput">
      <div class="login-input">
        <Input v-model="username" placeholder="用户名" size="large" autocomplete="on" autofocus @on-keyup.enter="login">
          <span class="input-prepend" slot="prepend">
            <Icon type="person" size="20"></Icon>
          </span>
        </Input>
        <div class="login-input-vertical-space"></div>
        <Input v-model="password" type="password" placeholder="密码" size="large" @on-keyup.enter="login">
          <span class="input-prepend" slot="prepend">
            <Icon type="locked" size="20"></Icon>
          </span>
        </Input>
      </div>
      <div class="login-button">
        <div class="login-button-item">
          <!-- TODO: add forget password page and link to it-->
          <a class="login-link-text" href="#">忘记密码？</a>
        </div>
        <div class="login-button-item ">
          <Button type="success" size="large" @click="login">
            <span class="login-button-text">登录系统</span>
          </Button>
        </div>
      </div>
    </div>
    </transition>
    <footer class="staff-login-footer">
      2017 &copy; yogurt
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StaffLogin',
  data () {
    return {
      title: 'Yogurt 客服系统',
      username: '',
      password: '',
      showInput: false
    }
  },
  methods: {
    login () {
      let username = this.username
      let password = this.password
      if ((username === '') || (password === '')) {
        this.$Message.error({
          content: '用户名和密码不能为空！',
          duration: 3,
          closable: true
        })
        return
      }
      // TODO: encrypted the password
      // TODO: Use axios to send http request
      // this.$store.commit('login')
      // TODO: handle response
      // else pop wrong message
      axios.get(this.$store.state.httpServerUrl + '/login', {
        params: {
          'staffId': username,
          'password': password
        }
      }).then(response => {
        let body = response.data.data
        if (body.code === 0) {
          // successfully login
          this.$store.commit('login')
          this.$store.commit({
            type: 'changeStaffId',
            staffId: username
          })
          // TODO: save token
        } else {
          // error login
          this.$Message.error({
            content: '用户名或密码错误',
            duration: 3,
            closable: true
          })
        }
      }).catch(error => {
        console.log(error)
        this.$Message.error({
          content: '服务器发生错误，请稍后再试...',
          duration: 3,
          closable: true
        })
      })
    }
  },
  created () {
    if (this.$store.state.isLogin) {
      this.$router.push('/index')
    }
  },
  mounted () {
    this.showInput = true
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-login {
  height: calc(100vh - 2px);
  text-align: center;
  background: url(assets/login_background.jpg) center fixed no-repeat;
  padding-top: 25vh;
}
.staff-login-action {
  padding-left: calc(50vw - 150px);
  padding-right: calc(50vw - 150px);
}
.staff-login-footer {
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 24px;
  font-size: 15px;
  color: #fefefe
}
.login-logo {
  font-size: 40px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 100px;
}
.login-input-vertical-space {
  height: 20px;
}
.login-input {
  margin-bottom: 30px;
}
.input-prepend {
  padding: 0 5px 0 5px;
}
.login-button {
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-link-text {
  font-size: 15px;
}
.login-button-text {
  letter-spacing: 2px;
}
a:link {
  color: rgba(255, 255, 255, 0.9);
}
a:visited {
  color: rgba(255, 255, 255, 0.9);
}
a:hover {
  text-decoration:underline;
  color: #ffffff;
}
a:active {
  color: rgba(255, 255, 255, 0.5);
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>

<style>
.ivu-input {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>