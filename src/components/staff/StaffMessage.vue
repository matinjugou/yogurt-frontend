<template>
  <div class="staff-message">
    {{ msg }}
  </div>
</template>

<script>

export default {
  name: 'StaffMessage',
  data () {
    return {
      msg: '这里是客户留言界面'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
