import listen,{ appUrl } from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iconlist: ['icon-dianji','icon-wujiaoxing','icon-gengduo','icon-zhangjieshu','icon-yuyin'],
    jintitle: [],
    swiperData:[],
    listenList:[],
    nowPlayaudio:[], //正在播放得章节
    isshowAudio:false,
    musicId:getApp().globalData.musicId,
    isPlay:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (  options ) {
    console.log(options)
    // debugger
    // 先检查token要是没有的话直接返回登录页
    let { username } = wx.getStorageSync('token')
    let { token } = wx.getStorageSync('token')
    let userList = wx.getStorageSync('userList') 
    let url = listen.appUrl2 + 'sys/user/getByOpenId'
    listen.request_n_get(url,{ username } , res =>{
      if(res.data.code == 0){
        console.log('获取用户信息',res)
      }else if(res.data.code == 401){
        wx.clearStorageSync(token)
        wx.showModal({
          title:'提示',
          content:'您的身份认证已过期，请重新登录',
          showCancel:false,
          confirmText:'重新登录',
          success(res){
            if(res.confirm){
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
        return
      }else{
        wx.clearStorageSync(token)
      }
    })
    if(!token && !userList){
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
  getApp().globalData.userId = userList.id
    // // 续播
    // this.Continuation()
    // // 获取轮播图数据
    // this.getswiperImage()
    // // 获取专题数据
    // this.getThemeData()
    // //获取功能按钮数据
    // this.getchannelData()  
  },
    //续播
    Continuation(){
      let url = appUrl + 'readlog/app/getLastChapter?userId=' + getApp().globalData.userId
      listen.request_n_get( url , {} , res=>{
        if(res.data.code == 0 ){
          if(res.data.data){
            getApp().globalData.currentTime = res.data.data.timeNode
            wx.setStorageSync('musicId' , {musicId:res.data.data.chapterId})
          }else{
            getApp().globalData.currentTime = 0
          }
        }
      })
    },
  //控制首页audio浮窗显示
  isshowAudio(){
    let musicId  = wx.getStorageSync('musicId') || {}
    let url = appUrl + 'readlog/api/position'
    listen.request_n_get( url , {} , res =>{
      if(res.data.code == 0  && res.data.data){
          let list = res.data.data
          wx.setStorageSync('musicId', {musicId:list.chapterId})
          this.setData({isshowAudio:true})
        }else{
          this.setData({isshowAudio:false})
        }
    })
  },
  triggerishide(e){
    this.setData({isshowAudio:false})
  },
  // 轮播图
  getswiperImage(){
    let url = appUrl + 'carousel/app/page?category=0' 
    listen.request_n_get(url,{},res=>{
      if(res.data.code == 0){
        let data = res.data
        this.setData({swiperData:data.data.list})
      }
    })
  },
  // 主题、专题列表
  getThemeData(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let url = appUrl + 'subject/app/list'
    listen.request_n_get(url,{},({data})=>{
      wx.hideLoading()
       let list = data.data
      this.setData({listenList:list})
      let order = 'asc'
      let id = wx.getStorageSync('musicId').musicId
      // 书目章节信息
      if(id){
        let audiourl = appUrl + 'chapter/app/info?id=' + id  + '&userId=' + getApp().globalData.userId
        //排序方式 默认为正序
        listen.request_n_get(audiourl,{},({data})=>{
          let nowPlayaudio = data.data
          this.setData({nowPlayaudio:[nowPlayaudio]})
        })
      }
  
    })
  },
  // 功能
  getchannelData(){
    let url = appUrl + 'channel/app/list'
    listen.request_n_get(url,{
      type:1
    },(res)=>{
      if(res.data.code == 0){
        let list = res.data.data
        if(list.length > 5){
          list.splice(5)
        }
        this.setData({jintitle:list})
      }

    })
  },

  bindgetnavtor(e){
    let itemId = e.currentTarget.dataset.itemid
    getApp().globalData.itemId = itemId
    // wx.switchTab({
    //   url: '/pages/circle/circle'
    // })
    wx.showToast({
      title: '该功能正在建设中，请您耐心等待！',
      icon: 'none',
      duration: 500//持续的时间
    }) 
  },

  bindnavgetar(){

    wx.navigateTo({
      url: './search/search?page=home',
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
    //控制首页audio悬浮窗是否显示
    this.isshowAudio()
    // 续播
    this.Continuation()
    // 获取轮播图数据
    this.getswiperImage()
    // 获取专题数据
    this.getThemeData()
    //获取功能按钮数据
    this.getchannelData()  
    let isPlay = getApp().globalData.isPlay 
    this.setData({isPlay})
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