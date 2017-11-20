<template>
  <div class="staff-login">
    <div class="staff-login-action">
      <div class="login-logo">{{ msg }}</div>
      <div class="login-input">
        <Input v-model="username">
          <span slot="prepend">
            &nbsp;
            <Icon type="person" size="20"></Icon>
            &nbsp;
          </span>
        </Input>
        <Input v-model="password" type="password">
          <span slot="prepend">
            &nbsp;
            <Icon type="key" size="20"></Icon>
            &nbsp;
          </span>
        </Input>
      </div>
      <div class="login-button"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffLogin',
  data () {
    return {
      msg: '这里是登陆界面',
      username: '',
      password: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-login {
  height: calc(100vh - 2px);
  text-align: center;
}
.staff-login-action {
  padding-left: 30vw;
  padding-right: 30vw;
  
}
</style>