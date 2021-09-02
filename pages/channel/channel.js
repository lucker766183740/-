// pages/channel/channel.js
import listen, { appUrl } from '../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isactive:'bindactive2',
    activeindex:1,
    swiperData:[],
    Title:'',
    GZ_Title:'关注小组',
    Teamlist:[],
    userPublishList:[],
    GZshow:false,
    GZ_teamlist:[],
    GZ_userPublishList:[],
    page:1,
    GZ_page:1,
    limit:10,
    total:0,
    GZ_total:0,
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getDataList()
    this.getswiperdataList()
    this.getinformatgroupList()
    this.getinformationpublishList()
  },
  // 获取轮播图数据
   getswiperdataList(){
    let url = appUrl + 'carousel/app/page?category=1' 
     listen.request_n_get(url,{},({data})=>{
      let swiperData = data.data
     this.setData({swiperData:swiperData.list})
    })
  },
  // 获取发布圈子列表数据
   getinformationpublishList(){
     wx.showNavigationBarLoading()
     wx.showLoading({
       title: '加载中...',
       mask:true
     })
     let page = this.data.page
     let limit = this.data.limit
    let userId = getApp().globalData.userId
    let url = appUrl + 'informationpublish/app/list?userId='
     listen.request_n_get(url,{
       userId,page,limit
     },({data})=>{
       if(data.code == 0){
       wx.hideLoading()
       wx.hideNavigationBarLoading()
      //  wx.stopPullDownRefresh()
       let Title = '听吧小组'
       let total = data.data.total
      //  Teamlist = Teamlist.splice(10)
       let _userPublishList = data.data.list
      //  console.log(_userPublishList)
        // topicName / topicId / imageUrl
        _userPublishList.forEach((item,index)=>{
          if(item.topicName){item.topicName = (item.topicName.split(','))}
          if(item.topicId){ item.topicId = (item.topicId.split(','))}
          if(item.imageUrl){ item.imageUrl = (item.imageUrl.split(','))} 
          item._title = item.title 
          item._isshow = false
          if(item.topicName && (item.title.length + item.topicName.toString().length) > 20){
            item._title = (item._title + item.topicName.toString()).slice(0,20)
            item._isopen = true
          }else{
            item._isopen = false
          }
          // if(item.imageUrl){ item.imageUrl = ["https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg"]}         
        })
        let userPublishList = this.data.userPublishList
        userPublishList.push(..._userPublishList)
      this.setData({userPublishList,Title,total})
      }else{
        wx.showToast({
          title: data.msg,
          icon:'none',
        })
      }
    })
  },
  //获取话题小组数据
  getinformatgroupList(){
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let page = this.data.page
    let limit = this.data.limit 
    let userId = getApp().globalData.userId
    let url = appUrl + 'topicgroup/app/list'
    listen.request_n_get(url,{
      userId,page,limit
    },({data})=>{
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      let Teamlist = data.data.list
      this.setData({Teamlist})
    })
  },
  // 获取关注圈子数据
  //  getDataList(){
  //   let url = appUrl + 'topicgroup/app/list'
  //    listen.request_n_get(url,{},({data})=>{
  //     let Teamlist = data.data
  //     Teamlist.splice(4)
  //     this.setData({Teamlist})
  //   })
  // },
  // 获取关注页数据 GZ_
  GZ_getDataList(){
    let url = appUrl + 'informationpublish/app/attentionList'
    let userId = getApp().globalData.userId
    let page = this.data.GZ_page
    let limit = this.data.limit
    listen.request_n_get(url,{
      userId,page,limit
    },({data})=>{
      let GZ_total = data.data.total
      let _userPublishList= data.data.list
      console.log(_userPublishList)
      _userPublishList.forEach((item,index)=>{
        if(item.topicName){item.topicName = (item.topicName.split(','))}
        if(item.topicId){ item.topicId = (item.topicId.split(','))}
        if(item.imageUrl){ item.imageUrl = (item.imageUrl.split(','))} 
        item._title = item.title
        item._isshow = false
        if((item.topicName && item.title.length + item.topicName.toString().length) > 55){
          item._title = (item.title + item.topicName.toString()).slice(0,55)
          item._isopen = true
        }else{
          item._isopen = false
        }
        // if(item.imageUrl){ item.imageUrl = ["https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg","https://zxdfedu.oss-accelerate.aliyuncs.com/image/20210225/74b70aba3a95497884623f0c306265a2.jpg"]}         
      })
      let GZ_userPublishList = this.data.GZ_userPublishList
      GZ_userPublishList.push(..._userPublishList)
    this.setData({GZ_userPublishList,GZ_total})
    })
  },
  // 获取关注小组数据
  GZ_getinformatgroupList(){
    let userId = getApp().globalData.userId
    let url = appUrl + 'topicgroup/app/attentionList'
    let page = this.data.page
    let limit = this.data.limit
    listen.request_n_get(url,{
      userId,page,limit
    },({data})=>{
      let GZ_teamlist = data.data.list
     this.setData({GZ_teamlist})
    })
  },
  // 选择激活的页面
  bindactive(e){
    let active = e.target.dataset.active1;
    let token = wx.getStorageSync('token')
   if(active == 1){
     this.setData({
       isactive:'bindactive2',
       activeindex:1,
       GZshow:false,
       GZ_userPublishList:[]
      })
    }
    // let url = true
    // getApp().haveUserToken(url)
    if(active == 2 ){
      if(token){
        this.GZ_getDataList()
        this.GZ_getinformatgroupList()
           this.setData({
             isactive:'',
             activeindex:2,
             GZshow:true,
            })
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
 
   } 
  },
  bindrelease(){
  let url =  './release/release'   
    getApp().haveUserToken(url)
  },
  // 点击全部跳转关注小组全部
  bindnavAllGroup(){
    let isActive = 2
    wx.navigateTo({
      url: './moreTeam/moreTeam?isActive=' + isActive,
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
    // this.setData({
    //   userPublishList:[],
    //   isactive:'bindactive2',
    //   activeindex:1,
    //   active:1,
    //   GZshow:false,
    //   GZ_userPublishList:[]
    // })
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
    if(this.data.activeindex == 1){
      this.setData({
        userPublishList:[],
        page:1,
        isactive:'bindactive2',
        activeindex:1,
        active:1,
        GZshow:false,
        GZ_userPublishList:[]
      })
    }else{
      this.setData({
        userPublishList:[],
        isactive:'',
        activeindex:2,
        active:2,
        GZshow:true,
      })
    }
    this.getswiperdataList()
    this.getinformatgroupList()
    this.getinformationpublishList()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(){
    let page = this.data.page
    let total = this.data.total
    let limit = this.data.limit
    let GZ_total = this.data.GZ_total
    let activeindex = this.data.activeindex
    let GZ_page = this.data.GZ_page
    if(page * limit <= total && activeindex == 1){
      page++
      this.setData({page})
      this.getinformationpublishList()
    }else if(GZ_page * limit <= GZ_total && activeindex == 2){
      GZ_page++
      this.setData({GZ_page})
      this.GZ_getDataList()
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