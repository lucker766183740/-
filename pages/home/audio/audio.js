const { appUrl } = require("../../../utils/request")
const listen = require("../../../utils/request")
var appInstance = getApp()
Page({
  /**
   * 页面的初始数据
   */
  timeStamp:0,
  timeout:null,
  musicCloseTimeout:null, // 播放定时器
  newInevt:null,
  data: {
    isclose:'none',
    PlayList:appInstance.globalData.PlayList,
    isshow: true,
    isxinshow: false,
    audioList: {},
    currentTime:'00:00',
    duration:'00:00',
    width:'0',
    audioDuration:0, // 音频总时长 s
    forward:0,
    backOff:0,
    good:true,//痛殴懂得时候不允许更新进度条
    chufa:false, // 是否触发播放位置清零
    playbackRate:1,//音频播放倍数
    musicInterval:0, // 定时关闭播放时间 0 ？ 关闭 ...
    timeOutisshow:false, // 弹出定时框
    pageContainerData:[
     { title:'5分钟',checked:false},
     { title:'15分钟',checked:false},
     { title:'30分钟',checked:false},
     { title:'60分钟',checked:false},
     { title:'听完本章节',checked:false}
    ],
    switchShow:false, // switch状态
    radioTitle:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // wx.setNavigationBarTitle({
    //   title: this.data.audioList.chapterName
    // })
    this.getAudioBackgroundManager(options)
    this.options = options
    this.getPlayaudioList()
  },
  //滑块滑动一次
  handlechange(e){
    let { value } = e.detail
    let audioDuration = appInstance.globalData.musicTimeTotal
    // let width = value
    appInstance.globalData.currentTime = (audioDuration / 100) * value
    // this.setData({ width })
    let options = {}
    options.nowPlayaudio = appInstance.globalData.musicId
    if(!this.data.good){
      wx.getBackgroundAudioManager().seek((audioDuration / 100) * value)
      // 定时器  -- 定时获取首页currentTime数据然后更新到页面上
     if(!appInstance.globalData.musicInte){
      let duration = 0
      let current = 0
      let isshow = false
     let Time =  {}
      appInstance.globalData.musicInte = setInterval(() => {
         duration = appInstance.globalData.musicTimeTotal
         current = appInstance.globalData.currentTime
         isshow = appInstance.globalData.isPlay
        Time =  this.comporentent(current,duration)
       this.setData({
         isshow,
          duration : Time.newtotalTime , 
          currentTime : Time.newTime,
          width:Time.width + ''     
        })
      }, 300);
    }
      // wx.seekBackgroundAudio({
      //   position:  (audioDuration / 100) * value,
      // })
    }
  },
  // 滑块拖动中...
  eventhandle(e){
    let { value } = e.detail
    let audioDuration = appInstance.globalData.musicTimeTotal // 总时长 s
    let width = value
    this.currentTime = (audioDuration / 100) * value
   appInstance.globalData.currentTime = this.currentTime
    // 00 : 00
    let startTime= parseInt(( audioDuration / 100) * value)
    let startMinute = parseInt(startTime / 60)
    let startSecound = startTime - startMinute * 60
    let a = 0
    let b = 0
    if(startMinute < 10){
      a = '0'+ startMinute
    }else {
      a = startMinute 
    }
    if(startSecound < 10){
      b = '0' + startSecound
    }else{
      b = startSecound
    }
    let currentTime = a  + ':' + b
    let  { musicId }  =  wx.getStorageSync('musicId')
    this.options =  {nowPlayaudio:musicId} 
  this.setData({currentTime , width , isshow : true , good:true})
  appInstance.globalData.currentTime = this.currentTime
    // this.getAudioBackgroundManager(this.options)
  // appInstance.getAudioBackMusic(true , this.data.audioList ,e=>{
  //   e.seek(this.currentTime)
  // })
  },
  // 开始拖动时不更新进度条
  good(){
    clearInterval(appInstance.globalData.musicInte)
    appInstance.globalData.musicInte = null
    // wx.getBackgroundAudioManager().pause()
    this.setData({isshow:false , good:false})
  },
  // 结束拖动进度条的时候在显示进度条
  goodend(){
    let options = {}
    options.nowPlayaudio = appInstance.globalData.musicId
    this.setData({isshow:true})
    if(this.data.good){
      wx.getBackgroundAudioManager().seek(this.currentTime)
      // 定时器  -- 定时获取首页currentTime数据然后更新到页面上
     if(!appInstance.globalData.musicInte){
      let duration = 0
      let current = 0
      let isshow = false
     let Time =  {}
      appInstance.globalData.musicInte = setInterval(() => {
         duration = appInstance.globalData.musicTimeTotal
         current = appInstance.globalData.currentTime
         isshow = appInstance.globalData.isPlay
        Time =  this.comporentent(current,duration)
       this.setData({
         isshow,
          duration : Time.newtotalTime , 
          currentTime : Time.newTime,
          width:Time.width + ''     
        })
      }, 300);
    }
      // wx.seekBackgroundAudio({
      //   position:  this.currentTime,
      // })
    }
  },
  // 控制播放/暂停icon
  bindTap() {
    let isshow = !this.data.isshow
    getApp().globalData.isPlay = isshow
    this.setData({isshow})
    let { musicId } = wx.getStorageSync('musicId')
    this.getAudioBackgroundManager({nowPlayaudio:musicId})
  },
  //控制收藏icon
  bindxinisshow() {
    let type = 1
    let id = this.options.nowPlayaudio
    let isxinshow = !this.data.isxinshow
    this.setData({isxinshow})
    appInstance.userCollection(id,type,isxinshow,null)
  },
  // 点击播放列表播放选中章节
  bindPlay(e){
    let id = e.currentTarget.dataset.bookid
    // 判断是单机事件还是双击事件
    if(e.timeStamp - this.timeStamp < 500){
      wx.navigateTo({
        url: '/pages/circle/details/details?id=' + id,
      })
      clearTimeout(this.timeout)
      this.timeout = null
    }else {
      let nowPlayaudio = ''
      let musicId = ''
      this.timeout = setTimeout(() => {
         nowPlayaudio = e.currentTarget.dataset.nowplayaudio
          musicId  = wx.getStorageSync('musicId').musicId
        this.setData({isshow:true})
        if(nowPlayaudio !=  musicId){
          // wx.getBackgroundAudioManager().pause()
          getApp().globalData.currentTime = 0
          this.getAudioBackgroundManager({nowPlayaudio})
        }
      }, 500);
    }
    this.timeStamp = e.timeStamp

 
  },
  // 请求正在播放的音乐--需要接受其他页面传递的书本章节id--改名为nowPlayaudio
  getAudioBackgroundManager(options){
    let id = options.nowPlayaudio
    let userId = appInstance.globalData.userId
    let url = appUrl + 'chapter/app/info?id=' + id + '&userId=' + userId
    let isshow = this.data.isshow
    // 标记播放章节与上一个章节id是否一致 触发状态，用于标记传输时间
    // let chufa = this.data.chufa
    //获取播放的章节id
    getApp().globalData.isPlay = isshow
    // 获取音乐信息传给音频识别播放
    listen.request_n_get(url,{},({data})=>{
      let audioList = data.data
      this.setData({audioList:audioList , isxinshow: data.data.haveCollect })
    // 播放音乐
    appInstance.getAudioBackMusic(isshow,audioList,(e)=>{
      e.onPlay(()=>{
        let { musicId } = wx.getStorageSync('musicId')
        this.setData({isshow:true})
        appInstance.globalData.isPlay = true
        this.getNowPlay(musicId)
      })
      e.onPause(()=>{
        this.setData({isshow:false})
        appInstance.globalData.isPlay = false
        appInstance.savePlay(data, 0 , 0)
      })
    })
    })
  },
  // 计算音乐现在的播放位置
  comporentent(Time , totalTime){
    // 正在播放的位置
    let min = parseInt( Time / 60 ) // s
    let secound = parseInt( Time - (min * 60) )
    min = min < 10 ? '0'+min : min
    secound = secound < 10 ? '0'+secound : secound
    let newTime = min + ':' + secound
    // 滑动条位置
    let width = 100 / totalTime * Time
    // 总时间
    let totalmin = parseInt( totalTime / 60 ) 
    let totalsecound = parseInt( totalTime - (totalmin*60) )
     totalmin = totalmin < 10 ? '0'+totalmin : totalmin
     totalsecound = totalsecound < 10 ? '0'+totalsecound : totalsecound
     let newtotalTime =  totalmin + ':' + totalsecound

    return {newTime , newtotalTime , width}
  },
  // 点击播放上一曲
  bindLastsong(){
    let PlayList = this.data.PlayList
    let { musicId } = wx.getStorageSync('musicId')
    let musicIndex = 0
    PlayList.forEach((item,index)=>{
      if(item.chapterId === musicId){
        if(index === 0){
          index = PlayList.length - 1 
        }else{
           index--
        }
        musicIndex = index
      }
    })
    this.getNowPlay(PlayList[musicIndex].chapterId)
    appInstance.bindNext(appInstance.globalData.musicId , 'top')
  },
  // 点击播放下一曲
  bindNextsong(){
    let PlayList = this.data.PlayList
    let chapterId = wx.getStorageSync('musicId').musicId
    PlayList.forEach((item,index)=>{
      if(item.chapterId === chapterId){
        if(index === PlayList.length - 1){
          index = 0 
        }else{
           index++
        }
        this.getNowPlay(PlayList[index].chapterId)
      }
    })
    appInstance.bindNext(appInstance.globalData.musicId , 'down')
  },
  //获取正在其播放音乐data {}
  getNowPlay(id){
    let url = appUrl + 'chapter/app/info?id=' + id + '&userId=' + appInstance.globalData.userId
    listen.request_n_get( url , {} , res => {
      if(res.data.code == 0){
        this.setData({audioList:res.data.data})
      }
    })
  },
      // 关闭播放列表
      bindisclone(){
        this.setData({isclose:'none'})
      },
      // 点击菜单icon显示内容
      bindshownowPlayaudio(){
        this.getPlayaudioList()
        this.setData({isclose:false})
      },
      // 请求播放列表
      getPlayaudioList(){
        let musicId = this.options.nowPlayaudio
        let userId = appInstance.globalData.userId
        let url = appUrl + 'chapterplay/app/list?userId=' + userId
        listen.request_n_get(url,{},({data})=>{
          appInstance.globalData.PlayList = data.data
          let _aar = true
          data.data.forEach(v=>{
            let id = v.chapterId
            let pos =  id.indexOf(musicId)
            if(pos >= 0){
              _aar = false
            }
          })
          if(_aar){ appInstance.addchapterplay(musicId)}
          this.setData({PlayList:data.data})
        })
      },
      // 移除歌曲
      bindClearplay(e){
        let index = e.currentTarget.dataset.playlistindex
        let id = e.currentTarget.dataset.playid
        let PlayList =appInstance.globalData.PlayList
        let { musicId } = wx.getStorageSync('musicId')
        // 如果删除的时正在播放的章节就播放下一个章节
        if( PlayList[index].chapterId == musicId ) {
           this.bindNextsong()

         }
        PlayList.splice(index,1)
        if(PlayList.length == 0){ 
          wx.setStorageSync('musicId', {})
          appInstance.globalData.isPlay = false
          appInstance.getAudioBackMusic(false)
          wx.switchTab({
            url: '/pages/home/home',
          })
        }
        let url = appUrl + 'chapterplay/app/delete'
        listen.request_n_get(url,{ id },res=>{
          console.log('删除单个章节',res)
        })
        appInstance.globalData.PlayList = PlayList
        this.setData({PlayList})
      },
      //点击全部清空
    bindClearAll(){
      let PlayList = ''
      let url = appUrl + 'chapterplay/app/deleteAll'
      let userId = appInstance.globalData.userId
      wx.showModal({
       title:'提示',
       content:'确定清空播放列表吗',
       success:res=>{
         if(res.confirm){
          wx.setStorageSync('musicId', {})
          appInstance.globalData.isPlay = false
          appInstance.getAudioBackMusic(false)
          wx.switchTab({
            url: '/pages/home/home',
          })
            listen.request_n_get(url,{userId},res=>{
              console.log('清空全部列表接口调用成功',res)
            })
            appInstance.globalData.PlayList = PlayList
            this.setData({PlayList})
         }
       }
      }) 
    },
    //前进15s
    bindqianjin(){ 
      wx.getBackgroundAudioManager().seek(appInstance.globalData.currentTime + 15)
    },
    //后退15s
    bindhoutui(){ 
      wx.getBackgroundAudioManager().seek(appInstance.globalData.currentTime - 15)
    },
    //播放速度
    bindplaybackRate(){
      let playbackRate = appInstance.globalData.playbackRate
      let { musicId } = wx.getStorageSync('musicId')
      wx.getBackgroundAudioManager().stop()
      if(playbackRate == 1){
        appInstance.globalData.playbackRate = 1.5
      }else if (playbackRate == 1.5){
        appInstance.globalData.playbackRate = 2
      }else if (playbackRate == 2){
        appInstance.globalData.playbackRate = 1
      }
      this.setData({
        playbackRate:appInstance.globalData.playbackRate,
    })
      this.getAudioBackgroundManager({nowPlayaudio:musicId})
    },
    //switch开关
    bindSwitchChange(e){
      let switchShow = e.detail.value
      let radioTitle = this.data.radioTitle
      let pageContainerData = this.data.pageContainerData
      if(switchShow && !radioTitle){
        pageContainerData.forEach((v,i)=>{
          if(i == 0){
            v.checked = true
          }
        })
      this.timeintreval('5分钟')

        this.setData({radioTitle:'5分钟'})
      }
      if(!switchShow){
        pageContainerData.forEach((v,i)=>{
          v.checked = false
        })
        if(  this.musicCloseTimeout ) { 
          clearTimeout(  this.musicCloseTimeout  )
          this.musicCloseTimeout = null
        }
        if( this.newInevt ) {
          clearInterval(this.newInevt)
          this.newInevt = null
        }
        this.setData({
          radioTitle:'',
          musicInterval:0
        })
      }
      this.setData({switchShow , pageContainerData})
    },
    // 获取定时关闭选择得数据
    bindRadioChange(e){
      let radioTitle = e.detail.value
      let pageContainerData = this.data.pageContainerData
      pageContainerData.forEach((v,i)=>{
        v.checked = false
        if(radioTitle == v.title){
          v.checked = true
        }
      })
      if(radioTitle &&  !this.data.switchShow){
        this.setData({switchShow:true})
      }
      this.timeintreval(radioTitle)
      this.setData({radioTitle , pageContainerData})
    },
    //定时关闭
    bindInterval(){
      this.setData({
        timeOutisshow:true
      })
    },
    //调用定时器
    timeintreval(radioTitle) {      
      // getApp().globalData.switchTimeOut
      let that = this
      let pageContainerData = []
      let switchTimeOut = {}
      let musicInterval = this.data.musicInterval // 定时时间
      let musicTimeTotal = 0
      let currentTime = 0
      // 如果用户重新选择时间 ， 那么先清除原来得定时器
      if(  that.musicCloseTimeout ) { 
        clearTimeout(  that.musicCloseTimeout  )
        that.musicCloseTimeout = null
      }
      if( that.newInevt ) {
        clearInterval(that.newInevt)
        that.newInevt = null
      }
      if(radioTitle == '5分钟'){ //5分钟
        musicInterval = 5
      }else if(radioTitle == '15分钟'){ // 15分钟
        musicInterval = 15
      }else if(radioTitle == '30分钟'){ // 30分钟
        musicInterval = 30
      }else if(radioTitle == '60分钟'){ // 60分钟
        musicInterval = 60
      } 
      that.musicCloseTimeout = setTimeout(() => {
        that.musicCloseTimeout = null
        pageContainerData = getApp().globalData.switchTimeOut.pageContainerData
        pageContainerData.forEach(v=>{
          v.checked = false
        })
          switchTimeOut =  { radioTitle:'' , musicInterval:0 , switchShow:false,pageContainerData}
        getApp().globalData.switchTimeOut = switchTimeOut
        that.setData({
          radioTitle:switchTimeOut.radioTitle ,
          musicInterval:switchTimeOut.musicInterval ,
          switchShow:switchTimeOut.switchShow,
          pageContainerData:switchTimeOut.pageContainerData
        })
        if(getApp().globalData.isPlay){
          wx.getBackgroundAudioManager().pause()
        }
        that.setData({
          musicInterval:0
        })
      }, musicInterval*60*1000);

      if(radioTitle == '听完本章节'){ // 听完本章节
        if(  that.musicCloseTimeout ) { 
          clearTimeout(  that.musicCloseTimeout  )
          that.musicCloseTimeout = null
        }
        musicInterval = '本章'
        // 如果之前存在定时器 ， 那么先关闭定时器
        that.newInevt = setInterval(() => {
          musicTimeTotal = getApp().globalData.musicTimeTotal
          currentTime = getApp().globalData.currentTime
          if(parseInt(musicTimeTotal - 1 ) == parseInt(currentTime) ){
            clearInterval(that.newInevt)
            that.newInevt = null
            pageContainerData = getApp().globalData.switchTimeOut.pageContainerData
            pageContainerData.forEach(v=>{
              v.checked = false
            })
            switchTimeOut =  { radioTitle:'' , musicInterval:0 , switchShow:false,pageContainerData}
            getApp().globalData.switchTimeOut = switchTimeOut
            that.setData({
              radioTitle:switchTimeOut.radioTitle ,
              musicInterval:switchTimeOut.musicInterval ,
              switchShow:switchTimeOut.switchShow,
              pageContainerData:switchTimeOut.pageContainerData
            })
            if(getApp().globalData.isPlay){
              setTimeout(() => {
                  wx.getBackgroundAudioManager().pause()
              }, 1000);
            }
            that.setData({
              musicInterval:0
            })
          }
        }, 300);
      }

      that.setData({
        musicInterval,
        timeOutisshow:true
      })
      switchTimeOut = {radioTitle , musicInterval , switchShow:this.data.switchShow,pageContainerData:this.data.pageContainerData}
      getApp().globalData.switchTimeOut = switchTimeOut
          
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
    let isshow = getApp().globalData.isPlay
    this.setData({
      isshow,
      playbackRate:appInstance.globalData.playbackRate,
    })
     // 定时器  -- 定时获取首页currentTime数据然后更新到页面上
     if(!appInstance.globalData.musicInte){
      let duration = 0
      let current = 0
      let isshow = false
     let Time =  {}
      appInstance.globalData.musicInte = setInterval(() => {
         duration = appInstance.globalData.musicTimeTotal
         current = appInstance.globalData.currentTime
         isshow = appInstance.globalData.isPlay
        Time =  this.comporentent(current,duration)
       this.setData({
          isshow,
          duration : Time.newtotalTime , 
          currentTime : Time.newTime,
          width:Time.width + ''     
        })
      }, 300);
    }
    let switchTimeOut = getApp().globalData.switchTimeOut
    if(switchTimeOut.pageContainerData){
      this.setData({
        radioTitle:switchTimeOut.radioTitle ,
        musicInterval:switchTimeOut.musicInterval ,
        switchShow:switchTimeOut.switchShow,
        pageContainerData:switchTimeOut.pageContainerData
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(appInstance.globalData.musicInte )
    appInstance.globalData.musicInte = null
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(appInstance.globalData.musicInte )
    appInstance.globalData.musicInte = null
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