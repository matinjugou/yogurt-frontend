<template>
  <div class="change-password">
    <div class="password-input">
      <div class="password-input-content">
        <Form ref="formPassword" label-position="right" :label-width="100" :model="formPassword" :rules="rulePassword">
          <FormItem prop="oldPassword" label="旧密码">
            <Input autofocus type="password" v-model="formPassword.oldPassword" size="large" placeholder="旧密码"></Input>
          </FormItem>
          <div class="vertical-spacing"></div>
          <FormItem prop="newPassword" label="新密码">
            <Input type="password" v-model="formPassword.newPassword" size="large" placeholder="新密码"></Input>
          </FormItem>
          <div class="vertical-spacing"></div>
          <FormItem prop="surePassword" label="确认密码">
            <Input type="password" v-model="formPassword.surePassword" size="large" placeholder="确认密码" @on-keyup.enter="register"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="bottom-button">
      <Button type="error" icon="chevron-left" @click="gotoPrevStep">上一步</Button>
      <div class="horizontal-spacing"></div>
      <Button :loading="registerLoading" type="success" icon="chevron-right" @click="register">注册</Button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ChangePassword',
  data () {
    return {
      formPassword: {
        oldPassword: '',
        newPassword: '',
        surePassword: ''
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
        ],
        surePassword: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          }
        ]
      },
      registerLoading: false
    }
  },
  computed: {
    staffId () {
      return this.$store.state.staffId
    },
    httpServerUrl () {
      return this.$store.state.httpServerUrl
    }
  },
  methods: {
    checkAllInfoNotEmpty () {
      return (this.$store.state.staffId !== '') &&
        (this.$store.state.name !== '') &&
        (this.$store.state.nickName !== '') &&
        (this.$store.state.phoneNumber !== '') &&
        (this.$store.state.staffType !== '') &&
        (this.$store.state.avatarUrl !== '') &&
        (this.$store.state.email !== '') &&
        (this.$store.state.token !== '')
    },
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$store.commit('leftDirection')
      this.$router.push('/email-validate')
    },
    register () {
      if (this.formPassword.newPassword !== this.formPassword.surePassword) {
        this.$Notice.error({
          title: '确认密码与密码不同'
        })
        return
      }
      this.$refs.formPassword.validate((valid) => {
        if (valid) {
          axios.post(this.httpServerUrl + '/login', {
            staffId: this.staffId,
            password: this.formPassword.oldPassword
          }).then(response => {
            let body = response.data.data
            if (body.code === 0 || body.code === 2) {
              if (this.checkAllInfoNotEmpty()) {
                this.registerLoading = true
                axios.post(this.httpServerUrl + '/account-info', {
                  staffId: this.staffId,
                  name: this.$store.state.name,
                  nickName: this.$store.state.nickName,
                  email: this.$store.state.email,
                  tel: this.$store.state.phoneNumber,
                  picUrl: this.$store.state.avatarUrl,
                  role: this.$store.state.staffType,
                  token: this.$store.token,
                  password: this.formPassword.newPassword
                }).then(response => {
                  let body = response.data.data
                  if (body.code === 0) {
                    this.$store.commit('addCurrent')
                    this.$store.commit('rightDirection')
                    this.$router.push('/success')
                  } else {
                    this.$Notice.error({
                      title: '注册失败，请稍后再试'
                    })
                  }
                }).catch(error => {
                  this.$Notice.error({
                    title: '服务器发生错误，请稍后再试'
                  })
                  console.log(error)
                })
              } else {
                this.$Notice.error({
                  title: '还有信息没有填写完全',
                  desc: '请去之前步骤检查是否还有信息没有填写'
                })
              }
            } else {
              this.$Notice.error({
                title: '旧密码错误，请重新输入'
              })
            }
          }).catch(error => {
            this.$Notice.error({
              title: '服务器发生错误，请稍后再试'
            })
            console.log(error)
          })
        } else {
          // wrong password format
        }
      })
    }
  },
  created () {
    this.$store.commit({
      type: 'changeCurrent',
      current: 4
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.change-password{
  width: 100%;
  text-align: center;
}
.password-input {
  width: 100%;
  height: 45vh;
  padding-top: 9vh;
}
.password-input-content {
  width: 100%;
  padding: 0 35% 0 35%;
}
.vertical-spacing {
  height: 2vh;
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
