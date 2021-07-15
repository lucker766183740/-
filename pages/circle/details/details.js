// pages/circle/details/details.js
import listen, {
  appUrl
} from '../../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: '',
    ishide: 'active_hide',
    active: 'active',
    unactive: '',
    deg: '',
    labelheight: 0,
    chapter: 0, //正在播放的章节
    activeBgcolor: '', 
    Collection: false,
    listenList: [],
    nowPlayaudio:'',
    ishidden: true, //显示展开属性控制
    isopen:true //显示展开或收起
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options
    this.getOtherdataList(options)
    //获取用户收藏状态信息
  },
  //获取其他页面传递参数
  getOtherdataList(options) {
    let bookdetailId = options.id
    // 排序方式，默认为正序
    let order = 'asc' //asc   desc
    let url = appUrl + 'booklist/app/bookChapater?id=' + bookdetailId + '&order=' + order + '&userId=' + App.globalData.userId
    listen.request_n_get(url, {}, ({data}) => {
      let listenList = data.data
      let _content = listenList.briefIntroduction
      let isopen = this.data.isopen
      let musicId = wx.getStorageSync('musicId')
      listenList._content = listenList.briefIntroduction
      if(_content.length>57 && isopen){
        this.setData({ishidden:false})
         _content = _content.slice(0,57)
        listenList._content = _content
      }
      if(musicId.musicId){
        listenList.chapterList.forEach(item=>{
          if(musicId.musicId === item.id){
            this.setData({activeBgcolor:'details-bgpink' , nowPlayaudio:item.id})
          }
        })
      }
      this.setData({
        listenList: [listenList],
        Collection: listenList.haveCollect //获取收藏状态
      })
      wx.setNavigationBarTitle({
        title: this.data.listenList[0].name
      })
    })
  },
  // 查看书目大图
  bindSeeLogimg(e){
   let url = e.currentTarget.dataset.url
   wx.previewImage({
     urls: [url],
   })
  },
  //收藏
  bindCollection() {
    let id = this.data.listenList[0].id
    let Collection = !this.data.Collection
    let listenList = this.data.listenList
    listenList.forEach(v=>{
      if(Collection){
        v.collectNum++
      }else{
        v.collectNum--
      }
    })
    App.userCollection(id, 0, Collection,null)
    if (Collection) {
      wx: wx.showToast({
        title: '已收藏',
        icon: 'success',
      })
    }
    else {
      wx: wx.showToast({
        title: '取消收藏',
        icon: 'none',
      })
    }
    wx.setStorageSync('data', {
      Collection
    })
    this.setData({
      Collection,listenList
    })
  },
  // 章节与详情点击切换
  bindtapshow() {
    this.setData({
      isshow: "active_show",
      ishide: "active_hide",
      active: 'active',
      unactive: ''
    })
  },
  // 章节与详情点击切换
  bindtaphide() {
    this.setData({
      isshow: "active_hide",
      ishide: "active_show",
      active: '',
      unactive: "active"
    })
  },
  // 点击排序
  bindsort() {
    let listenList = this.data.listenList
    this.data.listenList[0].chapterList = this.data.listenList[0].chapterList.reverse()
    if (this.data.deg) {
      this.setData({
        deg: '',
        listenList
      })
    } else {
      this.setData({
        deg: 'binddeg',
        listenList
      })
    }
  },
  // 播放全部
  bindaudioAll(e) {
    let listenList = this.data.listenList
    let url = appUrl + 'chapterplay/saveAll'
    // 添加书目到播放列表
    listen.request_n_get(url, {
      bookListId: listenList[0].id,
      userId: App.globalData.userId
    }, (res) => {
      console.log('成功添加图书', res)
      if(res.data.code == 0){
      let  { musicId } =  wx.getStorageSync('musicId')
      if(musicId != listenList[0].chapterList[0].id){ App.globalData.currentTime = 0 }
        wx.navigateTo({
          url: '../../home/audio/audio?nowPlayaudio=' + listenList[0].chapterList[0].id,
        })
      }
    })
    //创建背景音乐播放实例、需要数据 isplay(播放状态) , data(播放数据) , fn（背景音乐实例的回调函数） 
    // let nowPlayaudio = listenList[0].chapterList[0].id
    // App.getAudioBackMusic(true, listenList[0].chapterList[0] , ((e) => {
    //   e.onPlay(() => {
    //     getApp().globalData.isPlay = true
    //     this.setData({
    //       activeBgcolor: 'details-bgpink',
    //       nowPlayaudio
    //     })
    //   })
    //   e.onPause(() => {
    //     this.setData({
    //       activeBgcolor: '',
    //     })
    //   })
    // }))
    // wx.setStorageSync('musicId', { musicId })
  },
  // 点击章节获取播放章节内容
  bindgetTarget(e) {
    let chapter = e.currentTarget.dataset.chapter
    let nowPlayaudio = e.currentTarget.dataset.nowplayaudio
    // wx.setStorageSync('musicId', { musicId })
    this.setData({
      chapter,
      activeBgcolor:'details-bgpink'
    })
    let { musicId } = wx.getStorageSync('musicId')
    if(musicId != nowPlayaudio){ App.globalData.currentTime = 0 }
    wx.navigateTo({
      url: '/pages/home/audio/audio?nowPlayaudio=' + nowPlayaudio,
    })
  },
  isopenAll() {
    let isopen = !this.data.isopen
    this.setData({isopen})
    this.getOtherdataList(this.options)
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
    let { musicId } = wx.getStorageSync('musicId')
    let [ listenList ] = this.data.listenList
    if(musicId && listenList){
      listenList.chapterList.forEach(item=>{
        if(musicId == item.id){
          this.setData({activeBgcolor:'details-bgpink' , nowPlayaudio:item.id})
        }
      })
    }
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