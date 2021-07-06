// pages/myself/integral/PointsDetails/PointsDetails.js
import listen from '../../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      integral:0,
      rank:'秀才',
      page:1,
      total:0,
      limit:20,
      list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options
    this.getIntegralDetails(this.options)
  },
  //获取积分明细
  getIntegralDetails(options){
    let page = this.data.page
    let limit = this.data.limit
    let list = this.data.list
    let url = listen.appUrl + 'integraldetails/api/page'
    listen.request_n_get( url , {
      page , limit
    } , res =>{
      if(res.data.code == 0){
        let dataList = res.data.data.list
        let total = res.data.data.total
       if(dataList.length > 0 ){
         dataList.forEach(v=>{
          list.push( v )
         })
       }
        this.setData({ list , total })
      }
    })

    this.setData({integral:options.integral , rank : options.rank})

  },
  //如何获取积分
  bindnavgetorhowgetintegral(){
    wx.navigateTo({
      url: '../howGetIntegral/howGetIntegral',
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
  onShow: function () {

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
    let page = this.data.page
    let total = this.data.total
    let limit = this.data.limit
    page++
    this.setData({page})
    if(page > Math.ceil(total / limit) ){
      wx.showToast({
        title: '没有更多了~',
        icon:'none'
      })
    }else{
      this.getIntegralDetails(this.options)
    }
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