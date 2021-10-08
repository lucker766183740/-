// pages/channel/userDetails/Moreusercomment/Moreusercomment.js
import listen from '../../../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    limit:7,
    userDetail:{},
    replay:[],
    value:'',
    commentList:{},
    touserName:'',
    total:0,
    height:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options
    this.getMoreusercomment(options.commentId)
    // this.if_ishide()
  },
// 获取更多回复评论
getMoreusercomment(commentId){
  wx.showNavigationBarLoading()
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  let userId = App.globalData.userId
  let page = this.properties.page
  let limit = this.properties.limit
  let url = listen.appUrl + 'comemntreply/app/list'
   listen.request_n_get(url,{
    userId,commentId,page,limit
  },({data})=>{
    wx.hideLoading()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
    let userDetail = data.data.data
    let replay = this.data.replay
    replay.push(...data.data.list.list) 
    let total = data.data.list.total
    replay.forEach(v=>{
      console.log(v.content.length)
      v.if_ishide = false
      if(v.content.length > 33){
        v.if_ishide = true
        v._content = v.content.substr(0,33)
      }
    })
    wx.setNavigationBarTitle({
      title: `${userDetail.userName}的评论`,
    })
    // console.log('评论回复',data )
    this.setData({replay,userDetail,total})
        })
},
// 评论喜欢
bindLike(e){
  let commentId = e.currentTarget.dataset.commentid
  let creator = e.currentTarget.dataset.creator

  let type = 0
  let userDetail = this.data.userDetail
  let islike = !userDetail.haveLike
  userDetail.haveLike = islike
  this.setData({userDetail})
  App.userComment(commentId , type , islike , creator , userDetail.informationId)
},
// 评论回复喜欢
bindotherLike(e){
  let commentId = e.currentTarget.dataset.commentid
  let creator = e.currentTarget.dataset.creator
  let type = 1
  let replay = this.data.replay
  let islike = null
  let informationId = null
  replay.forEach(v=>{
    if(commentId === v.id){
      islike = !v.haveLike
      v.haveLike = islike
      informationId = v.informationid
    }
  }) 
  App.userComment(commentId , type , islike , creator ,informationId)
  this.setData({replay})
},
bindfocus(e){
  let height = e.detail.height;
  this.setData({height})
},
bindblur(){
  this.setData({height:0})
},
//回复当前发表评论的人
bindHFthiscircle(){
  let commentList = this.data.commentList
  let userDetail = this.data.userDetail
  commentList.commentId = ''
  this.setData({commentList , touserName:userDetail.userName})
},
// 点击发表评论
bindfabiao(){
  let commentList = this.data.commentList
  let userDetail = this.data.userDetail
  let type = 0 //0：评论回复 - 1：评论
  let value = this.data.value
  let commentId = commentList.commentId //评论id
  let informationId = commentList.informationId //信息id
  let touserName = commentList.touserName 
  let fromUserId = commentList.fromUserId //登录用户id
  let parentId =commentList.parentId //评论父级ID
  // let status = 0
  let toUserId = commentList.toUserId  //目标用户id
  if(!commentList.commentId){
     commentId = userDetail.id//评论id
     informationId = userDetail.informationId //信息id
     touserName = userDetail.userName
     fromUserId = App.globalData.userId //登录用户id
     parentId = 0  //评论父级ID
    // let status = 0
     toUserId = userDetail.creator //目标用户id
  }
  if(value.trim()){
    App.userPublishcomment(type,value,informationId,commentId,fromUserId, parentId, toUserId)
    this.setData({value:''})
   }else{
    wx.showToast({
      title: '评论内容不能为空',
      icon:'none'
    })
  }
},
// input事件获取value
bindinput(e){
  let { value } = e.detail
  this.setData({value})
},

// 点击回复评论
bindothercontent(e){
  let commentId = e.currentTarget.dataset.commentid//评论id
  let informationId = e.currentTarget.dataset.informationid //信息id
  let touserName = e.currentTarget.dataset.username
  let fromUserId = App.globalData.userId //登录用户id
  let parentId = e.currentTarget.dataset.parentid  //评论父级ID
  // let status = 0
  let toUserId=e.currentTarget.dataset.touserid //目标用户id
  let commentList = {commentId,informationId,fromUserId,parentId,touserName,toUserId}
  this.setData({commentList,touserName})
},
bindnavgetor(e){
  let creator = e.currentTarget.dataset.creator
  wx.navigateTo({
    url: '/pages/information/useContent/userContent?othId=' + creator,
  })
},
//判断文字显示隐藏
// if_ishide(){
//     let that = this
//     let replay = that.data.replay
//     let query = wx.createSelectorQuery()
//     wx.showLoading({
//       title: '加载中...',
//     })
//     setTimeout(() => {
//       query.selectAll('.myintro').boundingClientRect(function(rect){
//         if(rect){
//           rect.forEach((v,i)=>{
//             console.log(v)
//             if(v.height > 40){
//               replay[i].if_ishide = true
//             }else{
//               replay[i].if_ishide = false
//             }
//           })
//         }
//         that.setData({replay})
//         wx.hideLoading()
//       }).exec()
//     }, 500);
//   },
    //点去切换文字多行显示 、 隐藏
    bindChangeis_isshow(e){
      let { index } = e.currentTarget.dataset
      let replay = this.data.replay
      replay[index].if_ishide = !replay[index].if_ishide
      this.setData({replay})
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
    this.setData({replay:[],userDetail:{},total:0})
    this.getMoreusercomment(this.options.commentId)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = this.data.page
    let limit = this.data.limit
    let total = this.data.total
    if( page * limit <= total){
      page++
      this.setData({page})
    this.getMoreusercomment(this.options.commentId)
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