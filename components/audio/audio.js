import listen , { appUrl }  from '../../utils/request'
let App = getApp()
Component({
  properties:{
    nowPlayaudio:Array,
    isshow:Boolean

  },
  data:{
    isshow:App.globalData.isPlay,
    isclose:'none',
    PlayList:[],
    oldMusicId:'',
  },
pageLifetimes: {
// 组件所在页面显示时触发的函数
  show:function(){
    let isshow = getApp().globalData.isPlay
    this.setData({isshow})
    this.getPlayaudioList()
    this.bindisclone()
    this.data.oldMusicId = wx.getStorageSync('musicId').musicId
    this.getdata()
  }
},
  methods:{
    getdata(){
      setInterval(() => {
        let newMusicId = wx.getStorageSync('musicId').musicId
      let url = appUrl + 'chapter/app/info?id=' + newMusicId + '&userId=' + App.globalData.userId
        if(newMusicId != this.data.oldMusicId){
          listen.request_n_get(url,{},(res)=>{
            if (res.statusCode === 200 && res.data.code === 0) {
            let audioList = res.data.data
            this.setData({nowPlayaudio : [audioList]})
            }
          })
        }
      }, 500);
    },
    // 点击获取播放/切换播放状态
    bindshow(){
      let isshow = !this.data.isshow
      this.getPlayaudioList()
      getApp().globalData.isPlay = isshow
      let id = wx.getStorageSync('musicId').musicId
      let userId = App.globalData.userId
      let url = appUrl + 'chapter/app/info?id=' + id + '&userId=' + userId
      listen.request_n_get(url,{},(res)=>{
        if (res.statusCode === 200 && res.data.code === 0) {
        let audioList = res.data.data
        this.setData({nowPlayaudio : [audioList]})
         // 播放音乐
      App.getAudioBackMusic(isshow,audioList,(e)=>{
        // e.onPlay(()=>{
        //   this.setData({isshow:true})
        //   getApp().globalData.isPlay = true
        //   getApp().globalData.startRead = e.currentTime
        // })
        // e.onTimeUpdate(()=>{
        //   getApp().globalData.currentTime = e.currentTime
        // })
        // e.onPause(()=>{
        //   getApp().globalData.endRead = e.currentTime
        //   this.setData({isshow:false})
        //   getApp().globalData.isPlay = false
        // getApp().savePlay(audioList , 0 , 0 )

        // })
        // e.onStop(()=>{
        //   getApp().globalData.endRead = e.currentTime
        //   this.setData({isshow:false})
        //   getApp().globalData.isPlay = false
        // getApp().savePlay(audioList , 1 , 0)

        // })
        // e.onEnded(()=>{
        //   getApp().globalData.endRead = e.currentTime
        //   this.setData({isshow:false})
        //   wx.pauseBackgroundAudio()
        //   getApp().savePlay(audioList , 1 , 0)
        //   getApp().globalData.isPlay = false
        //   getApp().globalData.currentTime = 0
        //   getApp().globalData.readTimes = 0
        //   this.nextPlay(id)
        // })
        // e.onError((error) => {
        //   getApp().globalData.isPlay = false
        // })
      })
    }
      })
      this.setData({isshow})
      // this.getNowPlay({musicId})
    },
    // 跳转页面必须有一个正在播放的章节
    bindnavgetordetails(){
      let musicId = wx.getStorageSync('musicId')
      wx.navigateTo({
        url: '/pages/home/audio/audio?nowPlayaudio=' + musicId.musicId
      })
    },
    // 点击关闭播放列表
    bindisclone(){
      this.setData({isclose:'none'})
    },
    // 点击菜单icon显示内容
    bindshownowPlayaudio(){
      let { musicId } = wx.getStorageSync('musicId')
      let that = this
      new Promise(function (reslove , reject){
        reslove(  App.addchapterplay(musicId) )
      }).then(function(e){
        that.getPlayaudioList()
      }).catch(err=>{
        console.log(err)
      })
      that.getPlayaudioList()
      this.setData({isclose:false})
    },
    // 请求播放列表
    getPlayaudioList(){
      let userId = App.globalData.userId
      let url = appUrl + 'chapterplay/app/list?userId=' + userId
      listen.request_n_get(url,{},({data})=>{
        App.globalData.PlayList = data.data
        let { musicId } = wx.getStorageSync('musicId')
        if(!data.data && musicId){
          getApp().addchapterplay(musicId)
        }
        this.setData({PlayList:data.data})
      })
    },
    // 自动播放下一曲
    nextPlay(chapterId , index){
      let PlayList = this.data.PlayList
      PlayList.forEach((item , index) => {
        if(PlayList.length == 0){
          this.bindshow()
          return
        }
        if(item.chapterId === chapterId){
          if(index === PlayList.length - 1){
            index = 0 

          }else{
             index++
          }
          wx.setStorageSync('musicId', {musicId:PlayList[index].chapterId})
          this.bindshow()
        }
      });
    },
    // 点击移除章节
    bindClearplay(e){
      let index = e.currentTarget.dataset.playlistindex
      let id = e.currentTarget.dataset.playid
      let PlayList = App.globalData.PlayList
      let url = appUrl + 'chapterplay/app/delete'
      let { musicId }  = wx.getStorageSync('musicId')
      if(musicId == PlayList[index].chapterId){
        if(PlayList.length > 1 ){
          wx.setStorageSync('musicId', {musicId:PlayList[index+1].chapterId})
          this.setData({isshow: !this.data.isshow})
          this.bindshow()
        }else{
          wx.setStorageSync('musicId', {musicId:PlayList[0].chapterId || ''})
          this.setData({isshow: !this.data.isshow})
          this.bindshow()
        }
      }
      listen.request_n_get(url,{id},res=>{
        if (res.statusCode === 200 && res.data.code === 0) {
        console.log('删除单个章节',res)
        }
      })
      PlayList.splice(index,1)
      App.globalData.PlayList = PlayList
      // 如果全部清空首页audio组件隐藏
      if(PlayList.length == 0){
        wx.setStorageSync('musicId', {})
        App.globalData.isPlay = false
        App.getAudioBackMusic(false)
        this.triggerEvent('triggerishide' , false)
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
      this.setData({PlayList})
    },
    //点击全部清空
    bindClearAll(){
      let PlayList = ''
      let url = appUrl + 'chapterplay/app/deleteAll'
      let userId = App.globalData.userId
      let that = this
     wx.showModal({
      title:'提示',
      content:'确定清空播放列表吗',
      success:res=>{
        if(res.confirm){
          wx.setStorageSync('musicId', {})
          App.globalData.isPlay = false
          App.getAudioBackMusic(false)
          wx.switchTab({
            url: '/pages/home/home',
          })
          listen.request_n_get(url,{userId},res=>{
            if (res.statusCode === 200 && res.data.code === 0) {
            console.log('清空全部列表接口调用成功',res)
            that.triggerEvent('triggerishide' , false)
            }
          })
          App.globalData.PlayList = PlayList
          this.setData({PlayList})
        }
      }
    })
   },
    // 获取正在播放章节id
    bindgetPlayaudio(e){
      let nowPlayaudio = e.currentTarget.dataset.nowplayaudio
      let { musicId } = wx.getStorageSync('musicId')
      if(musicId != nowPlayaudio){
        App.globalData.currentTime = 0
        wx.getBackgroundAudioManager().seek(0)
      }
      wx.navigateTo({
        url: '/pages/home/audio/audio?nowPlayaudio=' + nowPlayaudio,
      })
    },
  },
})