// components/newcommment/newcomment.js
Component({
  properties:{
    List:Array
  },
  data:{},
  attached(){},
  methods:{
    // 跳转用户详细信息页
    bindnavgator(e){
      let othId = e.currentTarget.dataset.othid
 
      let  url =  '/pages/information/useContent/userContent?othId=' + othId
      getApp().haveUserToken(url)
  },
  //点击图片跳转至其他页面
  bindnavigator(e){
    let id = e.currentTarget.dataset.informationid
    let userId = getApp().globalData.userId
    wx.navigateTo({
      url: '/pages/channel/userDetails/userDetails?id=' + id + '&userId=' + userId
    })
  },
}
})