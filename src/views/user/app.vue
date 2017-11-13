<template>
  <div id="app">
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
      <Row type="flex">
        <Col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="1" theme="dark" width="auto">
        </Menu>
        </Col>
        <Col :span="spanRight">
        <div class="layout-header">
          <Button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
          <Avatar class="inline-middle" shape="square" icon="person"/>
          <span class="inline-middle">xxx公司</span>
          <span style="float: right;margin-top: 12px;margin-right: 21px">人工客服</span>
        </div>
        <div class="layout-content-msg">
          <div class="layout-content-msg-main">messages</div>
        </div>
        <div class="layout-content-input">
          <div class="layout-content-input-main">
            <Button>
              文件
              <Icon type="document"></Icon>
            </Button>
            <Button>
              表情
              <Icon type="android-happy"></Icon>
            </Button>
            <Button>
              历史消息
            </Button>
            <Button>
              截图
              <Icon type="monitor"></Icon>
            </Button>
            <Button style="float: right">发送</Button>
            <Input type="textarea" style="margin-top: 5px" :rows="6" placeholder="在此输入消息"></Input>
          </div>
        </div>
        <div class="layout-copy">
          2017 &copy; Yogurt
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    height: 100%;
    margin: 0;
  }
  .layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-content-msg{
    height: calc(100vh - 60px - 30px - 30px - 200px);
    margin: 15px;
    margin-bottom: 2px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 1px rgba(0,0,0,.1);
  }
  .layout-content-msg-main{
    padding: 10px;
  }
  .layout-content-input{
    height: 200px;
    overflow: hidden;
    margin: 15px;
    margin-top: 0;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-content-input-main{
    padding: 10px;
    max-height: 200px;
  }
  .layout-copy{
    text-align: center;
    /*padding: 10px 0 20px;*/
    height: 30px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    font-size: 18px;
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .inline-middle{
    display: inline-block;
    margin: 3px;
    vertical-align: middle;
  }
  .layout-ceiling-msg a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
</style>
<script>
  export default {
    data () {
      return {
        spanLeft: 5,
        spanRight: 19
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24
      }
    },
    methods: {
      toggleClick () {
        if (this.spanLeft === 5) {
          this.spanLeft = 2
          this.spanRight = 22
        } else {
          this.spanLeft = 5
          this.spanRight = 19
        }
      }
    }
  }
</script>
