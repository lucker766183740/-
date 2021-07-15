
import listen from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    integral:0, // 积分
    rank:'书童',  //段位
    width:'50%', // 任务完成进度 
    countScore:0 // 今日累计积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getintegral()
    this.getintegralRule()
  },
    //获取总积分
    getintegral(){
      let url = listen.appUrl + 'integralManagement/api/totalIntegral'
      listen.request_n_get(url,{},res=>{
        if(res.data.code == 0){
        let integral = res.data.data.totalIntegral
         let rank = getApp().rankLevel(integral) 
          this.setData({integral , rank})
        }
      })
    },
    //获取积分任务
    getintegralRule(){
      let getDate = new Date()
      let date = getDate.getFullYear()+'-'+(getDate.getMonth()+1) + '-' + getDate.getDate()
      let url = listen.appUrl + 'integralManagement/api/dayIntegral/'+ date
      let countScore = 0
      listen.request_n_get( url , {} , res =>{
        if(res.data.code == 0){
          let list = res.data.data
          list.forEach((v,i)=>{
            // 所有任务以获得积分的和
            countScore+= v.completeScore
            if(v.dailyLimit != 0 ){
              //每一个任务的总积分
              v._maxScore = v.score * v.dailyLimit 
              //进度条百分比
              v._progress = (v.completeScore / v._maxScore)*100 + '%' 
            }
            // 计算有误时显示 max
            if(v._maxScore == 0 || v.dailyLimit == 0){ 
              v._maxScore = 'max'
              // 100积分就算完成
              v._progress = v.completeScore + '%'
            }
            if(v.subdata != null ){
              v.subdata = JSON.parse(v.subdata)
            }
          })
          this.setData({ list  , countScore})
        }
      })
    },
    //子组件返回值
    triggerEvent(e){
      this.getintegral()
      this.getintegralRule()
    },
    // 点击未完成 、已完成 跳转至相关页面
    bindnavgetorOther(e){
      let list = this.data.list
      let type = e.currentTarget.dataset.type
      list.forEach(v=>{
        if(v._progress != '100%'){
          if(type == 'SignIn' && v.type == 'SignIn'){//签到
            let url = '../integral/integral'
            this.nav(url , false)
          }
          if(type == 'ReadingTime' && v.type == 'ReadingTime'){//收听时长
            let url = '../../circle/circle'
            this.nav(url , true)
          }
          if(type == 'DailyChapters' && v.type == 'DailyChapters'){ //章节 / 每日
            let url = '../../circle/circle'
            this.nav(url , true)
          }
          if(type == 'BookListTotal' && v.type == 'BookListTotal'){ // 数目 /累计
            let url = '../../circle/circle'
            this.nav(url , true)
          }
          if(type == 'PostComment' && v.type == 'PostComment'){//发布评论
            let url = '../../channel/channel'
            this.nav(url , true)
          }
          if(type == 'PostCircleActivity' &&  v.type == 'PostCircleActivity'){//发布圈子动态
            let url = '../../channel/release/release'
            this.nav(url , false)
          }
          if(type ==  'FirstShareEveryDay' && v.type == 'FirstShareEveryDay'){//每日首次分享

          }
        }
      })
    },
    // 封装页面跳转方法
    nav(url , tabbar){
      if(tabbar){
        wx.switchTab({
          url: url,
        })
      }else{
        wx.redirectTo({
          url: url,
        })
      }
 
    },
    //跳转积分明细页面
    bindnavgetorPointsDetails(){
      let integral = this.data.integral
      let rank = this.data.rank
      wx.navigateTo({
        url: './PointsDetails/PointsDetails?integral=' + integral + '&rank=' +rank,
      })
    },
    //如何获取积分
    bindnavgetorintegral(){
      wx.navigateTo({
        url: './howGetIntegral/howGetIntegral',
      })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
onShow:function(){
  
},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})