// pages/myself/editingMaterials/editingMaterials.js
import listen , { appUrl , appUrl2 } from '../../../utils/request'
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //usertype  0,：学生，1：家长，2：教师，3：游客，4：管理员
    //学生：用户名 ， 学号，姓名 ，个性签名 ， 性别 ，班级 ， 学校 ，
    // 家长：用户名 ， 姓名 ， 个性签名 ，性别 ，电话
    // 教师： 用户名 ，姓名 ，个性签名 ， 性别 ，电话 ， 班级 ，学校
        userDetailsList:[],
        temFilePaths:'',//用户上传头像
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserdata()
  },
    // 获取用户信息
    getuserdata(){
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
      let { username } = wx.getStorageSync('token')
      let url = listen.appUrl2 +'sys/user/getByOpenId'
      listen.request_n_get(url,{
        username
      },res=>{
        wx.hideLoading()
        // console.log('获取用户信息接口',res.data.data)
        if(res.data.code == 0){
          let userdata = res.data.data
          this.setData({ temFilePaths:userdata.headUrl ? userdata.headUrl : '/image/headUrl.jpg',})
          if(userdata.userType == 0){
            // 学生
            this.setData({
              userDetailsList:[
                {name:'用户名',type:userdata.username},
                {name:'名字',type:userdata.realName},
                {name:'性别',type:userdata.gender == 1 ? '女' : '男'},
                {name:'学号',type:userdata.educationId},
                {name:'班级',type:userdata.learnYear + userdata.className},
                {name:'学校',type:userdata.schoolName},
                {name:'个性签名',type:userdata.personalMessage ? userdata.personalMessage :'这个人很懒，什么也没有留下~'},
              ]
            })
          }else if(userdata.userType == 1){
            // 家长
            this.setData({
              userDetailsList:[
                {name:'用户名',type:userdata.username},
                {name:'名字',type:userdata.realName},
                {name:'性别',type:userdata.gender == 1 ? '女' : '男'},
                {name:'手机号',type:userdata.mobile ? userdata.mobile : '无'},
                {name:'个性签名',type:userdata.personalMessage ? userdata.personalMessage :'这个人很懒，什么也没有留下~'},
              ]
            })
          }else if(userdata.userType == 2){
            // 教师
            this.setData({
              userDetailsList:[
                {name:'用户名',type:userdata.username},
                {name:'名字',type:userdata.realName},
                {name:'性别',type:userdata.gender == 1 ? '女' : '男'},
                {name:'手机号',type:userdata.mobile ? userdata.mobile : '无'},
                {name:'班级',type:userdata.learnYear + userdata.className},
                {name:'学校',type:userdata.schoolName},
                {name:'个性签名',type:userdata.personalMessage ? userdata.personalMessage :'这个人很懒，什么也没有留下~'},
              ]
            })
          }else if(userdata.userType == 3){
            // 游客
          }else if(userdata.userType == 4 ){
            // 管理员
            this.setData({
              userDetailsList:[
                {name:'用户名',type:userdata.username},
                {name:'名字',type:userdata.realName},
                {name:'性别',type:userdata.gender == 1 ? '女' : '男'},
                {name:'手机号',type:userdata.mobile ? userdata.mobile : '无'},
                {name:'班级',type:userdata.learnYear + userdata.className},
                {name:'学校',type:userdata.schoolName},
                {name:'个性签名',type:userdata.personalMessage ? userdata.personalMessage :'这个人很懒，什么也没有留下~'},
              ]
            })
          }
        }
      })
    },
// 点击修改头像
  bindchangeHeadimage(){
    let that = this
let url = appUrl2 + 'oss/file/upload'
let { token } = wx.getStorageSync('token')
wx.chooseImage({
  count: 1,
  type:'image',
  success:res=>{
    let temFilePaths = res.tempFilePaths
    //上传服务器
    wx.uploadFile({
      filePath: temFilePaths[0],
      name: 'file',
      url: url,
      header: {
        "Content-Type":"application/json",
        "Authorization": token
      },
      formData:{
        'fileType':'image'
      },
      success:res=>{   
        let data = JSON.parse(res.data)
        that.setData({temFilePaths:data.data.url})
        that.userupdateApplet()
      }
    })
  }
})
  },
//修改用户信息
  userupdateApplet(){
    wx.showLoading({
      title: '上传中···',
      mask:true
    })  
    let url = appUrl2 + 'sys/user/updateApplet'
 	  let headUrl = this.data.temFilePaths.toString() // 头像,
    let id = App.globalData.userId // 主键id,
    listen.request_n_post(url,{
      id,headUrl
    },res=>{
      wx.hideLoading()
      if(res.data.code == 0){
        // console.log('用户信息修改成功',res)
        wx.showToast({
          title: '头像上传成功',
          icon:'success'
        })
      }else{
        wx.showToast({
          title: '上传失败',
          icon:'none'
        })
      }
    })
      },
      // 返回我的箭头事件
  bingdnavgeback(){
    wx.switchTab({
      url: '../myself',
    })
  },

  bindnavgetorprofile(){
    let userDetailsList = this.data.userDetailsList
    let value = userDetailsList.filter((v,i)=>{return v.name == '个性签名'})
    let type = 1 //用于标识用户注册或者修改信息，修改：1 ， 注册：0
    wx.navigateTo({
      url: './PersonalProfile/PersonalProfile?type=' + type + '&value=' + value[0].type,
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
    this.getuserdata()
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