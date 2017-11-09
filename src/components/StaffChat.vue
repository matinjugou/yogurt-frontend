<template>
  <div class="staff-chat">
    <Row type="flex">
      <Col :span="spanLeft" class="chat-user-menu vertical-spacing">
        <Menu active-name="1" theme="light" width="auto" :open-names="['chatting', 'switching', 'waiting']">
          <Submenu name="chatting">
            <template slot="title">
              处理中
            </template>
            <MenuItem v-for="(user, index) in chattingList" :key="user.userid" :name="user.userid">
              <div class="chat-menu-item">
                <Avatar shape="square" icon="person"/>
              </div>
              <div class="chat-menu-item">
                {{ user.userName }} <br />
                {{ user.userName }}
              </div>
            </MenuItem>
          </Submenu>
          <Submenu name="switching">
            <template slot="title">
              待转接
            </template>
            <MenuItem v-for="(user, index) in switchingList" :key="user.userid" :name="user.userid">
              <div class="chat-menu-item">
                <Avatar shape="square" icon="person"/>
              </div>
              <div class="chat-menu-item">
                {{ user.userName }} <br />
                {{ user.userName }}
              </div>
            </MenuItem>
          </Submenu>
          <Submenu name="waiting">
            <template slot="title">
              正在排队
            </template>
            <MenuItem v-for="(user, index) in waitingList" :key="user.userid" :name="user.userid">
              <div class="chat-menu-item">
                <Avatar shape="square" icon="person"/>
              </div>
              <div class="chat-menu-item">
                {{ user.userName }} <br />
                {{ user.userName }}
              </div>
            </MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col :span="spanRight" class="chat-window vertical-spacing">
        {{ msg }}
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'StaffChat',
  data () {
    return {
      spanLeft: 6,
      msg: '这里是聊天界面',
      chattingList: [
        {
          userid: '1',
          userName: 'Name1'
        },
        {
          userid: '2',
          userName: 'Name2'
        }
      ],
      switchingList: [
        {
          userid: '3',
          userName: 'Name3'
        },
        {
          userid: '4',
          userName: 'Name4'
        }
      ],
      waitingList: [
        {
          userid: '5',
          userName: 'Name5'
        },
        {
          userid: '6',
          userName: 'Name6'
        },
        {
          userid: '7',
          userName: 'Name7'
        },
        {
          userid: '8',
          userName: 'Name8'
        },
        {
          userid: '9',
          userName: 'Name9'
        },
        {
          userid: '10',
          userName: 'Name10'
        }
      ]
    }
  },
  computed: {
    spanRight () {
      return 24 - this.spanLeft
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../node_modules/iview/dist/styles/iview.css';
.vertical-spacing {
  height: calc(100vh - 50px);
}
.chat-user-menu{
  text-align: left;
  background: #FFFFFF;
  overflow: auto;
}
.chat-window {
  text-align: left;
  background: #F8F8F9
}
.chat-menu-item {
  display: inline-flex;
  vertical-align:middle
}
</style>
