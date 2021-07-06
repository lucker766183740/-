// pages/information/informationDetails/informationDetails.js
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
    this.getdata()
  },
  //获取系统用户发送的消息详情 --- 后期修改为页面传Id查询
  getdata(){
    let url = appUrl + 'notice/applet/list'
    listen.request_n_get(url,{},({data})=>{
      if(data.code == 0 && data.msg == 'success'){
      let List = data.data.list
      this.setData({List})
      console.log('小程序推送消息详情列表：' , List)
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
    // 修改消息状态
    App.userContentType(0)
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