import listen , { appUrl } from '../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticList:[],
    unnumList:[],
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 获取小程序消息列表数据
  getinformationsdataList(){ 
    let userId = App.globalData.userId
    let url = appUrl + 'notice/applet/pageAndDataNum?userId=' + userId
    // 获取消息首页数据
    listen.request_n_get(url,{},(res)=>{
     if(res.data.code == 0){
      let noticList = res.data.data.noticList
      // 未读消息数量
      let unnumList = res.data.data.unnumList
      this.setData({noticList,unnumList})
      this.changeinformationdata(unnumList)
     }
    })
  },
  // 修改消息状态的数据处理
  changeinformationdata(unnumList){
    let _List = [
      {num:null,typeName:'新增点赞',type:1},
      {num:null,typeName:'新增关注',type:2},
      {num:null,typeName:'新增评论和@',type:3},
      {num:null,typeName:'新增收藏',type:4},
    ] 
    if(unnumList){
    for(let i = 0;i<unnumList.length;i++){
      if(unnumList[i].type == 1 ){
        _List[0].num = unnumList[i].num
      }
      if(unnumList[i].type == 2){
        _List[1].num = unnumList[i].num
      }
      if(unnumList[i].type == 3){
        _List[2].num = unnumList[i].num
      }
      if(unnumList[i].type == 4){
        _List[3].num = unnumList[i].num
      }
    }
  }
    this.setData({unnumList:_List})
  },
  //listen/notice/applet/typeList";//小程序赞/收藏/新增关注/评论与@消息列表（参数 map）
  bindnavgator(){
    let url = './informationDetails/informationDetails'
    App.haveUserToken(url)

  },
  // 关注
  bindnavgetorNewConcerns(){
 
    let  url = './NewsConcerns/NewConcerns'
      App.haveUserToken(url)

  },
  bindnavgetorPraiseAndCollection(){
    // 点赞
 let  url = './PraiseAndCollection/PraiseAndCollection'
App.haveUserToken(url)
  },
  //评论
  bindnavgetorCommentsReceived(){
      let url =  './CommentsReceived/CommentsReceived'
      App.haveUserToken(url)
  },
  //收藏
  bindnavgetorNewCollection(){
       let url =  './newcollection/newColloection'
       App.haveUserToken(url)
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
    this.getinformationsdataList()
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