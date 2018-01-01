<template>
  <div class="right-content">
    <div class="layout-header">
      <Row type="flex" justify="start" style="padding-left: 10px;padding-top: 10px">
        <h1 style="padding-left: 5px;border-left: 5px solid #2baee9">留言管理
        </h1>
      </Row>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">
        <Row type="flex" justify="start" style="margin-bottom: 10px">
          <Modal
            v-model="replyMessageModal"
            title="回复留言"
            @on-ok="replyMessageModalOk"
            @on-cancel="replyMessageModalCancel">
            <h4 style="margin-bottom: 7px">
              回复内容
            </h4>
            <Input v-model="replyContent"
                   placeholder="Enter something..."
                   style="margin-bottom: 10px"
            />
          </Modal>
        </Row>
        <Table border ref="selection" :columns="tablecolumns" :data="notes"
               @on-selection-change="changeSelected"></Table>
        <Button :disabled="selectedEmpty" type="primary"
                style="margin-top: 7px" @click="replySelected">批量回复</Button>
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
    name: 'quickreplymanager',
    data () {
      return {
        replyMessageModal: false,
        replyContent: '',
        selected: [],
        tablecolumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户',
            key: 'user'
          },
          {
            title: '时间',
            key: 'time'
          },
          {
            title: '内容',
            key: 'content'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              const row = params.row
              const color = row.status === 1 ? 'green' : 'red'
              const text = row.status === 1 ? '已回复' : '待回复'
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
            title: '回复内容',
            key: 'reply'
          },
          {
            title: '回复人',
            key: 'staff'
          },
          {
            title: '操作',
            key: 'actions',
            render: (h, params) => {
              const disabled = params.row.status === 1
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: disabled
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.replyMessageModal = true
                    }
                  }
                }, '回复')
              ])
            }
          }
        ],
        notes: [
        ]
      }
    },
    computed: {
      selectedEmpty: function () {
        return this.selected.length === 0
      }
    },
    methods: {
      replyMessageModalOk () {
        this.$Message.info('Clicked ok')
        if (this.newPhrase !== '' && this.newSentence !== '') {
          const self = this
          axios.post('http://yogurt.magichc7.com/api/manager/quick-reply/public', {
            companyId: 1,
            phrase: self.newPhrase,
            sentence: self.newSentence
          }).then(function (response) {
            axios.get('http://yogurt.magichc7.com/api/manager/quick-reply/public', {
              params: {
                companyId: 1
              }
            }).then(function (response) {
              self.replies = []
              for (const reply of response.data.data) {
                self.replies.push({
                  phrase: reply.phrase,
                  sentence: reply.sentence
                })
              }
            }).catch(function (error) {
              self.$Message.error(error)
            })
          }).catch(function (error) {
            self.$Message.error(error)
          })
        }
      },
      replyMessageModalCancel () {
        this.$Message.info('Clicked cancel')
      },
      replyMessage (index) {},
      replySelected () {},
      changeSelected (selection, row) {
        this.selected = selection
        console.log(this.selected)
      }
    },
    mounted: function () {
      const self = this
      axios.get(self.$store.state.httpServerUrl + '/note', {
        params: {
          companyId: 1
        }
      }).then(function (response) {
        self.notes = []
        for (const note of response.data.data) {
          self.notes.push({
            user: note.userId,
            time: note.time,
            email: note.email,
            content: note.content,
            status: note.isReplied,
            reply: note.reply,
            staff: note.staffId
          })
        }
      }).catch(function (error) {
        self.$Message.error(error)
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
