<template>
  <div class="user-chat">
    <div class="background">
      <div style="height: 200px"></div>
      <Col offset="4">
      <Form :model="formItem" :label-width="80">
        <!--FormItem label="User ID">
          <Col span="16">
            <Input v-model="formItem.userId" placeholder="Enter userid here"></Input>
          </Col>
        </FormItem>
        <FormItem label="Staff ID">
          <Col span="16">
            <Input v-model="formItem.staffId" placeholder="Enter staffid here"></Input>
          </Col>
        </FormItem-->
        <FormItem>
          <Button type="primary" @click="submit()">Submit</Button>
        </FormItem>
      </Form>
      </Col>
    </div>
  </div>
</template>
<style>
  .background{
    background: #f5f7f9;
    height: 100vh;
    width: 100vw;
  }
</style>
<script>
  import axios from 'axios'
  export default {
    name: 'UserLogin',
    data () {
      return {
        formItem: {
          userId: '',
          staffId: ''
        }
      }
    },
    computed: {
      chatState () {
        return window.localStorage.getItem('chatState')
      }
    },
    methods: {
      submit () {
        /*
        if (!this.isValidInputs()) {
          console.log('invalid intpus: userid=' + this.formItem.userId + ', staffid=' + this.formItem.staffId)
          return
        }
        */
        const self = this
        axios.post(self.$store.state.userLoginUrl, {
          // 'userId': self.formItem.userId
          'userId': '1_u' + String(Math.floor(Math.random() * 10000))
        }).then(response => {
          let body = response.data.data
          // debug
          console.log(body.token)
          if (body.code === 0) {
            window.localStorage.setItem('token', body.token)
            window.localStorage.setItem('userId', self.formItem.userId)
            window.localStorage.setItem('staffId', self.formItem.staffId)
            self.toChatPage()
          }
        })
      },
      isValidInputs () {
        if (this.formItem.userId === '' || this.formItem.staffId === '') {
          return false
        }
        return true
      },
      isPC () {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          return false
        } else {
          return true
        }
      },
      toChatPage () {
        if (this.isPC()) {
          if (this.chatState !== 'chat') {
            window.localStorage.setItem('chatState', 'robot')
            this.$router.push({name: 'robot'})
          } else {
            this.$router.push({name: 'chat'})
          }
        } else {
          window.location.href = window.location.origin + '/user-mobile'
        }
      }
    },
    created () {
      // debug
      // console.log(this.$store.state.userLoginUrl)
      let token = window.localStorage.getItem('token')
      const self = this
      let userId = window.localStorage.getItem('userId')
      // debug
      console.log('userId in user-login: ' + userId)
      console.log('token in user-login: ' + token)
      axios.get(self.$store.state.userLoginUrl, {
        params: {
          'userId': userId,
          'token': token
        }
      }).then(response => {
        let body = response.data.data
        // debug
        console.log(body)
        if (body.code === 0) {
          // TO DO
          self.toChatPage()
        }
      })
    }
  }
</script>
