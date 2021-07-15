const App = getApp()
import listen from '../../utils/request'
Component({
  properties:{
    userCommentList:Array,
  },
  data:{
    userCommentList:[],
    likeindex:0,
    _listIsshow:false, //控制评论消息的显示多少条
    replay:[],
    page:1,
    limit:10,
  },
  ready(){
    this.if_hide()
  },
  methods:{

    //评论回复
    bindCommentReply(e){
      let commentId = e.currentTarget.dataset. commentid//评论id
      let informationId = e.currentTarget.dataset.informationid //信息id
      let touserName = e.currentTarget.dataset.username
      let fromUserId = App.globalData.userId //登录用户id
      let parentId = e.currentTarget.dataset.parentid  //评论父级ID
      // let status = 0
      let toUserId=e.currentTarget.dataset.touserid //目标用户id
      let commentList = {commentId,informationId,fromUserId,parentId,touserName,toUserId}
      this.triggerEvent('getcommentData', commentList)
    },
    // 点击喜欢评论、不喜欢评论
    isAndnoLike(e){
      let likeindex = e.currentTarget.dataset.likeindex
      let likeId = e.currentTarget.dataset.likeid
      let likeType = e.currentTarget.dataset.liketype
      let userCommentList = this.properties.userCommentList
      let publishUser = e.currentTarget.dataset.publishuser
      let informationId = e.currentTarget.dataset.informationid
      this.haveLike = false
      userCommentList.forEach((item,index)=>{
        if(likeType === "0" ){
        if(likeindex === index && likeId === item.id){
          item.haveLike = !item.haveLike
          if(item.haveLike){item.likeNum++}else{item.likeNum--}
          this.haveLike = item.haveLike
        }
      }else if(likeType === "1"){
        item.replay.list.forEach((item2,index2)=>{
          if(likeindex === index2 && likeId === item2.id){
            item2.haveLike = !item2.haveLike
            if(item2.haveLike){item2.likeNum++}else{item2.likeNum--}
           this.haveLike = item2.haveLike
          }
        })
      }
      })
      this.setData({userCommentList})
      console.log(userCommentList)
      App.userComment(likeId,likeType,this.haveLike,publishUser,informationId)
    },
    //点击展示更多评论回复
 bindisshowMoreComment(e){
      let commentId = e.currentTarget.dataset.commentid
      let userCommentList = this.properties.userCommentList
      let _isshow = false
      userCommentList.forEach((item,index)=>{
        if(commentId === item.id){
          item._isshow = !item._isshow
          _isshow = item._isshow
        }
      })
      let comment= {_isshow,id:commentId}
      this.triggerEvent('getcommentData', comment)
      wx.navigateTo({
        url: '/pages/channel/userDetails/Moreusercomment/Moreusercomment?commentId=' + commentId,
      })
    },
  // 获取更多回复评论
  getMoreusercomment(commentId){
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
      let replay = data.data.list
      console.log('评论回复',replay)
      this.setData({replay})
          })
  },
  // 跳转至用户详细信息页
  bindnavgetor(e){
    let creator = e.currentTarget.dataset.creator
    wx.navigateTo({
      url: '/pages/information/useContent/userContent?othId=' + creator,
    })
  },
  // 文字超出隐藏
  if_hide(){
    let that = this
    wx.showLoading({
      title:'加载中...'
    })
    let query = wx.createSelectorQuery().in(this)
    setTimeout(()=>{
     let userCommentList = that.data.userCommentList
      // 第一层级 （评论）
      query.selectAll('.myintro').boundingClientRect(function (rect){
        console.log(rect)
        if(rect){
          rect.forEach((v,i)=>{
            if(v.height > 40){
              userCommentList[i].if_isshow = true
            }else{
             userCommentList[i].if_isshow = false
            }
          })
        }
        that.setData({userCommentList})
        wx.hideLoading()
      }).exec()
    },500)
  },
  //点去切换文字多行显示 、 隐藏
  bindChangeis_isshow(e){
    let { index } = e.currentTarget.dataset
    let userCommentList = this.data.userCommentList
    userCommentList[index].if_isshow = !userCommentList[index].if_isshow
    this.setData({userCommentList})
  },
    }
    
})