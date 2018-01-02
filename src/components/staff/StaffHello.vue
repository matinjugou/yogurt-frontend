<template>
  <div class="staff-hello">
    <h1 class="staff-hello-title">
      {{ msg }}
    </h1>
  </div>
</template>

<script>

export default {
  name: 'StaffHello',
  data () {
    return {
      msg: '欢迎使用Yogurt客服系统~'
    }
  },
  created () {
    // TODO: If not login, jump to login page
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-hello {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.staff-hello-title {
  font-size: 40px;
}
</style>
