<template>
  <div class="upload-avatar">
    <div class="upload-avatar-input">
      <Upload
        ref="upload"
        type="drag"
        :max-size="maxAvatarSize"
        :format="['jpg','jpeg','png']"
        :show-upload-list="false"
        :data="{validTime: -1}"
        :action="fileServerUrl"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize">
        <div class="avatar-content">
            <div class="avatar-alt" v-if="!avatarUrl">
              <Icon type="camera" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖动文件上传头像</p>
            </div>
            <div v-else>
              <img class="avatar-image" :src="avatarUrl" />
            </div>
        </div>
      </Upload>
    </div>
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
      fileServerUrl: 'http://123.206.22.71/api/v2/file/',
      maxAvatarSize: 2048, // 2M
      uploadList: [],
      avatarUrl: ''
    }
  },
  methods: {
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出上传文件大小限制',
        desc: '头像文件过大，不应该超过 ' + this.maxAvatarSize + ' KB.'
      })
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '头像文件格式错误，请重新选择',
        desc: '头像文件的后缀名应该为jpg或png'
      })
    },
    handleError (error, file) {
      this.$Notice.error({
        title: '头像文件上传失败，请重试',
        desc: '错误原因：' + error
      })
    },
    handleSuccess (response, file) {
      this.$Notice.success({
        title: '头像文件上传成功'
      })
      this.avatarUrl = response.data
    },
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$store.commit('leftDirection')
      this.$router.push('/add-info')
    },
    gotoNextStep () {
      if (!this.avatarUrl) {
        this.$Notice.error({
          title: '你必须上传头像！'
        })
        return
      }
      this.$store.commit({
        type: 'changeAvatarUrl',
        avatarUrl: this.avatarUrl
      })
      this.$store.commit('addCurrent')
      this.$store.commit('rightDirection')
      this.$router.push('/email-validate')
    }
  },
  created () {
    this.$store.commit({
      type: 'changeCurrent',
      current: 2
    })
    this.avatarUrl = this.$store.state.avatarUrl
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-avatar {
  width: 100%;
  text-align: center;
}
.upload-avatar-input {
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-content {
  width: 30vh;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-image {
  width: 30vh;
  height: 30vh;
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
