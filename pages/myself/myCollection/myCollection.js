// pages/myself/myCollection/myCollection.js
import listen,{ appUrl } from '../../../utils/request'
let APP = getApp() 
Page({
  startpageX:0,
  page:0,
  data: {
    toView:'view_0',
    titleList:['图书','章节','圈子动态'],
    isindex:0,
    bookList:[]
  },
  touchstart(e){
    this.startpageX = e.changedTouches[0].pageX
  },
  touchend(e){
    let  moveX = e.changedTouches[0].pageX - this.startpageX
    let maxPage = this.data.titleList.length - 1
    if(Math.abs(moveX) >= 100){
      if(moveX > 0){
        this.page = this.page != 0 ? this.page - 1 : 0
      }else{
        this.page = this.page != maxPage ? this.page + 1 : maxPage
      }
    }
    this.getCollectionData(this.page)
    this.setData({toView:`view_${this.page}`,isindex:this.page})
  },
  // 点击title
  bindisactive(e){
    let index = e.currentTarget.dataset.isindex
    this.setData({
      isindex:index,
      toView:`view_${index}`
    })
    this.getCollectionData(index)

  },
  // 获取我的收藏数据列表
  getCollectionData(type){
      // type:  0 图书,1 章节, 2 圈子动态
    let userId = APP.globalData.userId
    let url = appUrl + 'collection/app/collectList?userId=' + userId + '&type=' + type
    listen.request_n_get(url,{},({data})=>{
      let bookList = data.data
      this.setData({bookList})
      console.log(bookList )
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectionData(this.data.isindex)
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