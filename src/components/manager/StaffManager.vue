<template>
  <div class="right-content">
    <div class="layout-header"></div>
    <div class="layout-content">
      <div class="layout-content-main">
        <Table border :columns="staffcolumn" :data="staffdata"></Table>
      </div>
    </div>
    <div class="layout-copy">
      2017-2017 &copy; HJZY开发小组
    </div>
  </div>
</template>

<script>
export default {
  name: 'staffmanager',
  data () {
    return {
      staffcolumn: [
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
          key: 'status'
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
        {
          name: '黄超',
          nickname: '闪翼魔术师',
          email: 'thss15_huangc@163.com',
          phonenumber: '18110382770',
          status: 'online',
          role: '售前'
        },
        {
          name: '杨壁菲',
          nickname: 'effie-0',
          email: 'thss15_yangbf@163.com',
          phonenumber: '15911151830',
          status: 'offline',
          role: '售后'
        }
      ]
    }
  },
  computed: {

  },
  methods: {

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
