<template>
  <div id="app" class="user">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    beforeCreate () {
      this.$store.commit('buildSocketConnect')
    },
    created () {
      this.$router.push('login')
    }
  }
</script>
