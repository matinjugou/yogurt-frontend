<template>
  <div class="right-content">
    <div class="layout-header">
      <Row type="flex" justify="start" style="padding-left: 10px;padding-top: 10px">
        <h1 style="padding-left: 5px;border-left: 5px solid #2baee9">客服管理
        </h1>
      </Row>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">
        <Row style="margin-bottom: 10px">
          <Button style="float: left" @click="newStaffModal = true" type="info">新增客服</Button>
          <Modal
            v-model="newStaffModal"
            title="新增客服"
            width="200"
            @on-ok="newStaffModalOk"
            @on-cancel="newStaffModalCancel">
            <span style="margin-bottom: 7px">
              数量
            </span>
            <InputNumber :min="1" v-model="newStaffNum"></InputNumber>
          </Modal>
          <Input v-model="searchName"
                 icon="ios-search-strong"
                 placeholder="请输入姓名..."
                 style="float: right;width: 200px;"/>
        </Row>
        <Table border ref="selection" :columns="staffColumn" :data="filteredstaffdata"
               @on-selection-change="changeSelected"></Table>
        <Button :disabled="selectedEmpty" type="error" style="margin-top: 7px" @click="deleteSelected">删除</Button>
      </div>
    </div>
    <div class="layout-copy">
      2017-2017 &copy; HJZY开发小组
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'staffmanager',
    data () {
      return {
        newStaffModal: false,
        newStaffNum: 0,
        selected: [],
        searchName: '',
        staffColumn: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '客服ID',
            key: 'staffId'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '昵称',
            key: 'nickname'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '手机号',
            key: 'phonenumber'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              const row = params.row
              const color = row.status === 1 ? 'green' : row.status === 2 ? 'blue' : row.status === 0 ? 'red' : 'orange'
              const text = row.status === 1 ? '在线' : row.status === 2 ? '休息' : row.status === 0 ? '离线' : '未知'
              return h('div', [
                h('Tag', {
                  props: {
                    color: color
                  },
                  style: {
                    marginRight: '5px'
                  }
                }, text)
              ])
            }
          },
          {
            title: '服务人数',
            key: 'queueCount'
          },
          {
            title: '分工',
            key: 'role',
            filters: [
              {
                label: '售前',
                value: '售前'
              },
              {
                label: '售后',
                value: '售后'
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              return row.role === value
            }
          },
          {
            title: '操作',
            key: 'actions',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '删除')
              ])
            }
          }
        ],
        staffdata: [
        ]
      }
    },
    computed: {
      filteredstaffdata: function () {
        if (this.searchname === '') {
          return this.staffdata
        } else {
          let tmpstaff = []
          for (let per of this.staffdata) {
            if (per.name.indexOf(this.searchName) >= 0) {
              tmpstaff.push(per)
            }
          }
          return tmpstaff
        }
      },
      selectedEmpty: function () {
        return this.selected.length === 0
      }
    },
    methods: {
      newStaffModalOk () {
        const self = this
        axios.post('http://yogurt.magichc7.com/api/manager/staff', {
          number: self.newStaffNum,
          companyId: 1
        }).then(function (response) {
          console.log(response.data.data)
        }).catch(function (error) {
          console.log(error)
          self.$Message.info('Clicked cancel')
        })
        axios.get('http://yogurt.magichc7.com/api/manager/staff', {
          params: {
            companyId: 1
          }
        }).then(function (response) {
          console.log(response)
          let tmpstaffdata = []
          for (let staff of response.data.data) {
            tmpstaffdata.push({
              staffId: staff.staffId,
              name: staff.name,
              nickname: staff.nickname,
              email: staff.email,
              phonenumber: staff.tel,
              status: staff.onlineStatus,
              role: staff.role,
              queueCount: staff.queueCount
            })
          }
          self.staffdata = tmpstaffdata
        }).catch(function (error) {
          console.log(error)
        })
        self.$Message.info('Clicked ok')
      },
      newStaffModalCancel () {
        this.$Message.info('Clicked cancel')
      },
      changeSelected (selection, row) {
        this.selected = selection
      },
      deleteSelected () {
        console.log('selected:', this.selected)
        const stuff = []
        const self = this
        for (let select of this.selected) {
          stuff.push({
            sentence: select.staffId
          })
        }
        axios({
          method: 'delete',
          url: 'http://yogurt.magichc7.com/api/manager/staff',
          data: {
            stuff: stuff
          }
        }).then(function (response) {
          axios.get('http://yogurt.magichc7.com/api/manager/staff', {
            params: {
              companyId: self.$store.state.companyId
            }
          }).then(function (response) {
            console.log('response=', response)
            let tmpstaffdata = []
            for (let staff of response.data.data) {
              tmpstaffdata.push({
                staffId: staff.staffId,
                name: staff.name,
                nickname: staff.nickname,
                email: staff.email,
                phonenumber: staff.tel,
                status: staff.onlineStatus,
                role: staff.role,
                queueCount: staff.queueCount
              })
            }
            self.staffdata = tmpstaffdata
          }).catch(function () {
            self.$Message.error('服务出现故障，请重试一下~')
          })
          self.$Message.info('删除成功！')
        }).catch(function () {
          self.$Message.error('服务出现故障，请重试一下~')
        })
      }
    },
    created: function () {
      const self = this
      axios.get('http://yogurt.magichc7.com/api/manager/staff', {
        params: {
          companyId: 1
        }
      }).then(function (response) {
        console.log('response=', response)
        let tmpstaffdata = []
        for (let staff of response.data.data) {
          tmpstaffdata.push({
            staffId: staff.staffId,
            name: staff.name,
            nickname: staff.nickname,
            email: staff.email,
            phonenumber: staff.tel,
            status: staff.onlineStatus,
            role: staff.role,
            queueCount: staff.queueCount
          })
        }
        self.staffdata = tmpstaffdata
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  .right-content {
    min-height: 100vh;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
