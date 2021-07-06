// pages/myself/readlog/readlog.js
import listen , { appUrl } from '../../../utils/request'
let APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readlogList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getreadlogData()
  },
  // 获取用户收听记录的数据
  getreadlogData(){
    let userId = APP.globalData.userId
    let url = appUrl + 'readlog/app/getMyReadList?userId=' + userId
    listen.request_n_get(url,{},({data})=>{
      let readlogList = data.data
      this.setData({readlogList})
    })
  },
  // 跳转到播放页
  bindnavgetorAudio(e){
    let nowPlayaudio = e.currentTarget.dataset.nowplayaudio
    // 添加至播放列表
APP.addchapterplay(nowPlayaudio)
    wx.navigateTo({
      url: '/pages/home/audio/audio?nowPlayaudio=' + nowPlayaudio,
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