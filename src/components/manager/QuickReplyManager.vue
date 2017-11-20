<template>
  <div class="right-content">
    <div class="layout-header">
      <Row type="flex" justify="start" style="padding-left: 10px;padding-top: 10px">
        <h1>快捷回复设置
        </h1>
      </Row>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">
        <Row type="flex" justify="start" style="margin-bottom: 10px">
          <Button type="info">新增短语</Button>
        </Row>
        <Table border :columns="tablecolumns" :data="replies"></Table>
      </div>
    </div>
    <div class="layout-copy">
      2017-2017 &copy; HJZY开发小组
    </div>
  </div>
</template>

<script>
  export default {
    name: 'quickreplymanager',
    data () {
      return {
        tablecolumns: [
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
        replies: [
          {
            phrase: '#久等',
            sentence: '对不起，让您久等了'
          },
          {
            phrase: '#再见',
            sentence: '谢谢您对我们的支持，祝您生活愉快'
          }
        ]
      }
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
