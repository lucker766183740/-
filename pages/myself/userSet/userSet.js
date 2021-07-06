// pages/myself/userSet/userSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setList:['账号与安全','隐私设置','青少年模式','使用说明','客服与帮助'],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击跳转页面
  bindnavgetorother(e){

    let setList = this.data.setList
    let item = e.currentTarget.dataset.item
    setList.forEach(v=>{
      if(v == '账号与安全' && item == '账号与安全'){
        wx.navigateTo({
          url: './AccountAndSecurity/AccountAndSecurity',
        })
      }else if(v == '隐私设置' && item == '隐私设置'){
        wx.navigateTo({
          url: './settingPrivacy/settingPrivacy',
        })
      }else if(v == '青少年模式' && item == '青少年模式'){
        wx.navigateTo({
          url: './TeenModel/TeenModel',
        })
      }else if(v == '使用说明' && item == '使用说明'){
        wx.navigateTo({
          url: './Instructions/Instructions',
        })
      }else if(v == '客服与帮助' && item == '客服与帮助'){
        wx.navigateTo({
          url: './ServiceAndHelp/Service',
        })
      }
    })
  },
  // 点击退出小程序
  bindexit(){
    wx.showModal({
      content:'确定要退出吗？',
      success(res){
        if(res.confirm){
          if(getApp().globalData.isPlay){
            wx.stopBackgroundAudio()
            getApp().globalData.isPlay = false
          }
          getApp().globalData = {}
          wx.clearStorageSync()
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
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