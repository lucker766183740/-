// pages/channel/scenery/scenery.js
import listen , { appUrl } from '../../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPublishList:[],
    scenData:[],
    haveAttention:false,
    bgactive:false,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options
    this.gettopicData(options)
  },
  // 页面滚动事件
  onPageScroll(e){
    if(e.scrollTop > 140){
      this.setData({bgactive:true})
    }else{
      this.setData({bgactive:false})
    }
  },
  // 获取页面传参的话题详情
  gettopicData(options){
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let topicId = options.topicId
   let url = appUrl + 'topic/app/info?id=' + topicId + '&userId=' + App.globalData.userId
   listen.request_n_get(url,{},({data})=>{
     wx.hideLoading()
     wx.hideNavigationBarLoading()
     wx.stopPullDownRefresh()
     let scenData = [data.data]
     let haveAttention = scenData[0].haveAttention
     this.setData({scenData,haveAttention})
     let _userPublishList =data.data.publishList
    //  topicName / topicId / imageUrl
     _userPublishList.forEach((item,index)=>{
       if(item.topicName){item.topicName = (item.topicName.split(','))}
       if(item.imageUrl){ item.imageUrl = (item.imageUrl.split(','))} 
       if(item.topicId){ item.topicId = (item.topicId.split(','))}
       item._title = item.title 
       item._isshow = false
       if((item.title.length + item.topicName.toString().length) > 55){
         item._title = (item.title + item.topicName.toString()).slice(0,55)
         item._isopen = true
       }else{
         item._isopen = false
       }
       // if(item.imageUrl){ item.imageUrl = ["https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg"]}         
     })
   this.setData({userPublishList:_userPublishList})
   })

  },
  bindSeeLogimg(e){
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url],
    })
  },
  // 点击返回icon
  bingdnavgeback(){
    wx.navigateBack({
      delta:1
    })
  },
  //点击关注、取消关注
  bindgzhave(){
    let scenData = this.data.scenData
    let id = scenData[0].id
    let type = 1 //话题小组：1 ，用户 0  
    let haveAttention = this.data.haveAttention
    scenData.forEach(v=>{
      v.haveAttention = !v.haveAttention
      haveAttention = v.haveAttention
    })
    this.setData({haveAttention})
    App.userFollow(id,type,haveAttention)

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
    this.gettopicData(this.options)
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