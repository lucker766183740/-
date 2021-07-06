// pages/information/useContent/userContent.js
import listen , { appUrl } from '../../../utils/request'
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    followisshow:false,
    userList:[
      {id:null,num:0,name:'积分'},
      {id:null,num:0,name:'关注'},
      {id:null,num:'0',name:'粉丝'},
      {id:null,num:'0',name:'被赞与收藏'},
    ],
    userDetail:{},
    userPublishList:[],
    isbiji:true,
    isshoucang:false,
    page:1,
    limit:10,
    total:0,
    userdata:{},
    isshow:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options.othId = options.othId
    this.getuserDetailData(options.othId)
  },
//查询某用户信息详情（参数  searchUser：被查询用户id，userId："登录人id"）
  getuserDetailData(id){
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let  userPublishList = this.data.userPublishList
    let userId = App.globalData.userId
    let page = this.data.page
    let limit = this.data.limit
    let followisshow 
    if(userId == id ){  
      followisshow = false
      }else{
        followisshow = true
      }
    let url = appUrl + 'chatattention/user/userDetial'
    listen.request_n_get(url,{
      userId,searchUser:id,page,limit
    },({data})=>{
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      if(data.code == 0){
        console.log(data)
        let userDetail = data.data.data
      userDetail._rankLevel = getApp().rankLevel(userDetail.score)
      userDetail._haveAttention = data.data.haveAttention
      wx.setNavigationBarTitle({
        title: userDetail.username,
      })
      let userList = this.data.userList
      let userdata = {
        publishNum:userDetail.publishNum,
        likehNum:userDetail.likehNum,
        collectionNum:userDetail.collectionNum
      }
      userList.forEach(v=>{
        if(v.name == '积分'){v.id = userDetail.id; v.num = userDetail.score}
        if(v.name == '关注'){v.id = userDetail.id; v.num = userDetail.attentionNum}
        if(v.name == '粉丝'){v.id = userDetail.id; v.num = userDetail.fansNum}
        if(v.name == '被赞与收藏'){v.id = userDetail.id; v.num = userDetail.likeCollectionNum}
      })
      let _userPublishList = data.data.publishList.list
      let total = data.data.publishList.total
       _userPublishList.forEach((item,index)=>{
         if(item.topicName){item.topicName = (item.topicName.split(','))}
         if(item.topicId){ item.topicId = (item.topicId.split(','))}
         if(item.imageUrl){ item.imageUrl = (item.imageUrl.split(','))} 
         item._content = item.content 
         item._isshow = false
         if((item.content.length + item.topicName.toString().length) > 55){
           item._content = (item.content + item.topicName.toString()).slice(0,55)
           item._isopen = true
         }else{
           item._isopen = false
         }
         // if(item.imageUrl){ item.imageUrl = ["https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg"]}         
   })
   userPublishList.push(..._userPublishList)
      this.setData({
        userDetail,
        userList,
        userPublishList,
        total,
        userdata,
        followisshow
      })
      }else{
        wx.showToast({
          title: data.msg,
          icon:'none'
        })
      }
      
    })
  },
  //点击关注、取消关注 其他用户
  bindgzotheruser(e){
    let type = 0
    let isfollow
    let id = e.currentTarget.dataset.othid
    let userDetail = this.data.userDetail
      userDetail.haveAttention = !userDetail.haveAttention
      isfollow = userDetail.haveAttention
    App.userFollow(id,type,isfollow)
    this.setData({userDetail})
  },
  // 查看用户头像大图
  bindSeeLogimg(e){
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      urls:[url]
    })
  },
  // 笔记收藏切换
  clickisActive1(){
    this.setData({
      isshoucang:false,
      isbiji:true
    })
  },
  clickisActive2(){
    this.setData({
      isshoucang:true,
      isbiji:false
    })
  },
  bindnavgetorsearch(){
    wx.navigateTo({
      url: '/pages/home/search/search',
    })
  },
  // icon小图标跳转至tabbar消息页
  bindnavgetinformations(){
    wx.switchTab({
      url: '/pages/information/information',
    })
  },
  // type = 1跳转积分 、2 粉丝 、3 关注页面 

  bindnavgetdetails(e){
    let type = e.currentTarget.dataset.type
    let userId = e.currentTarget.dataset.userid
    let url 
    if(type == 1){
      if(userId != App.globalData.userId){return;}
      url = '../../myself/integral/integral?type=' + type
    }else if(type == 2){
      url = '../../myself/myfollowAndfans/myfollowAndfans?type=' + type +'&userId=' +userId
    }else if(type == 3){
      url = '../../myself/myfollowAndfans/myfollowAndfans?type=' +type + '&userId=' + userId
    }else if(type == 4){
      this.setData({isshow:'isshow'})
    }
    App.haveUserToken(url)
  },
  //获取子组件传参
  triggerEvent(e){
    let  isshow  = e.detail.isshow
    this.setData({isshow:''})
  },
  bindlikeAndcollectionishide(){
    this.setData({isshow:''})
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
    this.getuserDetailData(this.options.othId)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = this.data.page
    let limit = this.data.limit
    let total = this.data.total
    if( page*limit <= total ){
      page++
      this.setData({page})
    this.getuserDetailData(this.options.othId)
    }else{
      wx.showToast({
        title: '没有更多了~',
        icon:'none'
      })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})