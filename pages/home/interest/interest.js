// pages/home/interest/interest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 随机生成的颜色
    color:[],
    list:[
      {name:'文学',content:['青少年','杂志','娱乐','游戏','音乐','体育','咨询','美女','文学','少年','月刊']},
      {name:'社会',content:['开始','菜单','白菜','萝卜','西红柿','蔬菜','土豆','红薯','紫菜','青菜','韭菜']},
      {name:'美德',content:['青少年','杂志','娱乐','游戏','音乐','体育','咨询','美女','文学','少年','月刊']},
  ],
    isactive1:0,
    isactive2:0,
    // 用户选中的标签
    countCard:[],
  },
  bindnavgethome(){
    this.saveUserInterstCart()
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
 Color(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    let  rgba = 'rgba('+ r +','+ g +','+ b +',.8)';
    // this.setData({
    //   color:rgba
    // })
    return rgba;
  },
  cc(){
    var aa=[]
    for(let i=0;i<this.data.list[0].content.length;i++){
      aa.push(this.Color())
    }
    this.setData({
      color:aa
    })
  },
  // 自定义给数组添加控制背景色的变量
  getData(){
    let dataList = this.data.list
        dataList.forEach((item,index)=>{
          item.content.forEach((item2,index2)=>{
            item.content[index2] = [item.content[index2],false]
          })
        })
      this.setData({
        list:dataList
      })
  },
bindisactive(e){
  let isactive1 = e.currentTarget.dataset.setisactive1
  let isactive2 = e.currentTarget.dataset.setisactive2
  this.setData({
    isactive1,
    isactive2
  })
  let list = this.data.list
  if(list[isactive1].content[isactive2][1]){
    list[isactive1].content[isactive2][1] = false
    this.data.countCard=this.data.countCard.filter((val)=>{
     return val !== list[isactive1].content[isactive2][0]
    })
  }else{
    list[isactive1].content[isactive2][1] = true
    this.data.count++
    this.data.countCard.push(list[isactive1].content[isactive2][0])
  }
  this.setData({list})
  },
  // 保存兴趣标签
  saveUserInterstCart(){
    let inrerstCard = wx.getAccountInfoSync('inrerstCard') || []
    wx.setStorageSync('inrerstCard', this.data.countCard)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cc()
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (rgba) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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