//app.js
import listen, { appUrl} from './utils/request'
App({
  userduration:0,
  onLaunch: function () {
    this.onShareAppMessage()
    // 用户在线时长统计
   this.userTimer =  setInterval(()=>{
      this.userduration++
    },1000)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    musicId:'',
    playbackRate:1,//音乐播放速度 ， 默认为 1
    isPlay: false, //播放状态
    itemId:0,//home页面参数传递circle页面需要的参数
    PlayList:[],//保存全局的播放列表数据
    userId: '', //y用户登录id
    userduration:0 , //用户在线时长统计
    currentTime: 0, //播放进度时间
    musicTimeTotal:0, // 音乐总时长
    musicInte:null, // music的定时器 ， 需要再停止播放的时候清除
    tenantCode: 1001, //租户编码
    status: 0 ,//是否需要审核  需要审核：0  ，无需审核： 1
    startTime:0 ,//开始播放的时间 -- 时间戳
    timeisok:true , //此时可以调用定时器 timeOut
    readTimes:0, //持续累加时间
  },
  onHide(){
    this.userexitApp()
    if(!this.globalData.isPlay){
      clearInterval(this.globalData.musicInte)
      this.globalData.musicInte = null
    }
  },
  onShow(e){
    this.getPlayaudioList()
    if(e && e.shareTicket){
    wx.getShareInfo({
      withCredentials:true,
      shareTicket:e.shareTicket,
      timeout:3000,
      success:res=>{
        console.log( '通过别人分享链接进入的' , res)
      }
    })
    }
  },
  // 背景音乐播放接口t
  getAudioBackMusic(isPlay, data, fn ) {
    let that = this
    // let url = appUrl + 'chapter/app/info?id=' + data.id + '&userId=' + this.globalData.userId
    // let obj = null
    let audio = wx.getBackgroundAudioManager()
    let oldmusicId = wx.getStorageSync('musicId').musicId
    if(data && oldmusicId != data.id ) {
      that.globalData.currentTime = 0
      console.log('音乐不一样了 ， ----------------------')
    }
    audio.startTime = that.globalData.currentTime*1
    audio.playbackRate = that.globalData.playbackRate
    if(!isPlay)  return audio.pause()
    new Promise(function(resolve , reject){
    //   listen.request_n_get(url,{},({data})=>{
    //     obj = data.data
    //     console.log(obj)
    //     resolve(obj)
    // })
    resolve(data)
  }).then(function(obj){
    if(!obj.audioUrl){
      audio.pause()
      wx.showToast({
        title: '该章节无音频，将自动播放下一曲',
        duration:2000,
        icon:'none',
      })
      setTimeout(()=>{
        that.bindNext(data.id , 'down') 
      } , 1800)
      return
    }
    that.globalData.isPlay = isPlay
    if (isPlay) {
      // 正在播放时间 -- 时间戳
      that.globalData.startTime = new Date().getTime()
      // 播放的时候章节阅读记录+1
      if(that.globalData.musicId != obj.id){
        that.readBookchapter(obj.id)
        that.savePlay(obj , 0 ,0 )
        // that.globalData.currentTime = 0
      }
      audio.play()

      // 获取调用 接口的间隔时间
      that.statisticInterval(obj , 0 ,0)
      //每次播放都保存播放音乐的Id
      wx.setStorageSync('musicId', {musicId : obj.id})
      that.globalData.musicId = obj.id
      audio.src = obj.audioUrl
      audio.title = obj.chapterName
      // 音乐跳转播放的位置 单位s
      // let currentTime = that.globalData.currentTime
      // 播放跳转的位置
    } else {
      audio.pause()
      that.globalData.timeisok = true
      that.savePlay(data , 0 , 0)
      clearInterval(that.IntTimer)
      clearInterval(that.addTimer)
    }
      audio.onTimeUpdate((e)=>{
      that.globalData.musicTimeTotal = audio.duration
      // 因为 onstop 后会赋值 0 ，所以做这个判断
      if(audio.currentTime  > 0) that.globalData.currentTime = audio.currentTime
      })
      audio.onStop(()=>{
        // clearInterval(that.globalData.musicInte)
        // that.globalData.musicInte = null
        that.globalData.isPlay = false
        that.savePlay(data , 0 , 0)
      })
      audio.onEnded(()=>{
        that.globalData.currentTime = 0
        that.globalData.isPlay = false
        that.savePlay(data , 0 , 0)
        wx.getBackgroundAudioManager().seek(0)
        that.bindNext(data.id , 'down')
      })
      audio.onError((err) => {
        clearInterval(that.globalData.musicInte)
        that.globalData.musicInte = null
        getApp().globalData.isPlay = false
        console.log(err)

      })
      audio.onWaiting(()=>{
        wx.showLoading({
          title: '正在缓冲...',
        })
      })
      audio.onCanplay(()=>{
        wx.hideLoading()
      })
    }).catch((err)=>{
      getApp().globalData.isPlay = false
      console.log(err)
    })
    if (fn) {
      fn(audio)
    }
  },
  // 获取播放列表
  getPlayaudioList(){
    let userList = wx.getStorageSync('userList')
    let userId = userList.id
    let url = appUrl + 'chapterplay/app/list?userId=' + userId
    listen.request_n_get(url,{},({data})=>{
     this.globalData.PlayList = data.data
    })
  },
  //点击播放下一曲 、 上一曲 （down  / top）
  bindNext(id , topOrdown){
    // if(this.globalData.isPlay){
    //   wx.pauseBackgroundAudio()
    // }
    let musicIndex
    let playList = this.globalData.PlayList
    let _playList = playList
    playList.forEach((v,i)=>{
    _playList[i].id = v.chapterId
      if(topOrdown == 'top'){ //上一曲
        if(id == v.id && i > 0){
          i--
          musicIndex = i
        }else if(id == v.id && i == 0){
          i = playList.length - 1
          musicIndex = i
        }
      }else{// 下一曲
        if(id == v.id && i < playList.length-1){
          i++
          musicIndex = i
        }else if(id == v.id && i >= playList.length-1){
          i = 0
          musicIndex = i
        }
      }
    })
    this.globalData.currentTime = 0
    this.getAudioBackMusic(true , _playList[musicIndex])
    wx.getBackgroundAudioManager().seek(0)
  },
  //章节阅读记录+1
  readBookchapter(chapterId){
      let url =  appUrl + 'readlog/api/readingPlus/'+chapterId
      listen.request_n_post(url,{}, res=>{
        console.log('章节阅读数+1',res)
      })
    
  },
  // 间隔一段时间来调用播放记录
  statisticInterval(data , type ,completeStatus){
   let that = this
    let url = appUrl + 'readlog/api/statistic/interval'
    listen.request_n_get(url,{},res=>{
      if(res.data.code == 0 ){
        let IntervalTime = res.data.data
        // 控制定时器只能存在一个
      if( that.globalData.timeisok){
        that.globalData.timeisok = false
        this.IntTimer = setInterval(()=>{
          that.savePlay(data , type ,completeStatus)
          this.globalData.startTime = (new Date()).getTime() //每60秒重新获取
        },IntervalTime*1000)
        this.addTimer = setInterval(()=>{
          that.globalData.readTimes++
        },100)
      }
      }
    })
  },
  // 保存播放记录
  savePlay(data , type ,completeStatus ) {
   // completeStatus: 0 播放   0 未完成 , 1 已完成
    // let url = appUrl + 'readlog/app/save'
    let url = appUrl + 'readlog/api/statistic'
    listen.request_n_post(url, {
      chapterId: data.id, //章节id
      timeNode: this.globalData.currentTime, //阅读进度/秒,
      booklistId:data.booklistId,
      startTimestamp:this.globalData.startTime,//音乐开始播放的时间段
      endTimestamp:(new Date()).getTime(),// 音乐播放结束的时间段
      duration:this.globalData.readTimes / 10 //持续播放累加的时间
    }, (res) => {
      console.log('保存播放记录接口调用成功',res)
    })
  },
  // 单个添加播放章节函数
  addchapterplay(id) {
    let url = appUrl + 'chapterplay'
    // 单个添加至播放列表
    listen.request_n_post(url, {
      chapterId: id,
      creator: this.globalData.userId,
      tenantCode: 0
    }, (res) => {
      console.log(' 单曲添加成功 ', res)
    })
  },
  //用户收藏 , 取消收藏
  userCollection(id, type, iscollection , publishUser) {
    let token = wx.getStorageSync('token')
    if(!token){
      wx.showModal({
        content:'你还没有登录，请先登录...',
        confirmText:'去登陆',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return
    }
    this.data = {
      creator: this.globalData.userId,
      informationId: id,
      type: type, // 分类：0:书目；1:章节；2:圈子动态,
      tenantCode: this.globalData.tenantCode,
      publishUser
    }
    if (iscollection) {
      let url = appUrl + 'collection' //收藏状态
      listen.request_n_post(url, {
        creator: this.globalData.userId,
        informationId: id,
        type: type,
        publishUser,
        tenantCode: this.globalData.tenantCode
      }, res => {
   
        console.log('用户 <<收藏>> 接口调用成功', res)
      })
    } else {
      let url = appUrl + 'collection/delete'
      listen.request_n_post(url, {
        creator: this.globalData.userId,
        informationId: id,
        type: type,
        publishUser,
        tenantCode: this.globalData.tenantCode
      }, res => {
        console.log('用户 <<取消收藏>> 接口调用成功', res)
      })
    }
  },
  //用户喜欢评论，取消喜欢评论接口
  userComment(id, type, islike , publishUser , informationId) {
    let token = wx.getStorageSync('token')
    if(!token){
      wx.showModal({
        content:'你还没有登录，请先登录...',
        confirmText:'去登陆',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return
    }
    let likeData = {
      commentId: id, //信息、评论id,
      creator: this.globalData.userId, //登录用户id,
      tenantCode: this.globalData.tenantCode, //租户编码,
      publishUser, // 圈子发布者ID ， 评论发布者id ， 评论护回复者ID creator
      type: type, //类型： 0：评论, 1：回复 ，2:圈子
      informationId
    }
    if (islike) {
      let url = appUrl + 'like/saveLike'
      listen.request_n_post(url, {
        commentId: id, //信息、评论id,
        creator: this.globalData.userId, //用户id,
        tenantCode: this.globalData.tenantCode, //租户编码,
        publishUser,
        informationId,
        type: type //类型： 0：评论, 1：回复，2:圈子
      }, res => {
  
        console.log('<<喜欢>>评论接口调用成功', res)
      })
    } else {
      let url = appUrl + 'like/deleteLike'
      listen.request_n_post(url, {
        commentId: id, //信息、评论id,
        creator: this.globalData.userId, //用户id,
        publishUser,
        informationId,
        tenantCode: this.globalData.tenantCode, //租户编码,
        type: type //类型： 0：评论, 1：回复
      }, res => {

        console.log('<<取消喜欢>>评论接口调用成功', res)
      })
    }
  },
  // 用户关注、取消关注接口
  userFollow(attentionUser,type,isfollow){
    let token = wx.getStorageSync('token')
    if(!token){
      wx.showModal({
        content:'你还没有登录，请先登录...',
        confirmText:'去登陆',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return
    }
    let data = {
      attentionUser, //被关注用户id,
      creator:this.globalData.userId, 
      tenantCode:this.globalData.tenantCode, //租户编码,
      type //类型：0、用户；1、话题小组
    }
    let url = ''
    if(isfollow){   url = appUrl + 'chatattention/follow'  }else{
       url = appUrl + 'chatattention/remove/follow'
    }
    listen.request_n_post(url,{
      attentionUser, //被关注用户id,
      creator:this.globalData.userId, //用户id,
      tenantCode:this.globalData.tenantCode, //租户编码,
      type //类型：0、用户；1、话题小组
    },res=>{
      if(isfollow){
        wx.showToast({
          title: '关注成功',
          icon:'success'
        })
      }else{
        wx.showToast({
          title: '取消关注',
          icon:'none'
        })
      }
      console.log(isfollow ? ('关注' + '接口调用成功') : ('取消关注' + '接口调用成功') , res)
    })
  },
  //用户发表评论接口
  userPublishcomment(type, content, id, commentId, fromUserId, parentId, toUserId) {
    let token = wx.getStorageSync('token')
    if(!token){
      wx.showModal({
        content:'你还没有登录，请先登录...',
        confirmText:'去登陆',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return
    }
    let data = {
      content: content, //评论内容,
      commentId: commentId, //评论ID（回复）
      fromUserId: fromUserId, //登陆人id（回复）
      parenrId: parentId, //回复回复人的id（回复 -- creator / fromUserId）
      toUserId: toUserId, //目标用户ID(回复   )
      informationId: id, //发布信息id
      status: this.globalData.status, //0
      creator: this.globalData.userId, //用户id,
      tenantCode: this.globalData.tenantCode //租户编码
    }
    wx.showLoading({
      title: '发布中...',
    })
    if (type === 0) {
      let url = appUrl + 'comemntreply'
      listen.request_n_post(url, {
        content: content, //评论内容,
        commentId: commentId, //评论ID（回复）
        fromUserId: fromUserId, //登陆人id（回复）
        parenrId: parentId, //回复回复人的id（回复 -- creator / fromUserId）
        toUserId: toUserId, //目标用户ID(回复   )
        informationId: id, //发布信息id
        status: this.globalData.status, //0
        creator: this.globalData.userId, //用户id,
        tenantCode: this.globalData.tenantCode //租户编码
      }, res => {
        wx.hideLoading()
        console.log('评论回复接口调用成功', res)
        if(res.data.code == 0){
          wx.showModal({
            title:'提示',
            content:'发布的评论需要审核，评论是否通过请关注消息通知',
            showCancel:false,
            confirmText:'我知道了'
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      })
    } else if (type === 1) {
      let url = appUrl + 'comment'
      listen.request_n_post(url, {
        content: content, //评论内容,
        informationId: id, //发布信息id,
        status: this.globalData.status, // 0 
        creator: this.globalData.userId, //用户id,
        tenantCode: this.globalData.tenantCode, //租户编码
      }, res => {
        wx.hideLoading()
        console.log('评论接口调用成功', res)
        if(res.data.code == 0){
          wx.showModal({
            title:'提示',
            content:'发布的评论需要审核，评论是否通过请关注消息通知；',
            showCancel:false,
            confirmText:'我知道了'
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      })
    }
  },
  //用户修改消息读取状态为已读状态
  userContentType(type){
    let url = appUrl + 'notice/applet/updateStatus'
    let userId = this.globalData.userId
    listen.request_n_get(url,{
      userId,
      type
    },res=>{
      console.log('修改消息状态成功',res)
    })
  },
  //小程序挂起 、 退出时调用的函数  duration: 时长，creator: 用户id ， 在线时间统计
  userexitApp(){
    let url = listen.appUrl + 'onlinetime'
    // let userduration = this.userduration
    let creator = this.globalData.userId
    // console.log(userduration)
    // let endTime = new Date().getTime()
    // let time = endTime - userduration
    // let duration = time / 1000
    let duration = this.userduration // s
    listen.request_n_post(url,{
      duration,creator
    },res=>{
      clearInterval(this.userTimer)
      this.userduration = 0
      console.log('统计用户在线时长接口调用',res)
    })
  },
  // 验证用户token ， 如果没有登录必须先登录
  haveUserToken(url){
    let token = wx.getStorageSync('token')
    if(token && url){
      wx.navigateTo({
        url:url,
      })
    }else if(!url){
      return
    }else{
      wx.showModal({
        content:'你还没有登录，请先登录...',
        confirmText:'去登陆',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
  },
  //按照积分划分段位
rankLevel(rank){
  if(rank > 10000){
    return '状元'
  }else if(rank > 8000){
    return '榜眼'
  }else if(rank > 6000){
    return '探花'
  }else if(rank > 5000){
    return '进士'
  }else if(rank > 3000){
    return '贡士'
  }else if(rank > 2000 ){
    return '举人'
  }else if(rank > 1000){
    return '秀才'
  }else if(rank > 300 ){
    return '童生'
  }else{
    return '书童'
  }
},
// 小程序全局分享
  onShareAppMessage(){
    wx.onAppRoute(() =>{
      console.log('当前页面路由发生变化 触发该事件onShareAppMessage')
      const pages = getCurrentPages() //获取加载的页面
      const view = pages[pages.length - 1] //获取当前页面的对象
      if(!view)  return false  //如果不存在页面对象 则返回
      // 若想给个别页面做特殊处理 可以给特殊页面加isOverShare为true 就不会重写了
      // const data = view.data
      // if (!data.isOverShare) {
        // data.isOverShare = true
        view.onShareAppMessage = () => { //重写分享配置
          wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
          })
          let url = appUrl + 'share/shareNum'
          // 首次分享获取积分  // shareId:"页面id",type:'0:好友，1 群，2 朋友圈',shareUser:'分享人'
          listen.request_n_post(url , {
            shareId:view.route,
            type:0,
            shareUser:this.globalData.userId
          } , res=>{
            console.log('转发成功',res)
          })
          return {
            title: '少年听吧',
            path: view.route + '?userId=' +  this.globalData.userId, //若无path 默认跳转分享页
          }
        }
      // }
    })
  },


  // 获取未读消息数
   getinformationsdataList(){ 
    let count1 = 0
    let count2 = 0
    let userId = getApp().globalData.userId
    let url = appUrl + 'notice/applet/pageAndDataNum?userId=' + userId
  const promise = new Promise(function(resolve,reject ){
      // 获取消息首页数据
      listen.request_n_get(url,{},(res)=>{
        if(res.data.code == 0){
          // 未读消息数量
          let unnumList = res.data.data.unnumList
          let noticList = res.data.data.noticList
          if(!!unnumList){
          for (let index = 0; index < unnumList.length ; index++) {
            count1 += unnumList[index].num*1;
          }
        }
        if(!!noticList){
          for (let index = 0; index < noticList.length ; index++) {
            count2 += noticList[index].unReadNum*1;
          }
        }
        resolve(count1 + count2)
        }
        }) 
    }).catch(err=>{
      console.log(err)
    })
    return promise
  },
// 设置监听器
watch: function (ctx, obj) {
  Object.keys(obj).forEach(key => {
   this.observer(ctx.data, key, ctx.data[key], function (value) {
    obj[key].call(ctx, value)
   })
  })
 },

})
