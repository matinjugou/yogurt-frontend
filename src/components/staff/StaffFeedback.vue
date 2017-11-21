<template>
  <div class="staff-feedback">
    {{ msg }}
  </div>
</template>

<script>

export default {
  name: 'StaffFeedback',
  data () {
    return {
      msg: '这里是用户反馈界面'
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
