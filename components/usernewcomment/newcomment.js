// components/newcommment/newcomment.js
Component({
  properties:{
    List:Array,
    Type:String || Number
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
    // console.log(e)
    let id = e.currentTarget.dataset.informationid
    let typeItem = e.currentTarget.dataset.typeitem
    let userId = getApp().globalData.userId
    // if(typeItem == 2){ //回复评论时跳转更多评论页（待完善）
    //   wx.navigateTo({
    //     url: '/pages/channel/userDetails/Moreusercomment/Moreusercomment'
    //   })
    //   return
    // }
    wx.navigateTo({
      url: '/pages/channel/userDetails/userDetails?id=' + id + '&userId=' + userId
    })
  },
}
})