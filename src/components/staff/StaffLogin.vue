<template>
  <div class="staff-login">
    <!-- should have a logo here -->
    <div class="login-logo">{{ title }}</div>
    <div class="staff-login-action">
      <div class="login-input">
        <Input v-model="username" placeholder="用户名" size="large" autocomplete="on" autofocus>
          <span slot="prepend">
            &nbsp;
            <Icon type="person" size="20"></Icon>
            &nbsp;
          </span>
        </Input>
        <div class="login-input-vertical-space"></div>
        <Input v-model="password" type="password" placeholder="密码" size="large">
          <span slot="prepend">
            &nbsp;
            <Icon type="locked" size="20"></Icon>
            &nbsp;
          </span>
        </Input>
      </div>
      <div class="login-button">
        <div class="login-button-item login-action-text">
          <!-- TODO: add forget password page and link to it-->
          <a href="#">忘记密码</a>
        </div>
        <div class="login-button-item login-action-button">
          <Button type="success" size="large" @click="login">&nbsp;登&nbsp;录&nbsp;系&nbsp;统&nbsp;</Button>
        </div>
      </div>
    </div>
    <footer class="staff-login-footer">
      2017 &copy; yogurt
    </footer>
  </div>
</template>

<script>
export default {
  name: 'StaffLogin',
  data () {
    return {
      title: 'Yogurt 客服系统',
      username: '',
      password: ''
    }
  },
  method: {
    login () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-login {
  height: calc(100vh - 2px);
  text-align: center;
  background: url(../../views/staff/assets/login_background.jpg) center fixed no-repeat;
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
.login-button {
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-action-text {
  font-size: 15px;
}
</style>

<style>
.ivu-input {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>