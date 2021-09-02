// pages/myself/userSet/AccountAndSecurity/updatePassword/Forgetpassword/Forgetpassword.js
import listen from '../../../../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[
      {name:'手机号',placeholder:'请输入手机号',value:'',activecolor:false,regisok:false,maxlength:11,type:'number'},
      {name:'验证码',placeholder:'请输入验证码',value:'',activecolor:false,regisok:false,maxlength:4 ,type:'number'},
      {name:'新密码',placeholder:'请输入新密码',value:'',activecolor:false,regisok:false,maxlength:18,type:'password'},
      {name:'确认密码',placeholder:'请确认新密码',value:'',activecolor:false,regisok:false,maxlength:18,type:'password'},
    ],
    msgcode:'获取验证码',
    value:'',
    bindisok:true,
    newpassword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击获取验证码
  bindmsgcode(){
    let msgcode = 300
    let bindisok = this.data.bindisok
    let url = listen.appUrl2 + 'sys/user/send/code'
    let phone = this.data.List[0].value
    let regisok = this.data.List[0].regisok
    if(bindisok && regisok){   
      let timer = setInterval(()=>{
        this.setData({msgcode:msgcode-- + 's'})
      },1000)
      setTimeout(()=>{
        clearInterval(timer)
        this.setData({msgcode:'获取验证码',bindisok:true})
        
      },301000)
      this.setData({bindisok:false })
      listen.request_n_get(url,{
        phone
      },res=>{
          console.log('获取验证码接口调用成功：',res)
      })
    }else{
    wx.showModal({
      content:'手机号格式不正确',
      showCancel:false
    })

    }

  },
  // 点击完成按钮 sys/user/code/newPassword;//验证码修改密码(参数  phone：""，code：""，password："")
  bindfilsh(){
    let List = this.data.List
    let update = false
    let url = listen.appUrl2 + 'sys/user/code/newPassword'
    let phone = List[0].value
    let code = List[1].value
    let password = List[2].value
    for(let i = 0; i < List.length ; i++){
      if( List[i].regisok){
        update = true
      }else{
        update = false
        wx.showToast({
          title: `${List[i].placeholder}`,
          icon:'none'
        })
        return
      }
    }
    if(update){
      // 验证码修改密码(参数  phone：""，code：""，password："")
      listen.request_n_get(url,{
        code,
        phone,
        password,
      },res=>{
        // console.log('修改密码接口调用成功',res)
        if(res.data.code == 0){
          wx.showToast({
            title: '修改成功',
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }else{
          wx.showModal({
            title:'提示',
            content:res.data.msg,
            showCancel:false
          })
        }
      })
    }
  },
  // 获取焦点改变下划线颜色
  bindfocus(e){
    let index = e.currentTarget.dataset.index
    let List = this.data.List
    List.forEach((v,i)=>{
      if(index == i){
        v.activecolor = true
        v.regisok = true
      }else{
        v.activecolor =false
      }
    })
    this.setData({List})
  },
  // 失去焦点
  bindblur(e){
    let newpassword = this.data.newpassword
    let index = e.currentTarget.dataset.index
    let { value } = e.detail
    let List  = this.data.List
    List.forEach((v,i)=>{
      if(i == index){
        v.value = value
        v.activecolor = false
        if(i == 0 && index == 0){
          let reg = /^[1][34578][0-9]{9}$/
          if(!reg.test(v.value)){
            v.regisok = false
          }else{
            v.regisok = true
          }
        }else if(i == 2 && index == 2){
          this.setData({newpassword:v.value})
        }else if(i == 3 && index == 3){
          if(newpassword != v.value){
            v.regisok = false
            wx.showToast({
              title: '两次密码输入不一致',
              icon:'none'
            })
          }
        }
      }
    })
    this.setData({List})
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