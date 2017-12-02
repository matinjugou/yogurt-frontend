<template>
  <div class="user-chat">
    <div class="background">
      <div style="height: 200px"></div>
      <Col offset="8">
      <Form :model="formItem" :label-width="80">
        <FormItem label="User ID">
          <Col span="8">
            <Input v-model="formItem.userId" placeholder="Enter userid here"></Input>
          </Col>
          <!--<Col span="2">-->
            <!--<Button type="primary" @click="submit">Submit</Button>-->
          <!--</Col>-->
        </FormItem>
        <FormItem label="Staff ID">
          <Col span="8">
            <Input v-model="formItem.staffId" placeholder="Enter staffid here"></Input>
          </Col>
        </FormItem>
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
    methods: {
      submit () {
        if (!this.isValidInputs()) {
          console.log('invalid intpus: userid=' + this.formItem.userId + ', staffid=' + this.formItem.staffId)
          return
        }
        axios.post('http://yogurt.magichc7.com/api/user/login', {
          'userId': this.formItem.userId,
          'password': 'pass'
        }).then(response => {
          let body = response.data.data
          if (body.code === 0) {
            window.localStorage.setItem('token', body.token)
            this.$router.push({name: 'chat', userId: this.formItem.userId, staffId: this.formItem.staffId})
          }
        })
      },
      isValidInputs () {
        if (this.formItem.userId === '' || this.formItem.staffId === '') {
          return false
        }
        return true
      }
    },
    created () {
      let token = window.localStorage.getItem('token')
      axios.get('/login', {
        'token': token
      }).then(response => {
        let body = response.data.data
        if (body.code === 0) {
          // TO DO
        }
      })
    }
  }
</script>
