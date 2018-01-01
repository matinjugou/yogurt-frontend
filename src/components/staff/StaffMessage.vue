<template>
  <div class="staff-message">
    <div class="staff-message-title">
      客户留言
      <Button type="ghost" shape="circle" icon="refresh" @click="getMessages"></Button>
    </div>
    
    <div class="staff-message-table">
      <Table 
        border 
        size="large"
        :loading="isLoading" 
        :columns="columns" 
        :data="data"
        @on-row-click="showDetailInfo"></Table>
    </div>
    <Modal  
      v-model="isShowingReplyModal"
      width="40%" 
      title="回复用户留言" 
      @on-ok="replyOk"
      @on-cancel="replyCancel"
    >
      <div class="modal-user-info">
        <h3>用户基本信息</h3>
        <br />
        用户Id：{{this.data.length > this.currentIndex ? this.data[this.currentIndex].userId : ''}} <br/> 
        留言时间：{{this.data.length > this.currentIndex ? this.data[this.currentIndex].time : ''}} <br/>
        留言内容：{{this.data.length > this.currentIndex ? this.data[this.currentIndex].content : ''}} <br />
        <br />
        <h3>你的回复</h3>
        <br />
        <Input v-model="replyContent" type="textarea" :rows="3"></Input>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StaffMessage',
  data () {
    return {
      isLoading: false,
      isShowingReplyModal: false,
      currentIndex: 0,
      replyContent: '',
      columns: [
        {
          title: '留言ID',
          key: 'id',
          width: 100
        },
        {
          title: '用户ID',
          key: 'userId',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.showUserInfo(params.index)
                  }
                }
              }, this.data[params.index].userId)
            ])
          }
        },
        {
          title: '时间',
          key: 'time',
          width: 200
        },
        {
          title: '内容',
          key: 'content',
          ellipsis: true
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '20px'
                },
                on: {
                  click: () => {
                    this.showReplyModal(params.index)
                  }
                }
              }, '回复'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeIndex(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: []
    }
  },
  computed: {
    staffId () {
      return this.$store.state.staffId
    },
    httpServerUrl () {
      return this.$store.state.httpServerUrl
    },
    companyId () {
      return this.$store.state.companyId
    }
  },
  methods: {
    getMessages () {
      this.isLoading = true
      axios.get(this.httpServerUrl + '/note', {
        params: {
          companyId: this.companyId,
          staffId: window.localStorage.getItem('id'),
          token: window.localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response)
        let body = response.data
        if (body.errno === 0) {
          this.data = body.data
          this.isLoading = false
        } else {
          this.$Notice.error({
            title: '没能成功获取留言列表，请刷新重试'
          })
        }
      }).catch(error => {
        this.$Notice.error({
          title: '没能成功获取留言列表，请刷新重试'
        })
        console.log(error)
      })
    },
    removeIndex (index) {
      this.data.splice(index, 1)
    },
    showDetailInfo (data, index) {
      // console.log(data)
      // console.log(index)
    },
    showUserInfo (index) {
      this.$Notice.warning({
        title: '该功能暂未开放'
      })
      // axios.get(this.httpServerUrl + '/user-info', {
      //   params: {
      //     userId: this.data[index].userId,
      //     staffId: window.localStorage.getItem('id'),
      //     token: window.localStorage.getItem('token')
      //   }
      // }).then(response => {
      //   // TODO: show user detail info modal
      // }).catch(error => {
      //   this.$Notice.error({
      //     title: '没能成功获取用户信息，请稍后重试'
      //   })
      //   console.log(error)
      // })
    },
    showReplyModal (index) {
      console.log('Reply message from userId: ' + this.data[index].userId)
      this.currentIndex = index
      this.isShowingReplyModal = true
    },
    replyOk () {
      axios.post(this.httpServerUrl + '/note', {
        noteId: this.data[this.currentIndex].id,
        staffId: window.localStorage.getItem('id'),
        token: window.localStorage.getItem('token'),
        reply: this.replyContent
      }).then(response => {
        console.log(response)
        let body = response.data.data
        if (body.code === 0) {
          this.$Notice.success({
            title: '成功回复该留言~'
          })
          this.removeIndex(this.currentIndex)
        } else {
          this.$Notice.error({
            title: '没能成功回复留言，请稍后重试'
          })
        }
      }).catch(error => {
        this.$Notice.error({
          title: '没能成功回复留言，请稍后重试'
        })
        console.log(error)
      })
      this.replyContent = ''
    },
    replyCancel () {
      this.replyContent = ''
    }
  },
  created () {
    // get staff info
    this.getMessages()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-message {
  padding-left: 5vw;
}
.staff-message-title {
  margin: 5vh 0 3vh 0;
  font-size: 32px;
}
.staff-message-table {
  width: 77vw;
  height: 80vh;
  overflow: auto;
}
.modal-user-info {
  font-size: 14px;
  overflow: auto;
}
</style>
