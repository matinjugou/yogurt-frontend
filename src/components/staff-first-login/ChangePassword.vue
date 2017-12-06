<template>
  <div class="change-password">
    <div class="password-input">
      <div class="password-input-content">
        <Form ref="formPassword" label-position="right" :label-width="100" :model="formPassword" :rules="rulePassword">
          <FormItem prop="oldPassword" label="旧密码">
            <Input autofocus v-model="formPassword.oldPassword" size="large" placeholder="旧密码" @on-keyup.enter="gotoNextStep"></Input>
          </FormItem>
          <FormItem prop="newPassword" label="新密码">
            <Input v-model="formPassword.newPassword" size="large" placeholder="新密码" @on-keyup.enter="gotoNextStep"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="bottom-button">
      <Button type="error" icon="chevron-left" @click="gotoPrevStep">上一步</Button>
      <div class="horizontal-spacing"></div>
      <Button type="success" icon="chevron-right" @click="gotoNextStep">注册</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      formPassword: {
        oldPassword: '',
        newPassword: ''
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
  methods: {
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$store.commit('leftDirection')
      this.$router.push('/email-validate')
    },
    gotoNextStep () {
      this.$refs.formPassword.validate((valid) => {
        if (valid) {
          // TODO: submit new password and all information
          // TODO: check if some information is lost
          this.$store.commit('addCurrent')
          this.$store.commit('rightDirection')
          this.$router.push('/success')
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
  padding-top: 10vh;
}
.password-input-content {
  width: 100%;
  padding: 0 35% 0 35%;
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
