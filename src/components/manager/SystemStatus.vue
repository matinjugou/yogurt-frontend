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
        <Row type="flex" style="padding-bottom: 7px; margin-bottom: 10px;border-bottom: 1px solid #e9eaec">
          <h3 style="padding-left: 5px;border-left: 5px solid orange">
            基本状态
          </h3>
        </Row>
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
        <Row type="flex" style="padding-bottom: 7px; margin-bottom: 10px;border-bottom: 1px solid #e9eaec">
          <h3 style="padding-left: 5px;border-left: 5px solid orange;margin-top: 10px">
            机器人状态
          </h3>
        </Row>
        <Row type="flex" style="padding-bottom: 7px; margin-bottom: 10px;border-bottom: 1px solid #e9eaec">
          <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
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
  import echarts from 'echarts'

  export default {
    name: 'systemstatus',
    data () {
      return {
        totalServeCount: 0,
        totalAnsAsk: '0/0',
        totalNoteCount: 0,
        repliedNoteCount: 0,
        dataShadow: [],
        dataAxis: [],
        data: []
      }
    },
    computed: {
    },
    methods: {
      drawLine (dataAxis, data) {
        let myChart = echarts.init(document.getElementById('myChart'))
        for (let i = 0; i < data.length; i++) {
          this.dataShadow.push(1)
        }
        myChart.setOption({
          title: {
            text: '词频分析',
            subtext: '所有问题中前20名的关键词'
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: this.dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data: data
            }
          ]
        })
      }
    },
    mounted: function () {
      const self = this
      let myChart = echarts.init(document.getElementById('myChart'))
      const zoomSize = 6
      myChart.on('click', function (params) {
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: self.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: self.dataAxis[Math.min(params.dataIndex + zoomSize / 2, self.data.length - 1)]
        })
      })
      axios.get(self.$store.state.httpServerUrl + '/company-info', {
        params: {
          companyId: self.$store.state.companyId
        }
      }).then(res => {
        const data = res.data.data
        self.totalServeCount = data.totalServeCount
        self.totalAnsAsk = data.totalAnsAsk
        self.totalNoteCount = data.totalNoteCount
        self.repliedNoteCount = data.repliedNoteCount

        axios.get(self.$store.state.analyseServerUrl).then(res => {
          console.log(res)
          for (const tag of res.data.tags) {
            self.dataAxis.push(tag[0])
            self.data.push(tag[1].toFixed(2))
          }
          self.drawLine(self.dataAxis, self.data)
        })
      }).catch(error => {
        console.error(error)
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
