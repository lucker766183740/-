<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-carousel trigger="click" height="350px">
          <el-carousel-item v-for="item in 4" :key="item" >
            <img src="~@/assets/img/login_bg.png" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="4">
            <div id="weater">
              <div id="he-plugin-standard" ref="weather"></div>
              <remote-script src="https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0">
              </remote-script>
            </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>课程信息</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="classContainer">
        <span class="btn" :style="{background:randomColor()}" v-for="item in 15" :key="item">
          <i class="el-icon-edit"></i>
          犯罪心理学
        </span>
      </div>
    </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>图表数据</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div id="echarts" style="width:100%;height:300px"></div>
        </el-card>
      </el-col>
    </el-row>
 
  </div>
</template>

<script>
  import Vue from 'vue'
  import echarts from 'echarts'
  window.WIDGET = {
    CONFIG: {
      'layout': 2,
      'width': '250',
      'height': '350',
      'background': 1,
      'dataColor': 'FFFFFF',
      'borderRadius': 5,
      'key': 'd5e9f0b2f51e4706a5126e38fbe78ccd'
    }
  }
  Vue.component('remote-script', { // vue动态生成script (在html中当成组件来用)
    render: function (createElement) {
      var self = this
      return createElement('script', {
        attrs: {
          type: 'text/javascript',
          src: this.src
        },
        on: {
          load: function (event) {
            self.$emit('load', event)
          },
          error: function (event) {
            self.$emit('error', event)
          },
          readystatechange: function (event) {
            if (this.readyState === 'complete') {
              self.$emit('load', event)
            }
          }
        }
      })
    },
    props: {
      src: {
        type: String,
        required: true
      }
    }
  })
  export default {
    mounted () {
      this.initecharts()
    },
    methods: {
      // 获取随机颜色
      randomColor () {
        let bgColor = ['#13CE66', '#52B7FD', '#FF7453', '#2CC98F', '#38B54A', '#919BFF']
        let index = parseInt(Math.random() * bgColor.length)
        return bgColor[index]
      },
      // 获取echarts图表
      initecharts () {
        var chartDom = document.getElementById('echarts')
        var myChart = echarts.init(chartDom)
        var option
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['蒸发量', '降水量', '平均温度']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '水量',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} ml'
              }
            },
            {
              type: 'value',
              name: '温度',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [
            {
              name: '蒸发量',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: '降水量',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '平均温度',
              type: 'line',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
          ]
        }
        option && myChart.setOption(option)

        // this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
        //  this.chartBar.setOption(option)
        //  window.addEventListener('resize', () => {
        //   this.chartBar.resize()
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mod-home {
    line-height: 1.5;
  }
  .item{
    display: inline-block;
  }
  .el-button{
    margin: 3px;
  }
  .classContainer{
    height: 300px;
    overflow: auto;
  }
  .btn{
    display: inline-block;
    padding: 15px 20px;
    background: #2CC98F;
    color: #fff;
    border-radius: 5px;
    margin: 10px;
  }
</style>

