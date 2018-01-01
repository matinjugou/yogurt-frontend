<template>
  <div id="app">
    <Row type="flex">
      <Col :span="15">
        <div class="login-left">
          <!--img src="./assets/logo.png" width="400px" /-->
          {{ msg }}
        </div>
      </Col>
      <Col :span="9">
        <div class="login-right">
          <transition name="slide-fade">
            <div class="login-action-bg" v-show="showAction">
              <div class="login-action">
                <Tabs 
                  :value="type" 
                  @on-click="changeType">
                  <TabPane label="客服登录" name="staff">
                    <div class="login-tab-vertical-space"></div>
                    <div class="login-input">
                      <Form ref="formStaffLogin" :model="formStaffLogin" :rules="ruleLogin">
                        <FormItem prop="username">
                          <Input v-model="formStaffLogin.username" placeholder="客服ID" size="large" autocomplete="on" autofocus @on-keyup.enter="login('formStaffLogin')">
                            <span class="input-prepend" slot="prepend">
                              <Icon type="person" size="20"></Icon>
                            </span>
                          </Input>
                        </FormItem>
                        <FormItem prop="password">
                          <Input v-model="formStaffLogin.password" type="password" placeholder="密码" size="large" @on-keyup.enter="login('formStaffLogin')">
                            <span class="input-prepend" slot="prepend">
                              <Icon type="locked" size="20"></Icon>
                            </span>
                          </Input>
                        </FormItem>
                        <FormItem>
                           <div class="login-button">
                            <div class="login-button-item">
                              <!-- TODO: add forget password page and link to it-->
                              <a class="login-link-text" href="#">忘记密码？</a>
                            </div>
                            <div class="login-button-item ">
                              <Button type="success" size="large" @click="login('formStaffLogin')">
                                <span class="login-button-text">登录系统</span>
                              </Button>
                            </div>
                          </div>
                        </FormItem>
                      </Form>
                    </div>
                  </TabPane>

                  <TabPane label="管理员登录" name="manager">
                    <div class="login-tab-vertical-space"></div>
                    <div class="login-input">
                      <Form ref="formManagerLogin" :model="formManagerLogin" :rules="ruleLogin">
                        <FormItem prop="username">
                          <Input v-model="formManagerLogin.username" placeholder="管理员ID" size="large" autocomplete="on" autofocus @on-keyup.enter="login('formManagerLogin')">
                            <span class="input-prepend" slot="prepend">
                              <Icon type="person" size="20"></Icon>
                            </span>
                          </Input>
                        </FormItem>
                        <FormItem prop="password">
                          <Input v-model="formManagerLogin.password" type="password" placeholder="密码" size="large" @on-keyup.enter="login('formManagerLogin')">
                            <span class="input-prepend" slot="prepend">
                              <Icon type="locked" size="20"></Icon>
                            </span>
                          </Input>
                        </FormItem>
                        <FormItem>
                           <div class="login-button">
                            <div class="login-button-item">
                              <!-- TODO: add forget password page and link to it-->
                              <a class="login-link-text" href="#">忘记密码？</a>
                            </div>
                            <div class="login-button-item ">
                              <Button type="success" size="large" @click="login('formManagerLogin')">
                                <span class="login-button-text">登录系统</span>
                              </Button>
                            </div>
                          </div>
                        </FormItem>
                      </Form>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </transition>
        </div>
      </Col>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    </Row>                                                                                                                                                                                                                                      
  </div>
