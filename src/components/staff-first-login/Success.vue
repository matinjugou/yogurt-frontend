<template>
  <div class="success">
    <h1>这里是注册成功界面</h1>
    <div class="bottom-button">
      <Button type="error" icon="chevron-left" @click="gotoPrevStep">上一步</Button>
      <div class="horizontal-spacing"></div>
      <Button type="success" icon="chevron-right" @click="gotoLoginPage">返回登录页面</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$router.push('/email-verify')
    },
    gotoLoginPage () {
      // TODO: return to login page
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.success {
  width: 100%;
  text-align: center;
}
.bottom-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.horizontal-spacing {
  width: 30px;
}
</style>
