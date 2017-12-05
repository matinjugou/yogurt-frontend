<template>
  <div class="add-info">
    <div class="info-input">
      <div class="single-input">
        <div class="single-input-element title ">姓名*：</div>
        <div class="single-input-element content" :class="{'wrong': wrongInput.indexOf('name') >= 0}">
          <Input autofocus v-model="name" size="large" placeholder="你的姓名" @on-keyup.enter="gotoNextStep"></Input>
        </div>
        <div class="single-input-element single-input-wrong" v-if="wrongInput.indexOf('name') >= 0">姓名为必填项</div>
      </div>
      <div class="single-input">
        <div class="single-input-element title">昵称*：</div>
        <div class="single-input-element content" :class="{'wrong': wrongInput.indexOf('nickName') >= 0}">
          <Input v-model="nickName" size="large" placeholder="你的昵称" @on-keyup.enter="gotoNextStep"></Input>
        </div>
        <div class="single-input-element single-input-wrong" v-if="wrongInput.indexOf('nickName') >= 0">昵称为必填项</div>
      </div>
      <div class="single-input">
        <div class="single-input-element title">手机号*：</div>
        <div class="single-input-element content" :class="{'wrong': wrongInput.indexOf('phoneNumber') >= 0}">
          <Input v-model="phoneNumber" size="large" placeholder="你的手机号" @on-keyup.enter="gotoNextStep"></Input>
        </div>
        <div class="single-input-element single-input-wrong" v-if="wrongInput.indexOf('phoneNumber') >= 0">手机号为必填项</div>
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
  name: 'AddInfo',
  data () {
    return {
      name: '',
      nickName: '',
      phoneNumber: '',
      wrongInput: []
    }
  },
  methods: {
    checkInputValid () {
      this.wrongInput = []
      let flag = 0
      if (this.name === '') {
        this.wrongInput.push('name')
        flag++
      }
      if (this.nickName === '') {
        this.wrongInput.push('nickName')
        flag++
      }
      if (this.phoneNumber === '') {
        this.wrongInput.push('phoneNumber')
        flag++
      }
      return flag === 0
    },
    gotoPrevStep () {
      this.$store.commit('subCurrent')
      this.$store.commit('leftDirection')
      this.$router.push('/')
    },
    gotoNextStep () {
      if (!this.checkInputValid()) {
        return
      }
      this.$store.commit({
        type: 'changeInfo',
        name: this.name,
        nickName: this.nickName,
        phoneNumber: this.phoneNumber
      })
      this.$store.commit('addCurrent')
      this.$store.commit('rightDirection')
      this.$router.push('/upload-avatar')
    }
  },
  created () {
    this.$store.commit({
      type: 'changeCurrent',
      current: 1
    })
    this.name = this.$store.state.name
    this.nickName = this.$store.state.nickName
    this.phoneNumber = this.$store.state.phoneNumber
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-info {
  width: 100%;
  text-align: center;
}
.info-input {
  width: 100%;
  height: 45vh;
  padding-top: 10vh;
}
.info-input  .wrong{
  border: 1px solid red;
  border-radius: 4px;
}
.single-input-wrong {
  color: red;
  font-size: 14px;
  width: 7em;
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
.bottom-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.horizontal-spacing {
  width: 30px;
}
</style>
