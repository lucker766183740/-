// pages/channel/userDetails/userDetails.js
import listen , { appUrl }  from '../../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetailsList:[],
    userCommentList:[],
    focustext:'', //获取焦点时使用的css样式
    isshowFabiao:'', //发表按钮显示
    fabiao:'', //发表按钮隐藏
    value:'', //用户输入的内容
    type:1, //用于区分评论回复
    comment:{},//保存子组件传递的评论相关参数
    ishideMoreComment:true, //是否隐藏更多评论
    _MoreComment:true,
    page:1,
    limit:15,
    total:0,
    replay:[],
    inputtype:'text',
    height:0,
    userId:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({userId:App.globalData.userId})
    this.options = options
    this.getuserDetailsData(options)
    this.getusercommentData(options)
  },
  // 获取用户发布详细信息
  getuserDetailsData(options){
    let id = options.id
    let userId = options.userId
    let url = appUrl + 'informationpublish/app/info?id=' + id +'&userId=' + userId
    listen.request_n_get(url,{},({data})=>{
      let res = data.data
      let userDetailsList = []
      if(res.topicName){res.topicName = (res.topicName.split(','))}
      if(res.topicId){ res.topicId = (res.topicId.split(','))}
      if(res.imageUrl){ res.imageUrl = (res.imageUrl.split(','))} 
      userDetailsList.push(res)
      this.setData({userDetailsList})
    })
  },
  // 获取用户评论详细信息
  getusercommentData(options){
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let userId = options.userId
    let Id = options.id
    let comment = this.data.comment
    let tenantCode = getApp().globalData.tenantCode
    let url = appUrl + 'comment/app/list'
    let page = this.data.page
    let limit = this.data.limit
  listen.request_n_get(url,{
      informationId:Id,userId,tenantCode,page,limit
    },({data})=>{
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      let userCommentList = this.data.userCommentList
      let _userCommentList = data.data.list
      let total = data.data.total
      // if(_userCommentList.length<10){this.setData({ishideMoreComment:false})}
      // if(this.data._MoreComment){ _userCommentList = _userCommentList.slice(0,10)}
      _userCommentList.forEach((item,index)=>{
        // this.getMoreusercomment(item.id)
          if(item.replay.list.length >= 1 ){
            item._showTextMore = true
            item._isshow = true
            if(comment.id === item.id){
              item._isshow = comment._isshow
            }
            // if(item._isshow){item.replay.list = item.replay.list.slice(0,10)}
          }
        })
        userCommentList.push(..._userCommentList)
      this.setData({userCommentList,total})
    })
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
      let replay = data.data.list
      this.setData({replay})
          })
  },
  bindSeeLogimg(e){
    let allUrl = e.currentTarget.dataset.allurl
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      current:url,
      urls: allUrl,
    })
  },
  // 回退上一级页面按钮
  bingnavgetorblock(){
    wx.navigateBack({
      delta:1
    })
   },
  //  评论框获取焦点时
  bindfocus(e){
    let height = e.detail.height;
    this.setData({
      inputtype:'textarea',
      focustext:'focustext',
      isshowFabiao:'isshowFabiao',
      fabiao:'fabiao',
      height
    })
  },
  // 评论框失去焦点时
  bindblur(){
    this.setData({
      inputtype:'text',
      focustext:'',
      isshowFabiao:'',
      fabiao:'',
      height:0
    })
  },
  // 回复当前圈子 、、 直接评论
  bindHFthiscircle(){
    let comment = this.data.comment
    comment.toUserId = ''
    comment.touserName = this.data.userDetailsList[0].authorName
    this.setData({comment})
  },
  // 点击发表按钮
  bindFabiao(){
    let comment = this.data.comment
    if(this.data.value === ''){
      wx.showToast({
        title: '取消发表评论',
        icon:'none'
      })  
      return
    }
    if(!comment.toUserId){
      this.setData({type:1})
    }
    // 跳转到发表评论的位置
    // new Promise(function(resolve , reject){
      if(this.data.type === 1 ){
        getApp().userPublishcomment(this.data.type,this.data.value,this.data.userDetailsList[0].id)
        this.setData({value:''})
        }else if(this.data.type === 0 ){
          // 评论回复的评论
          getApp().userPublishcomment(this.data.type,this.data.value,comment.informationId,comment.commentId,comment.fromUserId,comment.parentId,comment.toUserId)
          this.setData({type:1 ,value:''})
        }
  //     resolve()
  // }).then(function(){
  //   that.setData({limit:that.data.total,userCommentList:[]})
  //   // 刷新页面评论
  //   that.getusercommentData(that.options)

  // }).then(function(){
  //   that.setData({value:''})
  //   //跳转到发表评论的位置
  //   var query = wx.createSelectorQuery().in(that);
  //   query.selectViewport().scrollOffset()
  //   query.select("#comment .user-pinglun::last-child").boundingClientRect();
  //   query.exec(function (res) {
  //     var miss = res[0].scrollHeight
  //     wx.pageScrollTo({
  //       scrollTop: miss,
  //       duration: 300
  //     });
  //   })
  // }).catch((err)=>{
  // console.log(err)
  
  },
  // 用户键盘输入时获取用户输入内容
  bindinput(e){
  let value = e.detail.value
  this.setData({value})
  },
  // 获取子组件评论回复传参
  getcommentData(e){
    let comment = e.detail
    // if(e.detail.parentId){this.bindfocus()}
    let type = 0
    this.setData({type,comment})
    // if(comment.id){this.getusercommentData(this.options)}
  },
  // 点击显示更多评论
  bindhideMoreComment(){
    let _MoreComment = !this.data._MoreComment
    this.setData({_MoreComment})
    // this.getusercommentData(this.options)
  },
  // 喜欢圈子
  bindLike(){
    let userDetailsList = this.data.userDetailsList
    let type = 2
    userDetailsList[0].haveLike = !userDetailsList[0].haveLike
    let islike = userDetailsList[0].haveLike
    if(islike){userDetailsList[0].likeNum++}else{userDetailsList[0].likeNum--}
    getApp().userComment(userDetailsList[0].id,type,islike)
    this.setData({userDetailsList}) 
  },
  //收藏圈子
  bindshoucang(){
    let userDetailsList = this.data.userDetailsList
    console.log(userDetailsList)
    let type = 2
    userDetailsList[0].haveCollect = !userDetailsList[0].haveCollect
    let iscollection = userDetailsList[0].haveCollect
    if(iscollection){userDetailsList[0].collectNum++}else{userDetailsList[0].collectNum--}
    getApp().userCollection(userDetailsList[0].id,type,iscollection,userDetailsList[0].authorId)
    this.setData({userDetailsList})
  },
  //关注 ， 取消关注 用户
  bindAttention(e){
    let userDetailsList = this.data.userDetailsList
    userDetailsList[0].haveAttention = !userDetailsList[0].haveAttention
    let AttentId = e.currentTarget.dataset.attentid
    let type = 0
    let isAttention = userDetailsList[0].haveAttention
   getApp().userFollow(AttentId , type , isAttention)
   this.setData({userDetailsList})
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
    // this.getuserDetailsData(this.options)
    // this.getusercommentData(this.options)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    let page = this.data.page
    let limit = this.data.limit
    let total = this.data.total
    if( page * limit <= total){
      page++
      this.setData({page})
    this.getusercommentData(this.options)
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