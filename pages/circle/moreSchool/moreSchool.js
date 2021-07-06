// pages/circle/moreSchool/moreSchool.js
import listen , { appUrl } from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getbooklist(options)
    wx.setNavigationBarTitle({
      title: options.title,
    })
  },
  getbooklist(options){
    let channelId = options.channelid
    let url = appUrl + 'booklist/app/list?channelId=' + channelId
    listen.request_n_get(url,{},({data})=>{
      this.setData({bookList:data.data})
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