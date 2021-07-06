// pages/register/register.js
import listen from '../../utils/request'
const App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: { 
    activePage:null, // 注册身份
    identity:'父亲', // 家长身份
    idenType:0,
    codemsg:'获取验证码',//验证码
    codeisok:true,
    Signature:App.globalData.Signature,
    password:'',//确认密码验证
    ParentsList:[
      {type:'学生教育ID', username:'请输入教育ID',value:'',redcolor:false,maxLength:'18',tt:'text',icon:''},
      {type:'家长姓名', username:'请输入家长姓名',value:'',redcolor:false,maxLength:'10',tt:'text',icon:''},
      {type:'身份证号码', username:'请输入身份证号',value:'',redcolor:false,maxLength:'18',tt:'idCard',icon:''},
      {type:'密码', username:'请输入密码',value:'',redcolor:false,maxLength:'18',tt:'password',icon:''},
      {type:'确认密码', username:'确认密码',value:'',redcolor:false,maxLength:'18',tt:'password',icon:''},
      {type:'家长手机号码', username:'手机号码',value:'',redcolor:false,maxLength:'11',tt:'number',icon:''},
      {type:'验证码', username:'验证码',value:'',redcolor:false,maxLength:'4',tt:'number',icon:''},
    ],
    teacherList:[
      {type:'教师姓名', username:'请输入姓名',value:'',redcolor:false,maxLength:'10',tt:'text',icon:''},
      {type:'身份证号码', username:'请输入身份证号',value:'',redcolor:false,maxLength:'18',tt:'idCard',icon:''},
      {type:'密码', username:'请输入密码',value:'',redcolor:false,maxLength:'18',tt:'password',icon:''},
      {type:'确认密码', username:'确认密码',value:'',redcolor:false,maxLength:'18',tt:'password',icon:''},
      {type:'教师手机号码', username:'手机号码',value:'',redcolor:false,maxLength:'11',tt:'number',icon:''},
      {type:'验证码', username:'验证码',value:'',redcolor:false,maxLength:'4',tt:'number',icon:''},
    ],
    studentList:[
      {type:'学生教育ID', username:'请输入教育ID',value:'',redcolor:false,maxLength:'18',tt:'text',icon:''},
      {type:'学生姓名', username:'请输入姓名',value:'',redcolor:false,maxLength:'10',tt:'text',icon:''},
      {type:'身份证号码', username:'请输入身份证号',value:'',redcolor:false,maxLength:'18',tt:'idCard',icon:''},
      {type:'密码', username:'请输入密码',value:'',redcolor:false,maxLength:'18',tt:'password',icon:''},
      {type:'确认密码', username:'确认密码',value:'',redcolor:false,maxLength:'18',tt:'password',icon:''},
    ],
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接受注册页面传递用户选择身份注册 0：教师 ， 1：家长 ， 2：学生
    this.setData({activePage:options.index})
  },
  // 个性签名
  bindnavgetorprofile(){
    wx.navigateTo({
      url: '/pages/myself/editingMaterials/PersonalProfile/PersonalProfile?type=0',
    })
  },
  // input失去焦点时验证
  getinputValue(e){
    let userwhite = e.currentTarget.dataset.userwhite
    let ParentsList = this.data.ParentsList
    let {value} = e.detail
    let activePage = this.data.activePage
    let teacherList = this.data.teacherList
    let studentList = this.data.studentList
    let password = this.data.password
    if(activePage == 0){
      // 教师注册
     teacherList.forEach(v=>{
       if(userwhite == '教师姓名' && v.type == '教师姓名'){
         v.value = value
         if(v.value.trim()){
          v.redcolor = false
         }
       }else if(userwhite == '教师手机号码'  && v.type == '教师手机号码'){
          let reg = /^[1][34578][0-9]{9}$/ 
          v.value =  value 
          // if(reg.test(value)){
          v.redcolor = false
        // }else{
        //   v.redcolor = true
        //   wx.showToast({
        //     title: '手机号格式不正确',
        //     icon:'none'
        //   })
        //   this.setData({teacherList})
        //   return
        // }
       }else if(userwhite == '密码' && v.type == '密码'){
         v.value = value
         password = v.value
         if(v.value.trim()){
          v.redcolor = false
         }
         this.setData({password})
       }else if(userwhite == '确认密码'  && v.type == '确认密码'){
        v.value = value
        v.redcolor = false
       if(password != v.value){
         v.redcolor = true
         wx.showToast({
           title: '输入密码不一致',
           icon:'none'          
         })
         return
       }
      }else if(userwhite == '验证码'  && v.type == '验证码'){
        v.value = value
        if(v.value.trim()){
          v.redcolor = false
         }
      }
     })    
      this.setData({teacherList})
    }else if(activePage == 1){
      // 家长注册
      ParentsList.forEach(v=>{
        if(userwhite == '学生教育ID'  && v.type == '学生教育ID'){
          v.value = value
          if(v.value.trim()){
            v.redcolor = false
           }
        }else if(userwhite== '家长姓名'  && v.type == '家长姓名'){
          v.value = value
          if(v.value.trim()){
            v.redcolor = false
           }
        }else if(userwhite == '身份证号码'  && v.type == '身份证号码'){ 
          v.value = value
          v.redcolor = false
        }else if(userwhite == '家长手机号码'  && v.type == '家长手机号码'){
          let reg = /^[1][34578][0-9]{9}$/ 
          v.value =  value 
          // if(reg.test(value)){
            v.redcolor = false
          // }else{
          //   v.redcolor = true
          //   wx.showToast({
          //     title: '手机号格式不正确',
          //     icon:'none'
          //   })
          //   this.setData({teacherList})
          //   return
          // }
        }else if(userwhite == '密码'  && v.type == '密码'){
          v.value = value
          password = v.value
          if(v.value.trim()){
           v.redcolor = false
          }
          this.setData({password})
        }else if(userwhite == '确认密码'  && v.type == '确认密码'){
          v.value = value
          v.redcolor = false
         if(password != v.value){
           v.redcolor = true
           wx.showToast({
             title: '输入密码不一致',
             icon:'none'          
           })
           return
         }
       }else if(userwhite == '验证码'  && v.type == '验证码'){
         v.value = value
         if(v.value.trim()){
          v.redcolor = false
         }
       }
      })
      this.setData({ParentsList})
    }else if(activePage == 2){
      // 学生注册
      studentList.forEach(v=>{
        if(userwhite == '学生教育ID'  && v.type == '学生教育ID'){
          v.value = value
          if(v.value.trim()){
            v.redcolor = false
           }
        }else if(userwhite == '学生姓名'  && v.type == '学生姓名'){
          v.value = value
          if(v.value.trim()){
            v.redcolor = false
           }
        }else if(userwhite== '身份证号码'  && v.type == '身份证号码'){
          v.value = value
          v.redcolor = false
   
        }else if(userwhite == '密码'  && v.type == '密码'){
          v.value = value
          password = v.value
          if(v.value.trim()){
           v.redcolor = false
          }
          this.setData({password})
        }else if(userwhite== '确认密码'  && v.type == '确认密码'){
          v.value = value
          v.redcolor = false
         if(password != v.value){
           v.redcolor = true
           wx.showToast({
             title: '输入密码不一致',
             icon:'none'          
           })
           return
         }
         this.setData({studentList})
       }
      })
      
    }
  },
  //发送验证码
  bindVerification(){
    let codeisok = this.data.codeisok//禁止点击
    let codemsg = 300
    let url = listen.appUrl2 + 'sys/user/send/code'
    let phone = null
    if(this.data.activePage == 0){
      this.data.teacherList.forEach(v=>{
        if(v.type =='教师手机号码'){
          phone = v.value
        }
      })
    }else if(this.data.activePage == 1){
      this.data.ParentsList.forEach(v=>{
        if(v.type =='家长手机号码'){
          phone = v.value
        }
      })
    }
    let reg = /^[1][34578][0-9]{9}$/
    if(reg.test(phone) && codeisok){
      this.setData({codeisok:false})
      let timer = setInterval(() => {
        this.setData({codemsg:codemsg-- + 's'})
    }, 1000);
      setTimeout(() => {
        clearInterval(timer)
        this.setData({codemsg:'获取验证码',codeisok:true})
      }, 301000);
      listen.request_n_get(url,{
        phone
      },res=>{
        console.log('获取验证码接口调用成功：',res)
  })
    }else{
      wx.showToast({
        title: '手机号格式有误',
        icon:'none'
      })
    }
  },
  // 点击选择家长身份
  bindidentity(){
    let that = this
    wx.showActionSheet({
      itemList: ['父亲', '母亲','其他'],
      success (res) {
        if(res.tapIndex == 0){
          that.setData({identity:'父亲',idenType:res.tapIndex})
        }else if(res.tapIndex  == 1){
          that.setData({identity:'母亲',idenType:res.tapIndex})
        }else if(res.tapIndex == 2){
          that.setData({identity:'其他',idenType:res.tapIndex})
        }
      },
      fail (res) {
      console.log(res.errMsg)
      }
      })
  },
  // 点击注册触发的事件
  bindRegistration(){
    let activePage = this.data.activePage
    let idenType = this.data.idenType
    if(activePage == 0){
      this.Registration(this.data.teacherList , idenType)
    }else if(activePage == 1){
      this.Registration(this.data.ParentsList , idenType)
    }else if(activePage == 2){
      this.Registration(this.data.studentList , idenType)

    }
  },
