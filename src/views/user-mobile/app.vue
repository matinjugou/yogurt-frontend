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
//      window.location.href = window.location.origin + '/user#/login'
      this.$router.push('robot')
    }
  }
</script>
