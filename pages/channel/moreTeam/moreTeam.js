// pages/channel/moreTeam/moreTeam.js
import listen , { appUrl }  from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'activeColor',
    Teamlist:[],
    page:1,
    limit:20,
    total:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.isActive == 2 ? '关注小组' : '听吧小组',
    })
    this.getDataList(options)
    this.options = options
  },
  ///点击关注按钮事件
  bindAttention(e){
    let AttenId = e.currentTarget.dataset.attenid
    let type = 1
    let Teamlist = this.data.Teamlist
    let isAtten 
    Teamlist.forEach(item=>{
      if(AttenId === item.id){
        item.haveAttention = !item.haveAttention
        isAtten = item.haveAttention
        if(item.haveAttention){
          item.attentionNum++
        }else{
          item.attentionNum > 0 ? item.attentionNum-- : item.attentionNum
        }
      }
    })
    getApp().userFollow(AttenId,type,isAtten)
    this.setData({Teamlist})
  },
  bindnacgetoruserDetails(e){
    let teamId = e.currentTarget.dataset.teamid
    wx.navigateTo({
      url: '/pages/channel/teamDetails/teamDetails?id=' + teamId,
    })
  },
  getDataList(options){
    wx.showNavigationBarLoading()
    wx.showLoading({
      title:'加载中...',
      mask:true
    })
    // options : 2 代表获取的是关注页面的数据
    let isActive = options.isActive
    let userId =  getApp().globalData.userId
    let url = appUrl + 'topicgroup/app/list'
    let page = this.data.page
    let limit = this.data.limit
    if(isActive == 2 ){
      url = appUrl + 'topicgroup/app/attentionList'
    }
    listen.request_n_get(url,{
      userId,page,limit
    },({data})=>{
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      let total = data.data.total
      let Teamlist = this.data.Teamlist
      Teamlist.push(...data.data.list)
      this.setData({Teamlist,total})
    })
  },
  // 页面滚动条触底事件
  onReachBottom(){
    let page = this.data.page
    let total = this.data.total
    let limit = this.data.limit
    if((page * limit) < total){
      page++
      this.setData({page})
      this.getDataList(this.options)
    }else{
      wx.showToast({
        title: '没有更多了~',
        icon:'none'
      })
    }
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
    this.getDataList(this.options)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})