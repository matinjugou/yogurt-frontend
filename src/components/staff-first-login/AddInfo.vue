<template>
  <div class="add-info">
    
    <div class="info-input">
      <div class="info-input-content">
        <Form ref="formInfo" label-position="right" :label-width="100" :model="formInfo" :rules="ruleInfo">
          <FormItem prop="name" label="姓名">
            <Input autofocus v-model="formInfo.name" size="large" placeholder="你的姓名" @on-keyup.enter="gotoNextStep"></Input>
          </FormItem>
          <FormItem prop="nickName" label="昵称">
            <Input v-model="formInfo.nickName" size="large" placeholder="你的昵称" @on-keyup.enter="gotoNextStep"></Input>
          </FormItem>
          <FormItem prop="phoneNumber" label="手机号">
            <Input v-model="formInfo.phoneNumber" size="large" placeholder="你的手机号" @on-keyup.enter="gotoNextStep"></Input>
          </FormItem>
          <FormItem prop="staffType" label="客服类型">
            <Select v-model="formInfo.staffType" placeholder="请选择客服类型">
              <Option v-for="(item, index) in staffTypeList" :key="index" :value="item">
                {{ item }}
              </Option>
            </Select>
          </FormItem>
        </Form>
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
      staffTypeList: ['种类1', '种类2', '种类3'],
      formInfo: {
        name: '',
        nickName: '',
        phoneNumber: '',
        staffType: ''
      },
      ruleInfo: {
        name: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }
        ],
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
        ],
        staffType: [
          {
            required: true,
            message: '请选择客服类型',
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
      this.$router.push('/')
    },
    gotoNextStep () {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          this.$store.commit({
            type: 'changeInfo',
            name: this.formInfo.name,
            nickName: this.formInfo.nickName,
            phoneNumber: this.formInfo.phoneNumber,
            staffType: this.formInfo.staffType
          })
          this.$store.commit('addCurrent')
          this.$store.commit('rightDirection')
          this.$router.push('/upload-avatar')
        } else {
          // not satisfy the form format
        }
      })
    }
  },
  created () {
    this.$store.commit({
      type: 'changeCurrent',
      current: 1
    })
    // TODO: get staff types set by company
    this.formInfo.name = this.$store.state.name
    this.formInfo.nickName = this.$store.state.nickName
    this.formInfo.phoneNumber = this.$store.state.phoneNumber
    this.formInfo.staffType = this.$store.state.staffType
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
.info-input-content {
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

<style>
.ivu-form .ivu-form-item-label {
  font-size: 16px;
}
</style>