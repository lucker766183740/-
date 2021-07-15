// 1、引入依赖脚本
import * as echarts from '../../../echars/ec-canvas/echarts';
import listen , { appUrl} from '../../../utils/request'
import {formatYearMonthDay} from '../../../utils/util'
const App = getApp()
var chart = null
var interestData = null
var filshData = null
// 获取手机像素比
const getPixelRatio = () => {
  let pixelRatio = 0
  wx.getSystemInfo({
    success: function (res) {
      pixelRatio = res.pixelRatio
    },
    fail: function () {
      pixelRatio = 0
    }
  })
  return pixelRatio
}
var dpt = getPixelRatio()
// 听书时长
var  option = {
  title:[{
  text:'',
  left:40,
  top:0,
  icon:'image::///image/icon/quanzi.png',
  textStyle:{
    image:'image::///image/icon/quanzi.png',
    rich:{
      a:{
        image:'image::///image/icon/quanzi.png',
      }
    }
  }
},
{
  subtext:``,
  left:200,
  top:-5
}],
tooltip: {
  trigger: 'axis',
  axisPointer: {
      type: 'cross',
      label: {
          backgroundColor: '#287EF7'
      }
  }
},
grid: {
  left: 20,
  right: 20,
  bottom: 15,
  top: 40,
  containLabel: true,
},
xAxis: [
  {
    type: 'category',
    axisTick: { show:false },
    data: [],
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    },
    axisLabel: {
      show: true,                               
      textStyle: {
         color: '#555'
      },
      rotate:45
  }
  }
],
yAxis: [
  {
    type: 'value',
    axisTick: { show: false },
    data: [],
    splitLine:{//分割线
      show:true,
      lineStyle:{
        color:'#ddd',
        type:'dotted'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLabel: {
      color: '#666'
    }
  }
],
series: [
  {
    name: '数据',
    data: [],
    type: 'bar',
    barWidth:30,
    itemStyle: {
      normal: {
        color: '#287EF7'
      }
    }
  },
]
};
function initChart(canvas , width ,height){
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpt
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart
}
// 听书完成量
var  option2 = {
  title:{
  text:'',
  left:40,
  top:0,
  icon:'image::///image/icon/quanzi.png',
  textStyle:{
    image:'image::///image/icon/quanzi.png',
    rich:{
      a:{
        image:'image::///image/icon/quanzi.png',
      }
    }
  }
},
tooltip: {
  trigger: 'axis',
  axisPointer: {
      type: 'cross',
      label: {
          backgroundColor: '#287EF7'
      }
  }
},
grid: {
  left: 20,
  right: 20,
  bottom: 15,
  top: 40,
  containLabel: true,
},
xAxis: [
  {
    type: 'category',
    axisTick: { show:false },
    data: [],
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    },
    axisLabel: {
      show: true,                               
      textStyle: {
         color: '#555'
      },
      rotate:45
  }
  }



],
yAxis: [
  {
    type: 'value',
    axisTick: { show: false },
    data: [],
    splitLine:{//分割线
      show:true,
      lineStyle:{
        color:'#ddd',
        type:'dotted'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLabel: {
      color: '#666'
    }
  }
],
series: [
  {
    name: '数据',
    data: [],
    type: 'bar',
    barWidth:30,
    itemStyle: {
      normal: {
        color: '#287EF7'
      }
    }
  },
]
};
function filsh(canvas , width ,height){
  filshData = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpt
  });
  canvas.setChart(filshData);
  filshData.setOption(option2);
  return filshData
}
// 听书爱好
var option3 = {
  title:{
  text:'',
  left:40,
  top:0,
  icon:'image::///image/icon/quanzi.png',
  textStyle:{
    image:'image::///image/icon/quanzi.png',
    rich:{
      a:{
        image:'image::///image/icon/quanzi.png',
      }
    }
  }
},
tooltip: {
  trigger: 'axis',
  axisPointer: {
      type: 'cross',
      label: {
          backgroundColor: '#287EF7'
      }
  }
},
grid: {
  left: 20,
  right: 20,
  bottom: 15,
  top: 40,
  containLabel: true,
},
xAxis: [
  {
    type: 'category',
    axisTick: { show:false },
    data: [],
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    },
    axisLabel: {
      show: true,                               
      textStyle: {
         color: '#555'
      },
      rotate:45
  }
  }
],
yAxis: [
  {
    type: 'value',
    axisTick: { show: false },
    data: [],
    splitLine:{//分割线
      show:true,
      lineStyle:{
        color:'#ddd',
        type:'dotted'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLabel: {
      color: '#666'
    }
  }
],
series: [
  {
    name: '数据',
    data: [],
    type: 'bar',
    barWidth:30,
    itemStyle: {
      normal: {
        color: '#287EF7'
      }
    }
  },
]
};
function interest(canvas , width ,height){
  interestData = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpt
  });
  canvas.setChart(interestData);
  interestData.setOption(option3);
  return interestData
}

