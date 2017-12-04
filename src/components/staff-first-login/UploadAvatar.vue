<template>
  <div class="upload-avatar">
    <h1>这里是头像上传界面</h1>
    <div class="bottom-button">
      <Button type="error" icon="chevron-left" @click="gotoPrevStep">上一步</Button>
      <div class="horizontal-spacing"></div>
      <Button type="success" icon="chevron-right" @click="gotoNextStep">下一步</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadAvatar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$router.push('/add-info')
    },
    gotoNextStep () {
      this.$store.commit('addCurrent')
      this.$router.push('/email-verify')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-avatar {
  width: 100%;
  text-align: center;
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
