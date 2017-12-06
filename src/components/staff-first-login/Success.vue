<template>
  <div class="success">
    <h1 class="success-message">
      {{ msg }}
    </h1>
    <div class="bottom-button">
      <!-- only for debug use -->
      <!-- <Button type="error" icon="chevron-left" @click="gotoPrevStep">上一步</Button> -->
      <!-- <div class="horizontal-spacing"></div> -->
      <!-- only for debug use -->
      <Button type="success" icon="chevron-right" @click="gotoLoginPage">返回登录页面</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  data () {
    return {
      msg: '注册成功！欢迎使用Yogurt客服系统！'
    }
  },
  methods: {
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$store.commit('leftDirection')
      this.$router.push('/change-password')
    },
    gotoLoginPage () {
      // TODO: return to login page
      window.location.href = window.location.origin + '/login'
    }
  },
  created () {
    this.$store.commit({
      type: 'changeCurrent',
      current: 5
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.success {
  width: 100%;
  text-align: center;
}
.success-message {
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
