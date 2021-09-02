// pages/home/circle/circle.js
import listen, { appUrl } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:true,
    isactive:'left-childactive',
    list:[],
    rightList:[],
    currentindex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 左侧菜单数据
  getDataList(){
    let itemId = getApp().globalData.itemId
    let url = appUrl + '/channel/app/list'
    listen.request_n_get(url,{
      type:0
    },({data})=>{
      this.setData({      list:data.data   })
      if(itemId){
        let url = appUrl + 'channel/app/rightList?id=' + itemId
        listen.request_n_get(url,{},({data})=>{
          this.setData({
            rightList:data.data,
            currentindex:itemId
          })
        })
      }else{
        this.defultRight(this.data.list[0].id)
        this.setData({currentindex:this.data.list[0].id})
      }
    })
  },
  // 右侧列表默认显示年纪
  defultRight(id){
    let url = appUrl + 'channel/app/rightList?id=' + id
    listen.request_n_get(url,{},({data})=>{
      // wx.hideLoading()
      this.setData({
        rightList:data.data,
      })
    })
  },
  // 点击选择左侧菜单
  bindactive(e){
    wx.showLoading({
      title:'加载中...',
      mask:true
    })
    let id = e.currentTarget.dataset.currentindex
    let url = appUrl + 'channel/app/rightList?id=' + id
    listen.request_n_get(url,{},({data})=>{
      wx.hideLoading()
      getApp().globalData.itemId = id
      this.setData({
        rightList:data.data,
        isactive:'left-childactive',
        currentindex:id
      })
    })
  },
  bindnavgetorsearch(){
    wx.navigateTo({
      url: '/pages/home/search/search',
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
    this.getDataList()
    getApp().getinformationsdataList().then( count =>{
      if(count > 0){
        wx.setTabBarBadge({
          index: 3,
          text:  count + ''
        })
      }else{
        wx.removeTabBarBadge({
          index: 3,
        })
      }
    })
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