<template>
  <div class="staff-feedback">
    <div class="staff-feedback-title">
      客户反馈
      <Button type="ghost" shape="circle" icon="refresh" @click="getFeedbacks"></Button>
    </div>

    <div class="staff-feedback-table">
      <Table
        border 
        size="large"
        :loading="isLoading"
      ></Table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'StaffFeedback',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    getFeedbacks () {
      // TODO: get feedbacks
      this.isLoading = true
    }
  },
  created () {
    this.getFeedbacks()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-feedback {
  padding-left: 5vw;
}
.staff-feedback-title {
  margin: 5vh 0 3vh 0;
  font-size: 32px;
}
.staff-feedback-table {
  width: 77vw;
  height: 80vh;
  overflow: auto;
}
.modal-user-info {
  font-size: 14px;
  overflow: auto;
}
</style>
