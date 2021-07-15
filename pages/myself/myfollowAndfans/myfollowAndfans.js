// pages/myself/myfollowAndfans/myfollowAndfans.js
import listen from '../../../utils/request'
const App = getApp()
Page({
  startPageX : 0,
  currentView:0,
  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    pagetype:0,
    type:0,
    title:['用户','话题'],
    toView:'group_0'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    // 用户关注，积分，粉丝
    /** 
     * 
     * @param {*} type = 1 积分 ； 2 关注 ； 3 粉丝
     */
    this.options = options
    this.getdata(options)
  },
  // 获取数据
  getdata(options){
    let pagetype = options.type
    let userId = options.userId
    let title
    let type = this.data.type
    let url
      // type =0 关注话题 ; type =1 关注用户
    this.setData({pagetype})
    if(pagetype == 1){
      title = '积分'
    }else if(pagetype == 2){
      title = '关注'
      url = listen.appUrl + 'chatattention/attentionList?type=' + type + '&userId=' + userId
    }else if( pagetype == 3 ){
      title = '粉丝'
      // url =  listen.appUrl + 'notice/applet/typeList?type=2&receiverId=' + userId
      url = listen.appUrl + 'chatattention/fansList?userId=' +userId
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    listen.request_n_get(url,{},(res)=>{
      if(res.data.code == 0){
      let List = res.data.data.list
      this.setData({dataList:List})
      }
    }) 
  },
  // 点击跳转用户详情页
  binduserdetais(e){
    let type = this.data.type
    let othId = e.currentTarget.dataset.othid
    let url
    if(type == 0){
       url = '../../information/useContent/userContent?othId=' + othId
    }else if(type == 1){
      url = '../../channel/teamDetails/teamDetails?id=' + othId
    }
    App.haveUserToken(url)
  },
  // 点击激活title选项
  bindtitleactive(e){
    let tname = e.currentTarget.dataset.tname
    this.setData({type:tname})
    this.getdata(this.options)
  },
  bindstart(e){
    this.startPageX = e.changedTouches[0].pageX
  },
  bindend(e){
    let moveX = e.changedTouches[0].pageX - this.startPageX
    let maxPage = this.data.title.length - 1
    if( Math.abs(moveX) >= 100 ){
      if (moveX > 0) {
        this.currentView = this.currentView != 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView != maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({toView:`group_${this.currentView}`,type:this.currentView})
    this.getdata(this.options)
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