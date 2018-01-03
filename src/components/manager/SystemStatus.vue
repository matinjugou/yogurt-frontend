<template>
  <div class="right-content">
    <div class="layout-header">
      <Row type="flex" justify="start" style="padding-left: 10px;padding-top: 10px">
        <h1 style="padding-left: 5px;border-left: 5px solid #2baee9">系统状态
        </h1>
      </Row>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">
        <Row type="flex" justify="start" style="margin-bottom: 10px;">
          <Col span="7">
          <Card style="text-align: center">
            <p slot="title">服务人次</p>
            <h2 style="color: cornflowerblue">{{ totalServeCount }}</h2>
          </Card>
          </Col>
          <Col span="7" offset="1">
          <Card style="text-align: center">
            <p slot="title">总答问比</p>
            <h2 style="color: cornflowerblue">{{ totalAnsAsk }}</h2>
          </Card>
          </Col>
          <Col span="7" offset="1">
          <Card style="text-align: center">
            <p slot="title">留言情况</p>
            <h2 style="color: cornflowerblue">{{ repliedNoteCount}}/{{ totalNoteCount }}</h2>
          </Card>
          </Col>
        </Row>
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
    name: 'systemstatus',
    data () {
      return {
        totalServeCount: 0,
        totalAnsAsk: '0/0',
        totalNoteCount: 0,
        repliedNoteCount: 0
      }
    },
    computed: {
    },
    methods: {
    },
    mounted: function () {
      const self = this
      axios.get(self.$store.state.httpServerUrl + '/company-info', {
        params: {
          companyId: self.$store.state.companyId
        }
      }).then(res => {
        const data = res.data.data
        console.log('data=', data)
        self.totalServeCount = data.totalServeCount
        self.totalAnsAsk = data.totalAnsAsk
        self.totalNoteCount = data.totalNoteCount
        self.repliedNoteCount = data.repliedNoteCount
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