// 注册
Registration(List , identity){
  let username = null //用户姓名
  let mobile = null //手机号
  let educationId = null //教育ID
  let idCard = null //身份证
  let password = null //密码
  let code = null //验证码
  let personalMessage = App.globalData.Signature //个性签名
  let studentRelation = identity //学生亲友关系   0、父亲；1、母亲；2、其他",
  let userType = null //用户类型 0：学生，1：家长，2：教师
  let realName = null
  if(this.data.activePage == 0){
    userType = '2'
  }else if(this.data.activePage == 1){
    userType = '1'
  }else if(this.data.activePage == 2){
    userType = '0'
  }
  //确定用户输入所有项都是正确的
  List.forEach((v,i)=>{
    if(v.type == '教师姓名' || v.type == '家长姓名' || v.type == '学生姓名'){
      realName = v.value
    }else  if(v.type == '学生教育ID'){
      educationId = v.value
    }else if(v.type == '学生手机号码' || v.type == '教师手机号码' || v.type == '家长手机号码'){
      mobile = v.value
    }else if(v.type == '身份证号码'){
      idCard = v.value
    }else if(v.type == '密码'){
      password = v.value
    }else if(v.type == '个性签名'){
      personalMessage = v.value
    }else if(v.type == '验证码'){
      code = v.value
    }
  })
let isok = true
let useridCard
let userMobile
let useredid
for(let i = 0;i<List.length; i++){ //非空判定
  if(List[i].type == '教师手机号码' || List[i].type == '家长手机号码' || List[i].type == '学生教育ID' || List[i].type == '教师姓名' || List[i].type == '家长姓名' || List[i].type == '学生姓名'){
  if(!List[i].value.trim()){
    isok = false
      wx.showToast({
        title: `请输入正确得${List[i].type}`,
        icon:'none'
      })
      return
    }
  }
}
  let url = listen.appUrl2 + 'sys/user/register'
  if(isok){
    wx.showLoading({
      title: '正在注册...',
    })

    
    listen.request_post_jsonString(url,{
      realName, //用户名
      mobile, //手机号
      educationId,//教育ID
      idCard,//身份证
      password,//密码
      code, //验证码
      personalMessage,//个性留言
      studentRelation,//学生亲友关系
      userType,//用户类型，教师，学生，家长
    },res=>{
      wx.hideLoading()
      if(res.statusCode == 200 && res.data.code == 0){
      wx.showModal({
        content:'注册成功',
        confirmText:'去登陆',
        showCancel:false,
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      }else if(res.data.code == -2){ //用户已存在
        wx.showModal({
          content:res.data.msg,
          confirmText:'去登陆',
          success(res){
            if(res.confirm){
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
      }else{
        wx.showToast({
          title:`${res.data.msg}`,
          icon:'none'
        })
      }
      console.log('用户注册接口调用成功：',res)
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
    this.setData({Signature:App.globalData.Signature})
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