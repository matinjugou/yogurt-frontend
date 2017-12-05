<template>
  <div class="welcome">
    <h1 class="welcome-message">
      员工{{staffId}}您好，欢迎使用Yogurt客服系统
    </h1>
    <div class="bottom-button">
      <Button type="success" icon="chevron-right" @click="gotoNextStep">下一步</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    staffId () {
      return this.$store.state.staffId
    }
  },
  methods: {
    gotoNextStep () {
      this.$store.commit('addCurrent')
      this.$store.commit('rightDirection')
      this.$router.push('/add-info')
    }
  },
  created () {
    this.$store.commit({
      type: 'changeCurrent',
      current: 0
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
  width: 100%;
  text-align: center;
}
.welcome-message {
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.horizontal-spacing {
  width: 30px;
}
</style>
