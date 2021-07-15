// pages/login/login.js
import listen from '../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    username:'',
    password:'',
    grant_type:'password',
    login_type:'wechat', //sms 短信登录
    code:'',
    inputNameCon:{
      usernameType:'手机号 / 学籍号',
      usernameType_placeholder:'请输入手机号/学籍号',
    },
    inputPasswordCon:{
      passwordInput:'密码',
      password_placeholder:'请输入密码',
      vercode:'获取验证码',
      passwordtype:'password'
    },
    mobileType:'验证码登录',
    codeisshow:false,
    codeDisable:true // 控制是否可以点击获取验证码按钮和验证码登录按钮
    
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getStorageusertoken()
    wx.login({
      success: (res) => {
        this.setData({code:res.code})
      },
    })
  },
  // 如果用户登录成功了，下次可自动登录
  // getStorageusertoken(){
  //   let token = wx.getStorageSync('token')
  //   let userList = wx.getStorageSync('userList')
  //   if(token && userList){
  //     App.globalData.userId = userList.id
  //     let username = token.username
  //     let password = token.password
  //     this.setData({
  //       username,password
  //     })
  //     this.navdgatorNext()
  //   }
  // },
  // 点击登录后跳转页面
  navdgatorNext(){
    // 兴趣标签
    // let inrerstCard = wx.getStorageSync('inrerstCard')
    let codeisshow = this.data.codeisshow
    let url = listen.appUrl2 + 'auth/oauth/token'
    let username = this.data.username
    let password = this.data.password
    let grant_type = this.data.grant_type
    let login_type = this.data.login_type

    if(username.trim() && password.trim()){
      wx.showLoading({
        title: '正在登录...',
        mask:true
      })
      if(codeisshow){
        password = 'SMS_KSssdS1D145Sd4S'
      }
      listen.request_n_post_token(url,{
        username , password , grant_type,login_type,uuid: "",captcha: this.data.password,
      },res=>{
        wx.hideLoading()
        if(res.data.code == 0){
          let token = wx.getStorageSync('token')
           token = 'Bearer' + res.data.access_token
          wx.setStorageSync('token',{ token,password,username } )
          console.log('res.data:返回的token' , res.data)
          //获取用户信息及修改用户全局数据
          this.getloginuserdetails()
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            mask:true
          })
        }
      })
    }else if(login_type == 'wechat' && (!username.trim() || !password.trim())){
      wx.showToast({
        title: '学号或密码不能为空',
        icon:'none'
      })
  }else if(login_type == 'sms' && (!username.trim() || !password.trim())){
    wx.showToast({
      title: '验证码不能为空',
      icon:'none'
    })
  }

    // if(inrerstCard){
      // 跳转页面后获取用户授权
    //   return
    // }
    // wx.navigateTo({
    //   url: '/pages/home/interest/interest',
    // })
  },
  //获取用户信息并修改全局数据
  getloginuserdetails(){
    let { username } = wx.getStorageSync('token')
    let userList = wx.getStorageSync('userList') 
    let url = listen.appUrl2 + 'sys/user/getByOpenId'
    listen.request_n_get(url,{ username } , res =>{
      console.log('获取用户信息',res)
      if(res.data.code == 0 && res.data.data){
        let userinfo = res.data.data
        if(!userinfo.openId){
          this.getuserinfo()
        }
        wx.setStorageSync('userList', userinfo)
        // getApp().globalData.status = res.data.data.status
        getApp().globalData.tenantCode = res.data.data.tenantCode
        getApp().globalData.userId = res.data.data.id
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
      console.log('全局变量globalData', getApp().globalData)
    })
  },
  // 手机号、学籍号输入框
  bindblurAccount(e){
    let value = e.detail.value
      this.setData({username:value})
  },
  // 密码输入框
  bindblurPassword(e){
    // 最少8个字符，最多16个字符，必须有字幕和数字组合
    let value = e.detail.value
    this.setData({password:value})
  },
  // 点击验证码登录  ， 手机号  / 学籍号 登录切换
  bindmobileType(){
    let that = this
    let mobileType
    let inputNameCon = this.data.inputNameCon
    let inputPasswordCon = this.data.inputPasswordCon
    let codeDisable = this.data.codeDisable
    let login_type = this.data.login_type
    let codeisshow = !this.data.codeisshow 
    if(!codeDisable){ 
      wx.showModal({
        content:'正在获取验证码，退出将重新获取',
        success(res){
          if(res.confirm){
            codeDisable = true
            codeisshow = false
            inputNameCon.usernameType = '手机号 / 学籍号'
            inputNameCon.usernameType_placeholder = '请输入手机号 / 学籍号'
            inputPasswordCon.passwordInput = '密码'
            inputPasswordCon.password_placeholder = '请输入密码'
            inputPasswordCon.passwordtype = 'password'
            inputPasswordCon.vercode = '验证码登录'
            mobileType = '验证码登录'
            login_type = 'wechat'
            clearInterval(that.getvercode)
            clearTimeout(that.setTimer)
            that.setData({inputPasswordCon , codeDisable , password:'' , username:'' ,codeisshow})
          }
        }
            })
    }
      if(codeisshow && codeDisable){
        inputNameCon.usernameType = '手机号'
        inputNameCon.usernameType_placeholder = '请输入手机号'
        inputPasswordCon.passwordInput = '验证码'
        inputPasswordCon.password_placeholder = '请输入验证码'
        inputPasswordCon.passwordtype = 'number'
        inputPasswordCon.vercode = '获取验证码'
        mobileType = '密码登录'
        login_type = 'sms'
        this.setData({username:'',password:'',codeisshow})
      }else if(!codeisshow && codeDisable){
        codeDisable = true
        codeisshow = false
        inputNameCon.usernameType = '手机号 / 学籍号'
        inputNameCon.usernameType_placeholder = '请输入手机号 / 学籍号'
        inputPasswordCon.passwordInput = '密码'
        inputPasswordCon.password_placeholder = '请输入密码'
        inputPasswordCon.passwordtype = 'password'
        inputPasswordCon.vercode = '验证码登录'
        mobileType = '验证码登录'
        login_type = 'wechat'
        this.setData({username:'',password:'' , codeisshow})
      }
      this.setData({
        mobileType , inputNameCon , inputPasswordCon  , login_type
      })
  

  },
  //点击获取验证码
  bindgetvercode(){
    let inputPasswordCon = this.data.inputPasswordCon
    let codeDisable = this.data.codeDisable
    let url = listen.appUrl2 + 'sys/user/send/code'
    let username = this.data.username
    if(!username.trim()){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none',
        mask:true
      })
      return
    }
    if(codeDisable){
      inputPasswordCon.vercode = 300
      codeDisable = false
      this.setData({inputPasswordCon , codeDisable})
      this.getvercode = setInterval(()=>{
        inputPasswordCon.vercode--
        this.setData({inputPasswordCon})
      },1000)
      this.setTimer =  setTimeout(()=>{
        inputPasswordCon.vercode = '获取验证码'
        codeDisable = true
        this.setData({
          inputPasswordCon , codeDisable
        })
        clearInterval(this.getvercode)
      },300000)
      // 发送验证码
      listen.request_n_get(url,{
        phone:username
      },res=>{
        if(res.data.code == 0){
          console.log('验证码获取成功',res)
        }else{
          inputPasswordCon.vercode = '获取验证码'
          codeDisable = true
          this.setData({
            inputPasswordCon , codeDisable
          })
          clearInterval(this.getvercode)
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            mask:true
          })
        }
      })
    }

  },
  // 点击注册的时候选择身份
  bindnavgetorregister(){
    let index = null
    wx.showActionSheet({
      itemList: ['我是教师', '我是家长', '我是学生'],
      success (res) {
        index = res.tapIndex
          wx.navigateTo({
            url: '/pages/register/register?index=' + index,
          })
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 忘记密码
  bindnavgetorupdate(){
    wx.navigateTo({
      url: '/pages/myself/userSet/AccountAndSecurity/updatePassword/Forgetpassword/Forgetpassword',
    })
  },
  // 授权
  getuserinfo(){
    wx.getUserProfile({
      desc: '提高用户体验', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let userInfo = wx.getStorageSync('userInfo') || []
        App.globalData.userInfo = userInfo
        this.setData({userInfo})
        wx.setStorageSync('userInfo', res.userInfo)
        let url = listen.appUrl2 + 'sys/user/wechatInfo'
        listen.request_n_post(url,{
          id:App.globalData.userId,
          nickName:res.userInfo.nickName,
          gender:res.userInfo.gender,
          language:res.userInfo.language,
          city:res.userInfo.city,
          province:res.userInfo.province,
          country:res.userInfo.country,
          avatarUrl:res.userInfo.avatarUrl,
          code:this.data.code
        },res=>{
          console.log('上传成功',res)
        })
      },
      fail(err){
        console.log('授权失败',err)
      }
    })
  },
  //点击游客登陆
  bindvisSign(){
    wx.showModal({
      content:'正在建设中...',
      showCancel:false,
      confirmText:'我知道了'
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