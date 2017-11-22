<template>
  <div class="staff-info">
    {{ msg }}
  </div>
</template>

<script>

export default {
  name: 'StaffInfo',
  data () {
    return {
      msg: '这里是信息界面'
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
