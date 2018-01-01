<template>
  <div class="right-content">
    <div class="layout-header">
      <Row type="flex" justify="start" style="padding-left: 10px;padding-top: 10px">
        <h1 style="padding-left: 5px;border-left: 5px solid #2baee9">快捷回复设置
        </h1>
      </Row>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">
        <Row type="flex" justify="start" style="margin-bottom: 10px">
          <Button type="info" @click="newPhraseModal = true">新增短语</Button>
          <Modal
            v-model="newPhraseModal"
            title="新增短语"
            @on-ok="newPhraseModalOk"
            @on-cancel="newPhraseModalCancel">
            <h4 style="margin-bottom: 7px">
              短语
            </h4>
            <Input v-model="newPhrase"
                   placeholder="Enter something..."
                   style="margin-bottom: 10px"/>
            <h4 style="margin-bottom: 7px">
              句子
            </h4>
            <Input v-model="newSentence"
                   placeholder="Enter something..."
                   style="margin-bottom: 10px"/>
          </Modal>
          <Modal
            v-model="changePhraseModal"
            title="修改短语"
            @on-ok="changePhraseModalOk"
            @on-cancel="changePhraseModalCancel">
            <h4 style="margin-bottom: 7px">
              短语
            </h4>
            <span><b>当前短语：</b>{{ oldPhrase }}</span>
            <Input v-model="newPhrase"
                   placeholder="Enter something..."
                   style="margin-bottom: 10px"
            />
            <h4 style="margin-bottom: 7px">
              句子
            </h4>
            <span><b>当前句子：</b>{{ oldSentence }}</span>
            <Input v-model="newSentence"
                   ref="changeNewSentenceInput"
                   placeholder="Enter something..."
                   style="margin-bottom: 10px"/>
          </Modal>
        </Row>
        <Table border ref="selection" :columns="tablecolumns" :data="replies"
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
    name: 'quickreplymanager',
    data () {
      return {
        newPhraseModal: false,
        changePhraseModal: false,
        newPhrase: '',
        newSentence: '',
        oldPhrase: '',
        oldSentence: '',
        selected: [],
        tablecolumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '短语',
            key: 'phrase'
          },
          {
            title: '句子',
            key: 'sentence'
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
                  },
                  on: {
                    click: () => {
                      this.editPair(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deletePair(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        replies: [
        ]
      }
    },
    computed: {
      selectedEmpty: function () {
        return this.selected.length === 0
      }
    },
    methods: {
      newPhraseModalOk () {
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
      newPhraseModalCancel () {
        this.$Message.info('Clicked cancel')
      },
      changePhraseModalOk () {
        if (this.newPhrase !== '' && this.newSentence !== '') {
          const self = this
          axios.put('http://yogurt.magichc7.com/api/manager/quick-reply/public', {
            companyId: 1,
            oldPhrase: self.oldPhrase,
            oldSentence: self.oldSentence,
            newPhrase: self.newPhrase,
            newSentence: self.newSentence
          }).then(function (response) {
            console.log(response)
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
              self.$Message.info('修改成功！')
            }).catch(function (error) {
              self.$Message.error(error)
            })
          }).catch(function (error) {
            self.$Message.error(error)
          })
        }
      },
      changePhraseModalCancel () {
        this.$Message.info('Clicked cancel')
      },
      changeSelected (selection, row) {
        this.selected = selection
        console.log(this.selected)
      },
      deleteSelected () {
        const pairs = []
        const self = this
        for (let select of this.selected) {
          pairs.push({
            phrase: select.phrase,
            sentence: select.sentence
          })
        }
        axios({
          url: self.$store.state.httpServerUrl + '/quick-reply/public',
          method: 'delete',
          params: {
            companyId: 1,
            pairs: pairs
          }
        }).then(function (response) {
          axios.get(self.$store.state.httpServerUrl + '/quick-reply/public', {
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
          }).catch(function () {
            self.$Message.error('服务出现故障，请重试一下~')
          })
          self.$Message.info('删除成功！')
        }).catch(function () {
          self.$Message.error('服务出现故障，请重试一下~')
        })
      },
      editPair (index) {
        this.oldPhrase = this.replies[index].phrase
        this.oldSentence = this.replies[index].sentence
        this.changePhraseModal = true
      },
      deletePair (index) {
        const pairs = []
        const self = this
        pairs.push({
          phrase: self.replies[index].phrase,
          sentence: self.replies[index].sentence
        })
        axios({
          method: 'delete',
          url: 'http://yogurt.magichc7.com/api/manager/quick-reply/public',
          params: {
            companyId: 1,
            pairs: pairs
          }
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
          }).catch(function () {
            self.$Message.error('服务出现故障，请重试一下~')
          })
          self.$Message.info('删除成功！')
        }).catch(function () {
          self.$Message.error('服务出现故障，请重试一下~')
        })
      }
    },
    mounted: function () {
      const self = this
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
