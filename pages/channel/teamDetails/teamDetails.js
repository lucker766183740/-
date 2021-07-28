// pages/channel/teamDetails/teamDetails.js
import  listen,{ appUrl, appurl } from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamDetails:{},
    bgactive:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options
    this.getTeamDetailsData(options)
  },
  // 页面滚动事件
  onPageScroll(e){
    if(e.scrollTop>140){
      this.setData({bgactive:true})
    }else{
      this.setData({bgactive:false})
    }
  },
  // 获取小队的详情数据以及数据处理
  getTeamDetailsData(options){
    wx.showNavigationBarLoading()
    wx.showLoading({
      title:'加载中...',
      mask:true
    })
    let teamId = options.id
    let userId = getApp().globalData.userId
    let url = appUrl + 'topicgroup/app/info?id=' + teamId +'&userId=' + userId
    listen.request_n_get(url,{},({data})=>{
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    //  let teamDetails = data.data
    //  this.setData({teamDetails})
     let teamDetails = data.data
     let _teamDetails = teamDetails.publishList
     // topicName / topicId / imageUrl
     console.log(data)
     _teamDetails.forEach((item,index)=>{
       if(item.topicName){item.topicName = (item.topicName.split(','))}
       if(item.topicId){ item.topicId = (item.topicId.split(','))}
       if(item.imageUrl){ item.imageUrl = (item.imageUrl.split(','))} 
       item._title = item.title
       item._isshow = false
       if( item.topicName && (item.title.length + item.topicName.toString().length) > 55){
         item._title = (item.content + item.topicName.toString()).slice(0,55)
         item._isopen = true
       }else{
         item._isopen = false
       }
       // if(item.imageUrl){ item.imageUrl = ["https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg"]}         
     })
   this.setData({teamDetails})
    })
  },
  bindSeeLogimg(e){
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url],
    })
  },
  // 点击关注，取消关住
  bindAttention(e){
    let that = this
    let teamDetails = this.data.teamDetails
    teamDetails.haveAttention = !teamDetails.haveAttention
    if(teamDetails.haveAttention){
      if(teamDetails.attentionNum >= 9999){return}
      teamDetails.attentionNum++
    }else{
      teamDetails.attentionNum--
    }
    let AttentId = e.currentTarget.dataset.attentid
    let type = 1
    let isAttention = teamDetails.haveAttention
    getApp().userFollow(AttentId , type , isAttention)
    that.setData({teamDetails})
  },
  bingdnavgeback(){
    wx.navigateBack({
      delta:1
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
    this.getTeamDetailsData(this.options)
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