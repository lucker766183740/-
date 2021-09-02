import listen from '../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userdata:{},
    likeAndcollectionisshow:''
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
    // 登陆成功后获取用户信息
    getuserdata(){
      let { username } = wx.getStorageSync('token')
      let url = listen.appUrl2 +'sys/user/getByOpenId'
      listen.request_n_get(url,{
        username
      },res=>{
        // console.log('获取用户信息接口',res)
        if(res.data.code == 0){
          let userdata = res.data.data
          userdata._rankLevel = getApp().rankLevel(userdata.score)
          this.setData({userdata:res.data.data})
        }
      })
    },
  bindnavgetorreadlog(){

    let  url = './readlog/readlog'
    App.haveUserToken(url)
  },
  bindnavgetorediting(){
    let  url= './editingMaterials/editingMaterials'
    App.haveUserToken(url)
  },
  bindnavgetoruserSet(){
    let url = './userSet/userSet'
    App.haveUserToken(url)
 
  },
  bindnavgetorintegral(){
    let url =  './integral/integral'
    App.haveUserToken(url)
  },
  bindnavgetormyCollection(){
    let url =  './myCollection/myCollection'
    App.haveUserToken(url)
  },
  bindnavgetorlistenReport(){
    let url =  './listenReport/listenReport'
    App.haveUserToken(url)
  },
  // 积分任务
  bindnavgetorTask(){
    let url =  './integralTask/integralTask'
    App.haveUserToken(url)
  },
  //个人成就
  bindnavgetorachievement(){
    let url =  './achievement/achievement'
    App.haveUserToken(url)
  },
  // 跳转用户详情
  navgetoruserdetail(){
    let othId = wx.getStorageSync('userList').id
    let  url =  '/pages/information/useContent/userContent?othId=' + othId 
    App.haveUserToken(url)
  },
  // 用户关注，积分，粉丝 页面提走转
  /** 
   * 
   * @param {*} type = 1 积分 ； 2 关注 ； 3 粉丝
   */
  bindnavgetdetails(e){
    let type = e.currentTarget.dataset.type
    let url 
    let userId = App.globalData.userId
    if(type == 1){
      url = './integral/integral?type=' + type
    }else if(type == 2){
      url = './myfollowAndfans/myfollowAndfans?type=' + type + '&userId=' + userId
    }else if(type == 3){
      url = './myfollowAndfans/myfollowAndfans?type=' + type + '&userId=' + userId
    }else if(type == 4){
      this.setData({likeAndcollectionisshow:'isshow'})
    }
  App.haveUserToken(url)
  },
  // 点击显示被赞誉收藏提示框
  bindisshowlikeandcollection(){
    this.setData({likeAndcollectionisshow:''})
  },
  //获取子组件传参
  triggerEvent(e){
    let  isshow  = e.detail.isshow
    this.setData({likeAndcollectionisshow:''})
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
    this.getuserdata()
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