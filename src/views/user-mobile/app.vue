<template>
  <div id="app" class="user">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
//      window.location.href = window.location.origin + '/user#/login'
      this.$router.push('robot')
    }
  }
</script>