</template>
<script>
import axios from 'axios'
import lib from '@/lib'
export default {
  name: 'app',
  data () {
    return {
      msg: '欢迎使用Yogurt客服系统',
      showAction: false,
      type: 'staff',
      staffBackUrl: 'staff',
      managerBackUrl: 'manager',
      formStaffLogin: {
        username: '',
        password: ''
      },
      formManagerLogin: {
        username: '',
        password: ''
      },
      ruleLogin: {
        username: [
          {
            required: true,
            message: '用户ID不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let type = this.type
          let url = ''
          let username = this[name].username
          let password = this[name].password
          if (type === 'staff') {
            url = this.$store.state.staffLoginUrl
          } else if (type === 'manager') {
            url = this.$store.state.managerLoginUrl
          }
          let reqBody = {}
          reqBody[type + 'Id'] = username
          reqBody['password'] = password
          // TODO: encrypted the password
          // TODO: Use axios to send http request
          // TODO: handle response
          // else pop wrong message
          axios.post(url, reqBody).then(response => {
            console.log(response)
            let body = response.data.data
            console.log(body)
            if (body.code === 0) {
              // successfully login
              window.localStorage.setItem('type', type)
              window.localStorage.setItem('id', username)
              window.localStorage.setItem('token', body.token)
              if (type === 'staff') {
                window.location.href = this.staffBackUrl
              } else if (type === 'manager') {
                window.location.href = this.managerBackUrl
              }
            } else if (body.code === 2 && type === 'staff') {
              window.location.href = window.location.origin + '/staff-first-login?staffId=' + username
            } else {
              // error login
              this.$Notice.error({
                title: '用户名或密码错误'
              })
            }
          }).catch(error => {
            console.log(error)
            this.$Notice.error({
              title: '服务器发生错误，请稍后再试...'
            })
          })
        } else {
          this.$Notice.error({
            title: '请输入用户名和密码'
          })
        }
      })
    },
    changeType (name) {
      this.type = name
      this.formStaffLogin.username = ''
      this.formStaffLogin.password = ''
      this.formManagerLogin.username = ''
      this.formManagerLogin.password = ''
    }
  },
  created () {
    this.staffBackUrl = window.location.origin + '/' + this.staffBackUrl
    this.managerBackUrl = window.location.origin + '/' + this.managerBackUrl
    // handle url params
    // window.localStorage.setItem('token', '')
    let params = lib.getUrlParams(window.location.href)
    if (typeof params.backUrl === 'string') {
      if (params.backUrl.indexOf('staff') >= 0) {
        this.staffBackUrl = params.backUrl
        this.type = 'staff'
      } else if (params.backUrl.indexOf('manager') >= 0) {
        this.managerBackUrl = params.backUrl
        this.type = 'manager'
      }
    }
    // use token to auto login
    let storeType = window.localStorage.getItem('type')
    let storeToken = window.localStorage.getItem('token')
    let storeId = window.localStorage.getItem('id')
    let url = ''
    let requestBody = {}
    requestBody['token'] = storeToken
    if (storeType === 'staff') {
      url = this.$store.state.staffLoginUrl
      requestBody['staffId'] = storeId
    } else if (storeType === 'manager') {
      url = this.$store.state.managerLoginUrl
      requestBody['managerId'] = storeId
    }
    // check if the token is valid
    if (url) {
      axios.get(url, {
        params: requestBody
      }).then(response => {
        let body = response.data.data
        console.log(body)
        if (body.code === 0) {
          // successfully login
          if (storeType === 'staff') {
            window.location.href = this.staffBackUrl
          } else if (storeType === 'manager') {
            window.location.href = this.managerBackUrl
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.showAction = true
  }
}
</script>
<style scoped>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  background: url(https://cdn.pbrd.co/images/H0e4O2Ov.png) fixed no-repeat;
  background-size: cover;
}
.login-left {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.8);
}
.login-right {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.login-action-bg {
  width: 350px;
  height: 370px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
}
.login-tab-vertical-space {
  height: 50px;
}
.login-action {
  width: 280px;
}
.login-input {
  margin-bottom: 40px;
  padding: 0 10px;
}
.input-prepend {
  padding: 0 5px 0 5px;
}
.login-button {
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-link-text {
  font-size: 15px;
}
.login-button-text {
  letter-spacing: 2px;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

<style>
.ivu-input {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>