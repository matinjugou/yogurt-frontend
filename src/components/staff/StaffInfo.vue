<template>
  <div class="staff-info">
    <div class="staff-info-center">
      <div class="staff-info-avatar">
        <img class="avatar-image" :src="avatarUrl" alt="头像"/>
      </div>
      <div class="staff-info-content">
        <div class="staff-info-detail">
          <div class="single-info">
            <div class="single-info-element title">
              ID:
            </div>
            <div class="single-info-element content">
              {{ staffId }}
            </div>
          </div>
          <div class="single-info">
            <div class="single-info-element title">
              昵称:
            </div>
            <div class="single-info-element content">
              <Input v-model="nickName" placeholder="your name" size='large'></Input>
            </div>
          </div>
          <div class="single-info">
            <div class="single-info-element title">
              邮箱:
            </div>
            <div class="single-info-element content">
              <Input v-model="email" placeholder="yourname@yogurt.com" size='large'></Input>
            </div>
          </div>
          <div class="single-info">
            <div class="single-info-element title">
              手机号:
            </div>
            <div class="single-info-element content">
              <Input v-model="phoneNumber" placeholder="123****789" size='large'></Input>
            </div>
          </div>
        </div>
        <div class="staff-info-change-button">
          <Button type="success" shape="circle" @click="updateStaffInfo">提交修改</Button>
        </div>
        <div class="vertical-spacing"></div>
        <div class="staff-info-detail">
          <div class="single-info">
            <div class="single-info-element title">
              旧密码:
            </div>
            <div class="single-info-element content">
              <Input v-model="oldPassword" type="password" placeholder="********" size='large'></Input>
            </div>
          </div>
          <div class="single-info">
            <div class="single-info-element title">
              新密码:
            </div>
            <div class="single-info-element content">
              <Input v-model="newPassword" type="password" placeholder="********" size='large'></Input>
            </div>
          </div>
        </div>
        <div class="staff-info-change-button">
          <Button type="success" shape="circle" @click="updatePassword">修改密码</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'StaffInfo',
  data () {
    return {
      avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512143132319&di=4f1af9a57c13467a0939aaeea1627b94&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Fface%2F08224a0bc9b5652fd9b2ad9b4f0717a38166d632.jpg',
      nickName: '',
      email: '',
      phoneNumber: '',
      oldPassword: '',
      newPassword: ''
    }
  },
  computed: {
    staffId () {
      return this.$store.state.staffId
    }
  },
  methods: {
    updateStaffInfo () {
      // TODO: update staff info
    },
    updatePassword () {
      // TODO: update staff password
      // TODO: better warning before
    }
  },
  created () {
    if (this.$store.state.isLogin === false) {
      this.$router.push('/login')
    }
    // TODO: update info
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
  margin-right: 100px;
}
.avatar-image {
  width: 160px;
  height: 160px;
  border: 1px solid white;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 2px 2px 1px #888888;
}
.staff-info-detail {
  font-size: 15px;
}
.single-info {
  margin-bottom: 15px;
}
.single-info-element {
  display: inline-flex;
}
.single-info > .title {
  justify-content: flex-end;
  width: 100px;
  letter-spacing: 2px;
  margin-right: 30px;
}
.staff-info-change-button {
  width: 100%;
  text-align: right;
}
.vertical-spacing {
  height: 30px;
}
</style>
