<template>
  <div class="my-avatar-main"
       @mouseenter="hovered=true"
       @mouseleave="hovered=false">
    <img class="my-avatar-img" :src='imgsrc'/>
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
    name: 'myavatar',
    data () {
      return {
        hovered: false,
        imgsrc: 'http://b.hiphotos.baidu.com/image/pic/item/a6efce1b9d16fdfa56117f9dbe8f8c5494ee7b40.jpg'
      }
    },
    props: ['btnName', 'src'],
    methods: {
      uploadAvatar (file) {
        let formData = new FormData()
        formData.append('file', file)
        formData.append('fileType', 'avatar')
        formData.append('validTime', '1')
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let self = this
        axios.post('http://123.206.22.71/api/v1/file/', formData, config)
          .then(function (res) {
            console.log(res)
            self.imgsrc = res.data.data
          })
        return false
      }
    }
  }
</script>
<style scoped>
  .my-avatar-main {
    border-radius: 2px;
    border: 1px solid #e9eaec;
    height: 210px;
    width: 210px;
    padding: 5px;
    position: relative;
  }
  .my-avatar-main:hover {
    box-shadow: 0 0 1px 1px rgba(0,0,0,.1);
  }
  .my-avatar-img {
    max-height: 200px;
    max-width: 200px;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .my-avatar-cover {
    top: 5px;
    left: 5px;
    width: 200px;
    height: 200px;
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
