<template>
  <div class="staff-hello">
    {{ msg }}
  </div>
</template>

<script>

export default {
  name: 'StaffHello',
  data () {
    return {
      msg: '欢迎使用Yogurt客服系统~'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
