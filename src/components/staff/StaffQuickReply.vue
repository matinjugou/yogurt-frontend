<template>
  <div class="staff-quick-reply">
    <div class="staff-quick-reply-title">
      快捷回复
      <Button type="ghost" shape="circle" icon="refresh" @click="getQuickReplys"></Button>
    </div>

    <h3 class="staff-quick-reply-caption">
      使用“#+替换词+空格”即可在聊天中使用这些预先设置好的快捷回复哦~
    </h3>

    <div class="staff-quick-reply-table">
      <Table 
        border 
        size="large"
        :loading="isLoading" 
        :columns="columns" 
        :data="data"
      ></Table>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StaffQuickReply',
  data () {
    return {
      isLoading: false,
      columns: [
        {
          title: '替换词',
          key: 'phrase',
          width: 200
        },
        {
          title: '回复内容',
          key: 'sentence'
        }
      ]
    }
  },
  computed: {
    data: {
      get: function () {
        return this.$store.state.quickReplyList
      },
      set: function (newQuickReplyList) {
        this.$store.commit({
          type: 'updateQuickReplyList',
          quickReplyList: newQuickReplyList
        })
      }
    },
    staffId () {
      return this.$store.state.staffId
    },
    companyId () {
      return this.$store.state.companyId
    },
    httpServerUrl () {
      return this.$store.state.httpServerUrl
    }
  },
  methods: {
    getQuickReplys () {
      this.isLoading = true
      axios.get(this.httpServerUrl + '/quick-reply/public', {
        params: {
          companyId: this.companyId,
          staffId: window.localStorage.getItem('id'),
          token: window.localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response)
        let body = response.data
        if (body.errno === 0) {
          this.data = body.data.pairs
          this.isLoading = false
        } else {
          this.$Notice.error({
            title: '没能成功获取快捷回复列表，请刷新重试'
          })
        }
      }).catch(error => {
        this.$Notice.error({
          title: '没能成功获取快捷回复列表，请刷新重试'
        })
        console.log(error)
      })
    }
  },
  created () {
    // get quick reply
    this.getQuickReplys()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-quick-reply {
  padding-left: 5vw;
}
.staff-quick-reply-title {
  margin: 5vh 0 3vh 0;
  font-size: 32px;
}
.staff-quick-reply-caption {
  margin-bottom: 3vh;
}
.staff-quick-reply-table {
  width: 77vw;
  height: 80vh;
  overflow: auto;
}
</style>

