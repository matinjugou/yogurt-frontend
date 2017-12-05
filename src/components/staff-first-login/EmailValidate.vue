<template>
  <div class="email-validate">
    <div class="email-input">
      <div class="single-input">
        <div class="single-input-element title ">邮箱*：</div>
        <div class="single-input-element content">
          <Input 
            autofocus 
            v-model="tempEmail" 
            size="large" 
            placeholder="你的邮箱"
            :disabled="isValidated" 
            @on-keyup.enter="gotoNextStep">
          </Input>
        </div>
        <div class="single-input-element action">
          <Button :disabled="sendEmailCoolDown > 0" type="primary" @click="sendValidateEmail">{{ sendEmailCaption }}</Button>
        </div>
      </div>
      <div class="single-input">
        <div class="single-input-element title ">验证码：</div>
        <div class="single-input-element content">
          <Input :disabled="isValidated" v-model="validateNumber" size="large" placeholder="验证码" @on-keyup.enter="gotoNextStep"></Input>
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
export default {
  name: 'EmailValidate',
  data () {
    return {
      tempEmail: '',
      validateNumber: '',
      isValidated: false,
      sendEmailCaption: '发送验证邮件',
      sendEmailCoolDown: 0,
      validateButtonType: 'primary',
      validateLoading: false,
      validateStatus: '',
      validateCaption: '验证'
    }
  },
  computed: {
    email () {
      return this.$store.state.email
    }
  },
  methods: {
    sendValidateEmail () {
      // TODO: send validation email
      if (!this.tempEmail) {
        this.$Notice.error({
          title: '请先填写邮箱'
        })
        return
      }
      this.sendEmailCoolDown = 60
    },
    validate () {
      // TODO: check if the email is validated
      if (this.validateNumber === '123456') {
        this.isValidated = true
        this.validateButtonType = 'success'
        this.validateLoading = false
        this.validateStatus = 'checkmark-round'
        this.$store.commit({
          type: 'changeEmail',
          email: this.tempEmail
        })
      } else {
        this.isValidated = false
        this.validateButtonType = 'error'
        this.validateLoading = false
        this.validateStatus = 'refresh'
      }
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
}
.single-input-element {
  display: inline-flex;
  margin-right: 20px;
}
.single-input > .title {
  font-size: 18px;
  width: 100px;
  justify-content: flex-end;
}
.single-input > .action {
  width: 100px;
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