Page({
  data: {
    startTime:'',
    endTime:'',
    ecData:true,
    interData:true,
    filData:true,
    ec: {
     onInit:initChart
      }, // 3、将数据放入到里面
      interest:{
        onInit:interest
      },
      filsh:{
        onInit:filsh
      }
    },
    onReady(){
      this.updateEchartsData()
      this.listeninterest()
      this.listenFilsh()
    },
    
    // 听书时长统计（参数 userId：''，startTime："开始时间"，endTime：结束时间）
    updateEchartsData(){
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
      let url = appUrl + 'statistics/readTime'
      let userId = App.globalData.userId
      let weekTime = 1000*60*60*24*7 //一周时间的时间戳,默认展示一周的数据
      let dayTime = 1000*60*60*24 //一天的时间
      let startTime = this.data.startTime ? this.data.startTime : formatYearMonthDay(new Date() - weekTime)
      let endTime = this.data.endTime ? this.data.endTime : formatYearMonthDay(new Date() - dayTime)
      // let startTime = this.data.startTime ? this.data.startTime : '2020-06-30'
      // let endTime = this.data.endTime ? this.data.endTime : '2020-07-10'  //有数据的区间
      this.setData({startTime,endTime})
    listen.request_n_get(url, {
        userId,
        startTime,
        endTime
      }, ({ data }) => {
        wx.hideLoading();
        console.log("听书时长统计:", data);
        let seriesData = data.data.seriesData;
        let yData = data.data.yData;
        if (yData.length == 0) { this.setData({ ecData: false }); } else { this.setData({ ecData: true }); }
        let arr = [];
        //将年月日的时间转换为月和日的时间格式
        yData.forEach(v => {
          //  let _arr = v.split('-')
          //  arr.push(_arr[1] + '-' + _arr[2])
          let _arr = v.substring(5, 10);
          arr.push(_arr);
        });
        option.xAxis[0].data = arr;
        option.series[0].data = seriesData;
        option.title[0].text = data.data.title;
        option.title[1].subtext = `每日听书时长${data.data.total}小时`;
        chart.setOption(option, true);
      })
    },
    // 听书爱好统计（参数 userId：''，startTime："开始时间"，endTime：结束时间）
    listeninterest(){
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
      let url = appUrl + 'statistics/readHobby'
      let userId = App.globalData.userId
      let startTime = this.data.startTime
      let endTime = this.data.endTime
     listen.request_n_get(url,{
       userId,
       startTime,
       endTime
     },({data})=>{
       wx.hideLoading()
       console.log('听书爱好统计:',data)
       let seriesData = data.data.seriesData
       let yData = data.data.yData
       if(yData.length == 0){this.setData({interData:false})}else{this.setData({interData:true})}

       option3.xAxis[0].data = yData 
       option3.series[0].data = seriesData
       option3.title.text = data.data.title
       interestData.setOption(option3,true)
    })
  },
  // 听书完成量统计（参数 userId：''，startTime："开始时间2020-06"，endTime：结束时间2020-07）
  listenFilsh(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let url = appUrl + 'statistics/readComplete'
    let userId = App.globalData.userId
    let startTime = this.data.startTime
    let endTime = this.data.endTime  //有数据的区间
    startTime = startTime.substring(0,7)
    endTime = endTime.substring(0,7)
   listen.request_n_get(url,{
     userId,
     startTime,
     endTime
   },({data})=>{
     wx.hideLoading()
     console.log("听书完成量统计:",data)
     let seriesData = data.data.seriesData
     let yData = data.data.yData
     let arr = []
     if(yData.length == 0){this.setData({filData:false});}else{this.setData({filData:true})}
    yData.forEach(v=>{
      arr.push(v.substring(5,7)+'月')
    })
     option2.xAxis[0].data = arr 
     option2.series[0].data = seriesData
     option2.title.text = data.data.title
     filshData.setOption(option2,true)
   })
  },
  // 用户选择查询的起始时间
  bindstartTime(e){
    let startTime = e.detail.value
   this.setData({startTime})
   this.updateEchartsData()
   this.listeninterest()
   this.listenFilsh()
  },
  // 用户选择查询的结束时间
  bindendTime(e){
    let endTime = e.detail.value
    this.setData({endTime})
    this.updateEchartsData()
    this.listeninterest()
    this.listenFilsh()
  },
})
