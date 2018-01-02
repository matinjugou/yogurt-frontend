<template>
  <div class="staff-info">
    <div class="staff-info-center">
      <div class="staff-info-avatar">
        <upload-avatar 
          :imgSrc="avatarUrl" 
          btnName="上传头像"
          :serverUrl="fileServerUrl"
          @on-uploaded="updateAvatarUrl"
          @on-failed="handleAvatarFail"></upload-avatar>
        <!-- <img class="avatar-image" :src="avatarUrl" alt="头像"/> -->
      </div>
      <div class="staff-info-content">
        <div class="staff-info-detail">
          <Form ref="formInfo" label-position="right" :label-width="100" :model="formInfo" :rules="ruleInfo">
            <FormItem prop="staffId" label="ID">
              <span class="info-text"> {{ staffId }} </span>
            </FormItem>
            <FormItem prop="name" label="姓名">
              <span class="info-text"> {{ formInfo.name }} </span>
            </FormItem>
            <FormItem prop="nickName" label="昵称">
              <Input v-model="formInfo.nickName" size="large" placeholder="你的昵称"></Input>
            </FormItem>
            <FormItem prop="phoneNumber" label="手机号">
              <Input v-model="formInfo.phoneNumber" size="large" placeholder="你的手机号"></Input>
            </FormItem>
            <div class="staff-info-change-button">
              <Button type="success" shape="circle" @click="updateStaffInfo">提交修改</Button>
            </div>
          </Form>

          <Form ref="formEmail" label-position="right" :label-width="100" :model="formEmail" :rules="ruleEmail">
            <FormItem prop="email" label="邮箱">
              <Input disabled v-model="formEmail.email" size="large" placeholder="你的邮箱"></Input>
            </FormItem>
            <div class="staff-info-change-button">
              <Button type="success" shape="circle" @click="updateEmail">修改邮箱</Button>
            </div>
          </Form>
          <Form ref="formPassword" label-position="right" :label-width="100" :model="formPassword" :rules="rulePassword">
            <FormItem prop="oldPassword" label="旧密码">
              <Input type="password" v-model="formPassword.oldPassword" size="large" placeholder="你的旧密码"></Input>
            </FormItem>
            <FormItem prop="newPassword" label="新密码">
              <Input type="password" v-model="formPassword.newPassword" size="large" placeholder="你的新密码"></Input>
            </FormItem>
            <div class="staff-info-change-button">
              <Button :loading="formPassword.loading" type="success" shape="circle" @click="updatePassword">修改密码</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <Modal v-model="showEmailModal" width="30%" title="输入验证码">
      
    </Modal>

  </div>
</template>

