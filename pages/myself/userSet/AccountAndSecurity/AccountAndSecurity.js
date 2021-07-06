// pages/myself/userSet/AccountAndSecurity/AccountAndSecurity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AccountList:['修改密码','登录手机号']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击跳转详情
  bindnavgetordetails(e){
    let item = e.currentTarget.dataset.item
    let AccountList = this.data.AccountList
    AccountList.forEach(v=>{
      if(v == '修改密码' && item == '修改密码'){
        wx.navigateTo({
          url: './updatePassword/updatePassword',
        })
      }else if(v == '登录手机号' && item == '登录手机号'){
        wx.navigateTo({
          url: './loginPhone/loginPhone',
        })
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