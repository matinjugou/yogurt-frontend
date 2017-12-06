<template>
  <div id="app" class="user">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
      this.$router.push('login')
    }
  }
</script>
