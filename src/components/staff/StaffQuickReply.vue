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
    // TODO: If not login, jump to login page
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
