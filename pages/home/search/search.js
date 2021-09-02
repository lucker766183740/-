// pages/home/search/search.js
import listen , { appUrl } from '../../../utils/request'
const App = getApp()
Page({
startPageX : 0,
currentView:0,
  /**
   * 页面的初始数据
   */
  data: {
    searchTitle:['图书' ,'用户' ],
    toView:'card_0',
    isactive:'activeborder',
    isindex:0,
    value:'',
    bookList:[],
    userList:[],
    page:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = options.page
    this.setData({page})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  // 用户输入事件
  bindinput(e){
    let value = e.detail.value
    this.setData({value:value.trim()})
  },
  touchstart(e){
    this.startPageX = e.changedTouches[0].pageX
  },
  touchend(e){
    let moveX = e.changedTouches[0].pageX - this.startPageX
    let maxPage = this.data.searchTitle.length - 1
    if( Math.abs(moveX) >= 150 ){
      if (moveX > 0) {
        this.currentView = this.currentView != 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView != maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({toView:`card_${this.currentView}`,isindex:this.currentView})
  },
  //listen/booklist/app/searchBook;//搜索接口（参数  title：搜索关键字）
  bindsearchgetData(){
    wx.showLoading({
      title: '搜索中...',
      mask:true
    })
    let value = this.data.value 
    let url = appUrl + 'booklist/app/searchBook?title=' + value
    let isindex = this.data.isindex
    listen.request_n_get(url,{},({data})=>{
      wx.hideLoading()
     let bookList = data.data.bookList
     let userList = data.data.userList
    //  if(bookList.length == 0 && isindex == 0){
    //    wx.showToast({
    //      title: `没有匹配${value}相关的图书`,
    //      icon:'none'
    //    })
    //  }
      this.setData({userList , bookList})
    })
  },
  // 切换图书和用户选现卡
  classcheage(e){
    let bookList = this.data.bookList
    let userList = this.data.userList
    let value = this.data.value
    let index = e.currentTarget.dataset.isindex
    // if(index == 0 && bookList.length == 0){
    //   wx.showToast({
    //     title: `没有匹配${value}相关的图书`,
    //     icon:'none'
    //   })
    // }
    // if(index == 1 && userList.length == 0){
    //   wx.showToast({
    //     title: `没有匹配${value}相关的用户`,
    //     icon:'none'
    //   })
    // }
    this.data.searchTitle.forEach((v,i)=>{
      if(index === i ){
        this.setData({
          isindex:index,
          toView:`card_${index}`
        })
      }
    })

  },
  // 点击图书图片跳转
  bindnavtorDetail(e){
    let id = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: '/pages/circle/details/details?id=' + id,
    })
  },
  //点击用户跳转
  bindnavtoruserdetail(e){
    let othId =  e.currentTarget.dataset.othid
    wx.navigateTo({
      url: '/pages/information/useContent/userContent?othId=' + othId
    })
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