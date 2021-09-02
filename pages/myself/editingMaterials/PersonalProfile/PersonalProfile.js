// pages/myself/editingMaterials/PersonalProfile/PersonalProfile.js
import listen , { appUrl2 } from '../../../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let value = options.value
    this.options = options
    this.setData({value:value == '这个人很懒，什么也没有留下~' ? '' : value})
  },
  // 文本域输入事件
  bindinput(e){
    let value = e.detail.value
   this.setData({value})
  },
  // 点击完成后触发的事件
  bindfinish(){
    let type = this.options.type
    let url 
    let value = this.data.value
    if(type == 1){ url = appUrl2 + 'sys/user/updateApplet'}//修改
    if(type == 0){
      App.globalData.Signature = value
      wx.navigateBack({
        delta:1
      })
      return
    }//注册

    let id = App.globalData.userId
    if(value.trim()){
      listen.request_n_post(url,{
        id,
        personalMessage:value
      },res=>{
        // console.log('修改用户签名接口调用成功：',res)
        if(res.data.code == 0){
          wx.showToast({
            title: '修改成功',
            icon:'success'
          })
          // ....需要保存服务器
          wx.navigateBack({
            delta: 1,
          })
      }
    })
  }else{
    wx.showToast({
      title: '签名为空，修改失败',
      icon:'none'
    })
  }
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