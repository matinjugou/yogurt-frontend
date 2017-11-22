<template>
  <div class="staff-quick-reply">
    {{ msg }}
  </div>
</template>

<script>

export default {
  name: 'StaffQuickReply',
  data () {
    return {
      msg: '这里是快捷回复界面'
    }
  },
  created () {
    if (this.$store.state.isLogin === false) {
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
