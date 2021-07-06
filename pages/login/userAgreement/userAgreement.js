// pages/home/swiperTopic/swiperTopic.js
import listen from '../../../utils/request'
var WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[
      "<p>用户隐私</p>"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(options)
  },
  getdata(options){
  //   wx.showLoading({
  //     title: '加载中...',
  //     mask:true
  //   })
    var _this =this;
    let userAgreement = options.userAgreement
    let data = {}
    if(userAgreement == 1){
        data.content = "<p>用户隐私</p>"
    }else if(userAgreement == 2){
      data.content = "<p>隐私协议</p>"
    }
  //   let id = options.id
  //   let url = listen.appUrl + 'carousel/app/info'
  //   listen.request_n_get(url,{ id },res=>{
  //     wx.hideLoading()
  //     if(res.data.code == 0){
  //       let data = res.data.data
        data.content = data.content.replace(/2em/g,"2.5rem")
        WxParse.wxParse('article', 'html', data.content, _this, 15);
        this.setData({data})
  //       wx.setNavigationBarTitle({
  //         title: data.name,
  //       })
  //     }
  //     console.log(res)
  //   })
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