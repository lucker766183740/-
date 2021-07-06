// pages/myself/userSet/AccountAndSecurity/updatePassword/updatePassword.js
import listen from '../../../../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:'',
    value2:'',
    value3:'',
    activeClolr1:'',
    activeClolr2:'',
    activeClolr3:'',
    color1:'',
    color2:'',
    color3:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取焦点时下划线颜色
  bindfocus(e){
    let index = e.currentTarget.dataset.index
    if(index == 0){
      this.setData({ activeClolr1:'#2A82E4' ,color1:''})
    }else if(index == 1 ){
      this.setData({activeClolr2:'#2A82E4',color2:''})
    }else if(index == 2){
      this.setData({activeClolr3:'#2A82E4',color3:''})
    }
  },
  // 失去焦点获取用户输入的内容
  bindchangeValue(e){
    let index = e.currentTarget.dataset.index
    let { value } = e.detail
    let value1 = this.data.value1
    let value2 = this.data.value2
    let value3 = this.data.value3
   if(index == 0){
     value1 = value
     if(value.trim()){
       this.setData({activeClolr1:'#eee',color1:'',value1})
      }else{
        this.setData({activeClolr1:'red'})
        return
      }
   }
   if(index == 1){
     value2 = value
     if(value.trim() && (value == value1)){
        this.setData({activeClolr1:'red',activeClolr2:'red',color2:'red',color1:'red',value2})
        return
      }
     if(!value.trim()){
        this.setData({activeClolr2:'red' , color2:'red'})
        return
      }else{
        this.setData({value2 , activeClolr2:'#eee',color2:'',activeClolr1:'#eee',color1:''})
      }
  }
   if(index == 2){
     value3 = value
     if(value.trim() && (value != value2)){
       this.setData({activeClolr2:'red',activeClolr3:'red',color3:'red',color2:'red',value3})
       return
     }
     if(!value.trim()){
       this.setData({activeClolr3:'red',color3:'red'})
       return
     }else if(value.trim() && value == value2){
       this.setData({activeClolr3:'#eee',color3:'',value3,activeClolr2:'#eee',color2:''})
     }
   }
  },
  // 点击忘记密码
  bindForget(){
    wx.redirectTo({
      url: './Forgetpassword/Forgetpassword',
    })
  },
  // 点击完成
  bindfilsh(){
    let value1 = this.data.value1
    let value2 = this.data.value2
    let value3 = this.data.value3
    if(!value1.trim()){
      let content = '原密码不能为空'
      let activeColor = {activeClolr1:'red'}
      this.showModal(content , activeColor)
    }else if(!value2.trim()){
      let content = '新密码不能为空'
      let activeColor = {activeClolr2:'red'}
      this.showModal(content , activeColor)
    }else if(!value3.trim()){
      let content = '请再次确认新密码'
      let activeColor = {activeClolr3:'red'}
      this.showModal(content , activeColor)
    }else if( value1.trim() && value2.trim() && value3.trim()){
      wx.showLoading({
        title: '修改中...',
      })
      let url = listen.appUrl2 + 'sys/user/updatePassword'
      let userList = wx.getStorageSync('userList')
      let newPassword = value2
      let password = value1
      listen.request_n_post(url , { id:userList.id , newPassword , password
      },res=>{
        wx.hideLoading()
        if(res.data.code == 0){
          wx.setStorageSync('token', {})
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }else{
          wx.showModal({
            content:res.data.msg
          })
        }
      })
    }
  },
  // 封装弹窗方法
  showModal(content , activeColor){
    let that = this
    wx.showModal({
      cancelColor: 'red',
      content:content
    })
    that.setData(activeColor)
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