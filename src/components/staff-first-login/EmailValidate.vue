<template>
  <div class="email-validate">
    <div class="email-input">
      <div class="single-input">
        <div class="single-input-element content">
          <Form ref="formEmail" label-position="right" :label-width="100" :model="formEmail" :rules="ruleEmail">
            <FormItem prop="tempEmail" label="邮箱">
              <Input 
                autofocus 
                v-model="formEmail.tempEmail" 
                size="large" 
                placeholder="你的邮箱"
                :disabled="isValidated">
              </Input>
            </FormItem>
          </Form>
        </div>
        <div class="single-input-element action">
          <Button :disabled="sendEmailCoolDown > 0" type="primary" @click="sendValidateEmail">{{ sendEmailCaption }}</Button>
        </div>
      </div>

      <div class="single-input">
        <div class="single-input-element content">
          <Form ref="formValidate" label-position="right" :label-width="100" :model="formValidate" :rules="ruleValidate">
            <FormItem prop="validateNumber" label="验证码">
              <Input 
                :disabled="isValidated" 
                v-model="formValidate.validateNumber" 
                size="large" 
                placeholder="验证码">
              </Input>
            </FormItem>
          </Form>
        </div>
        <div class="single-input-element action">
          <Button
            :type="validateButtonType" 
            :loading="validateLoading"
            :icon="validateStatus"
            @click="validate"
          >{{ validateCaption }}</Button>
        </div>
      </div>
    </div>
    <div class="bottom-button">
      <Button type="error" icon="chevron-left" @click="gotoPrevStep">上一步</Button>
      <div class="horizontal-spacing"></div>
      <Button type="success" icon="chevron-right" @click="gotoNextStep">下一步</Button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EmailValidate',
  data () {
    return {
      formEmail: {
        tempEmail: ''
      },
      ruleEmail: {
        tempEmail: [
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
      formValidate: {
        validateNumber: ''
      },
      ruleValidate: {
        validateNumber: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }
        ]
      },
      isValidated: false,
      sendEmailCaption: '发送验证邮件',
      sendEmailCoolDown: 0,
      intervalId: '',
      validateButtonType: 'primary',
      validateLoading: false,
      validateStatus: '',
      validateCaption: '验证'
    }
  },
  computed: {
    staffId () {
      return this.$store.state.staffId
    },
    email () {
      return this.$store.state.email
    },
    httpServerUrl () {
      return this.$store.state.httpServerUrl
    }
  },
  methods: {
    sendValidateEmail () {
      this.$refs.formEmail.validate((valid) => {
        if (valid) {
          axios.get(this.httpServerUrl + '/validation/validate', {
            params: {
              staffId: this.staffId,
              emailAddress: this.formEmail.tempEmail
            }
          }).then(response => {
            console.log(response)
            this.$Notice.success({
              title: '邮件已发送，请查收'
            })
            // TODO: change it into server time
            this.sendEmailCoolDown = 10
            let _this = this
            this.intervalId = window.setInterval(function () {
              if (_this.sendEmailCoolDown > 0) {
                _this.sendEmailCoolDown--
                _this.sendEmailCaption = '重新发送(' + _this.sendEmailCoolDown + 's)'
              } else {
                _this.sendEmailCaption = '发送验证邮件'
                window.clearInterval(_this.intervalId)
              }
            }, 1000)
          }).catch(error => {
            this.$Notice.error({
              title: '邮件发送失败，请稍后再试'
            })
            console.log(error)
          })
        } else {
          // fail to satisfy email format
        }
      })
    },
    validate () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          // TODO: check if the email is validated
          this.validateLoading = true
          axios.post(this.httpServerUrl + '/validation/validateCode', {
            staffId: this.staffId,
            emailAddress: this.formEmail.tempEmail,
            code: this.formValidate.validateNumber
          }).then(response => {
            let body = response.data.data
            if (body.code === 0) {
              this.isValidated = true
              this.validateButtonType = 'success'
              this.validateLoading = false
              this.validateStatus = 'checkmark-round'
              this.$store.commit({
                type: 'changeEmail',
                email: this.formEmail.tempEmail
              })
              this.$store.commit({
                type: 'changeToken',
                token: body.token
              })
            } else {
              this.isValidated = false
              this.validateButtonType = 'error'
              this.validateLoading = false
              this.validateStatus = 'refresh'
            }
          }).catch(error => {
            this.isValidated = false
            this.validateButtonType = 'error'
            this.validateLoading = false
            this.validateStatus = 'refresh'
            console.log(error)
          })
        } else {
          // fail to satisfy validate number format
        }
      })
    },
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$store.commit('leftDirection')
      this.$router.push('/upload-avatar')
    },
    gotoNextStep () {
      if (!this.isValidated) {
        this.$Notice.error({
          title: '请先验证邮箱'
        })
        return
      }
      this.$store.commit('addCurrent')
      this.$store.commit('rightDirection')
      this.$router.push('/change-password')
    }
  },
  created () {
    this.$store.commit({
      type: 'changeCurrent',
      current: 3
    })
    if (this.$store.state.email !== '') {
      this.formEmail.tempEmail = this.$store.state.email
      this.isValidated = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email-validate {
  width: 100%;
  text-align: center;
}
.email-input {
  width: 100%;
  height: 45vh;
  padding-top: 12vh;
}
.single-input {
  margin-bottom: 35px;
  display: flex;
  align-items: text-top;
  justify-content: center;
}
.single-input-element {
  margin-right: 20px;
}
.single-input > .title {
  font-size: 18px;
  width: 100px;
  justify-content: flex-end;
}
.single-input > .action {
  padding-top: 2px;
  width: 100px;
  text-align: left;
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