<script>
import axios from 'axios'
import UploadAvatar from '@/components/public/UploadAvatar'
export default {
  name: 'StaffInfo',
  components: {
    'upload-avatar': UploadAvatar
  },
  data () {
    return {
      showInfo: false,
      showEmailModal: false,
      nickName: '',
      email: '',
      phoneNumber: '',
      formInfo: {
        name: '',
        nickName: '',
        phoneNumber: ''
      },
      formEmail: {
        email: ''
      },
      formPassword: {
        oldPassword: '',
        newPassword: '',
        loading: false
      },
      ruleInfo: {
        nickName: [
          {
            required: true,
            message: '昵称不能为空',
            trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: '^1\\d{10}$',
            message: '手机号格式有误',
            trigger: 'blur'
          }
        ]
      },
      ruleEmail: {
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '邮箱格式有误',
            trigger: 'blur'
          }
        ]
      },
      rulePassword: {
        oldPassword: [
          {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    staffId () {
      return this.$store.state.staffId
    },
    avatarUrl: {
      get: function () {
        return this.$store.state.avatarUrl
      },
      set: function (newAvatarUrl) {
        this.$store.commit({
          type: 'changeAvatarUrl',
          avatarUrl: newAvatarUrl
        })
      }
    },
    httpServerUrl () {
      return this.$store.state.httpServerUrl
    },
    fileServerUrl () {
      return this.$store.state.fileServerUrl
    }
  },
  methods: {
    updateAvatarUrl (newAvatarUrl) {
      console.log(newAvatarUrl)
      this.avatarUrl = newAvatarUrl
      axios.put(this.httpServerUrl + '/account-info', {
        staffId: this.staffId,
        token: window.localStorage.getItem('token'),
        picUrl: this.avatarUrl
      }).then(response => {
        console.log(response)
        let body = response.data.data
        if (body.code === 0) {
          this.$Notice.success({
            title: '上传头像成功~'
          })
        } else {
          this.$Notice.error({
            title: '上传头像失败，请稍后再试'
          })
        }
      }).catch(error => {
        console.log(error)
        this.$Notice.error({
          title: '上传头像失败，请稍后再试'
        })
      })
    },
    handleAvatarFail (error) {
      console.log(error)
      this.$Notice.error({
        title: '上传头像失败，请稍后再试'
      })
    },
    updateStaffInfo () {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          // update personal info
          axios.put(this.httpServerUrl + '/account-info', {
            staffId: this.staffId,
            token: window.localStorage.getItem('token'),
            nickname: this.formInfo.nickName,
            phoneNumber: this.formInfo.phoneNumber
          }).then(response => {
            console.log(response)
            let body = response.data.data
            if (body.code === 0) {
              this.$Notice.success({
                title: '成功修改个人信息!'
              })
            } else {
              this.$Notice.error({
                title: '没能成功更新个人信息，请稍后重试'
              })
            }
          }).catch(error => {
            console.log(error)
            this.$Notice.error({
              title: '没能成功更新个人信息，请稍后重试'
            })
          })
        } else {
          // not satisfy the form format
        }
      })
    },
    updateEmail () {
      this.$refs.formEmail.validate((valid) => {
        if (valid) {
          // TODO: send validation email and pop up modal
          // this.showEmailModal = true
          this.$Notice.warning({
            title: '该功能暂未开放'
          })
        } else {
          // not satisfy the form format
        }
      })
    },
    updatePassword () {
      // update staff password
      this.formPassword.loading = true
      this.$refs.formPassword.validate((valid) => {
        if (valid) {
          // update password
          axios.post(this.httpServerUrl + '/login', {
            staffId: this.staffId,
            password: this.formPassword.oldPassword
          }).then(response => {
            console.log(response)
            let body = response.data.data
            if (body.code === 0) {
              axios.put(this.httpServerUrl + '/account-info', {
                staffId: this.staffId,
                token: window.localStorage.getItem('token'),
                password: this.formPassword.newPassword
              }).then(response => {
                this.formPassword.newPassword = ''
                this.formPassword.loading = false
                let body = response.data.data
                if (body.code === 0) {
                  this.$Notice.success({
                    title: '成功修改密码!'
                  })
                } else {
                  this.$Notice.error({
                    title: '没能成功修改密码，请稍后重试'
                  })
                }
              }).catch(error => {
                this.formPassword.loading = false
                console.log(error)
                this.$Notice.error({
                  title: '没能成功修改密码，请稍后重试'
                })
              })
            } else {
              this.formPassword.newPassword = ''
              this.formPassword.loading = false
              this.$Notice.error({
                title: '旧密码输入有误，请重试'
              })
            }
          }).catch(error => {
            this.formPassword.loading = false
            console.log(error)
            this.$Notice.error({
              title: '没能成功修改密码，请稍后重试'
            })
          })
          this.formPassword.oldPassword = ''
        } else {
          // not satisfy the form format
          this.formPassword.loading = false
        }
      })
    }
  },
  created () {
    // get staff info
    axios.get(this.httpServerUrl + '/account-info', {
      params: {
        staffId: window.localStorage.getItem('id'),
        token: window.localStorage.getItem('token')
      }
    }).then(response => {
      console.log(response)
      if (response.data.errno === 0) {
        let body = response.data.data.staff
        console.log(body)
        this.formInfo.name = body.name
        this.formInfo.nickName = body.nickname
        this.formInfo.phoneNumber = body.tel
        this.formEmail.email = body.email
        // this.avatarUrl = body.picUrl
      } else {
        this.$Notice.error({
          title: '没能成功获取个人信息，请刷新重试'
        })
      }
    }).catch(error => {
      console.log(error)
      this.$Notice.error({
        title: '没能成功获取个人信息，请刷新重试'
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-info {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.staff-info-center {
  display: flex;
  align-items: text-top;
}
.staff-info-avatar {
  margin-right: 70px;
}
.avatar-image {
  width: 160px;
  height: 160px;
}
.info-text {
  font-size: 16px;
}
.staff-info-change-button {
  width: 100%;
  text-align: right;
  margin-bottom: 24px;
}
.vertical-spacing {
  height: 30px;
}
</style>

<style>
.ivu-form .ivu-form-item-label {
  font-size: 16px;
}
.ivu-input[disabled] {
  color: #495060;
}
</style>