<template>
  <div class="change-password">
    <h1>这里是修改登录密码界面</h1>
    <div class="bottom-button">
      <Button type="error" icon="chevron-left" @click="gotoPrevStep">上一步</Button>
      <div class="horizontal-spacing"></div>
      <Button type="success" icon="chevron-right" @click="gotoNextStep">注册</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$store.commit('leftDirection')
      this.$router.push('/email-validate')
    },
    gotoNextStep () {
      this.$store.commit('addCurrent')
      this.$store.commit('rightDirection')
      this.$router.push('/success')
    }
  },
  created () {
    this.$store.commit({
      type: 'changeCurrent',
      current: 4
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.change-password{
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
