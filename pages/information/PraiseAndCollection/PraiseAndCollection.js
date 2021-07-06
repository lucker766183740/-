// pages/information/PraiseAndCollection/PraiseAndCollection.js
import listen, { appUrl } from '../../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinforacontentData()
  },
  getinforacontentData(){
    let type = 1 //0、系统消息 1:赞 2:新增关注 3:评论与@ 4.收藏
    let url = appUrl + 'notice/applet/typeList?type=' + type + '&receiverId=' + App.globalData.userId
    listen.request_n_get(url,{},({data})=>{
      if(data.code == 0 && data.msg == 'success'){
      let List = data.data.list
      this.setData({List})
        // 修改状态消息已读
      App.userContentType(type)
      console.log('小程序赞/收藏/新增关注/评论与@消息列表：',data)
      }
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