<template>
  <div class="my-avatar-main"
       @mouseenter="hovered=true"
       @mouseleave="hovered=false">
    <img class="my-avatar-img" :src='imgSrc' alt="头像加载失败..."/>
    <transition name="fade">
      <div class="my-avatar-cover" v-if="hovered">
      </div>
    </transition>
    <transition name="fade">
      <slot name="uploadBtn" v-if="hovered">
      <Upload :before-upload="uploadAvatar"
              action="//jsonplaceholder.typicode.com/posts/">
        <Button type="ghost" class="my-avatar-button" v-if="hovered">{{ btnName }}</Button>
      </Upload>
      </slot>
    </transition>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'UploadAvatar',
    props: ['btnName', 'imgSrc', 'serverUrl'],
    data () {
      return {
        hovered: false
      }
    },
    methods: {
      uploadAvatar (file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('validTime', -1)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(this.serverUrl, formData, config).then(response => {
          console.log(response)
          const data = response.data.data
          this.$emit('on-uploaded', data)
        }).catch(error => {
          this.$emit('on-failed', error)
        })
        return false
      }
    }
  }
</script>
<style scoped>
  .my-avatar-main {
    border-radius: 50%;
    border: 1px solid #e9eaec;
    height: 160px;
    width: 160px;
    box-shadow: 2px 2px 1px #888888;
    position: relative;
  }
  .my-avatar-main:hover {
    box-shadow: 0 0 1px 1px rgba(0,0,0,.1);
  }
  .my-avatar-img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .my-avatar-cover {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
  }
  .my-avatar-button {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    position: absolute;
  }
  .my-avatar-button:hover {
    color: white;
    border: 1px solid white;
  }
  .my-avatar-button:active {
    color: #2d8cf0;
    border: 1px solid #2d8cf0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
