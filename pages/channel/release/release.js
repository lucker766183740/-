// pages/channel/release/release.js
import listen , { appUrl } from '../../../utils/request'
const App = getApp()
Page({
  index:0, //上传图片数标记
  length:0, // 上传图片总数
  videoUrl:'', //音频名称
  /**
   * 页面的初始数据
   */
  data: {
    isshow1:false, //话题
    isshow2:false, //小组
    iconJiaIsshow:true,
    viewshow:true,
    isplay:false, //音乐播放状态
    upType:'image',
    imageUrl2:[],
    groupName:'',
    imageIndex:0,
    topicName:[],
    title:'', //用户输入标题
    value:'',//用户输入正文
    imageurllist:[], //用户选择图片
    groupList:[], //小组数据
    topicList:[], //话题数据
    topicId:[], //选中的话题名称
    groupId:'', //选中的小组名称 , 只能选择一个
    src:'', //web-view 网址
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeamAlldate()
    this.getotherData(options)
  },
  //获取话题和小组数据
  getTeamAlldate(){
    let userId = App.globalData.userId
    let url = appUrl + 'informationpublish/baseData?userId=' + userId
    listen.request_n_get(url,{},({data})=>{
      let groupList = data.data.groupList
      let topicList = data.data.topicList
     groupList.forEach(item=>{
       if(item._changeBG === undefined){ item._changeBG = false}
     })
     topicList.forEach(item=>{
      if(item._changeBG === undefined){ item._changeBG = false}
     })
      this.setData({groupList,topicList})
    })
  },
  // 获取用户输入的标题
  bindgetTitle(e){
    let title = e.detail.value
    this.setData({title})
  },
  // 获取用户输入的正文内容
  bindgetValue(e){
    let value = e.detail.value
    this.setData({value})
  },
  // 点击选择话题选项卡
  isshowconversation(){
    this.setData({
      isshow1:true,
      viewshow:false
    })
  },
  // 点击选择小组选项卡
  isshowaddgrop(){
    this.setData({
      isshow2:true,
      viewshow:false
    })
  },
  // 点击关闭话题选项卡
  upisshow1(){
    this.setData({
      isshow1:false,
      viewshow:true,
    })
  },
  // 点击关闭小组选项卡
  upisshow2(){
    this.setData({
      isshow2:false,
      viewshow:true
    })
  },
  // 点击选择话题
  bindshowconversation(e){
    let topicId = e.currentTarget.dataset.topicid
    let topicList = this.data.topicList
    let Id = this.data.topicId
    let pos = Id.indexOf(topicId);
    let topicName = this.data.topicName
    if (pos < 0){
      Id.push(topicId)
    } else {
      Id.splice(pos, 1)
    } 
    topicList.forEach((item,index)=>{
      if(topicId === item.id){
        if(topicName.length == 3 && !item._changeBG){
          wx.showToast({
            title: '最多只能选择3个话题',
            icon:'none'
          })
          return
        }
        item._changeBG = !item._changeBG
          let _aa = topicName.indexOf(item.name)
          if(_aa < 0 ){
             topicName.push(item.name)
            }else{
              topicName.splice(_aa,1)
            }
      }
    })
    this.setData({topicList , topicId:Id , topicName})
  },
  // 点击选择小组
  bindshowaddgrop(e){
    let groupId = e.currentTarget.dataset.groupid
    let groupList = this.data.groupList
    let Id = this.data.groupId
    let groupName = this.data.groupName
    groupList.forEach((item)=>{
      if(groupId === item.id){
        item._changeBG = !item._changeBG
        if(item._changeBG){
          Id = item.id
          groupName = item.name
        }else{
          Id = ''
          groupName = ''
        }
      }else{
        item._changeBG = false
      }
    })
    this.setData({groupList , groupId:Id,groupName})

  },
  //选择上传的圈子类型 , 点击 + icon
  bindchoice(){
    let that = this
    if(that.data.imageurllist.length > 0){
      that.bindaddimage()
      return
    }
    wx.showActionSheet({
      itemList: ['视频或图片', '音频'],
      success (res) {
        if(res.tapIndex == 0){ // 视频或图片
          that.bindaddimage()
        }else if(res.tapIndex == 1){ //音频
          wx.navigateTo({
            url: './webview/webview',
          })
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 点击选择上传的图片
  bindaddimage(){
    var that = this
    wx.chooseMedia({
      count: 9,
      mediaType: that.data.imageurllist.length > 0 ?['image'] : ['image','video'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success (res) {
        // console.log(res)
        let tempFilePaths = res.tempFiles
        if(res.type == 'image'){
          // tempFilePath可以作为img标签的src属性显示图片
          tempFilePaths.map((item,index)=>{
            // 选择图片超出时提示用户弹窗
            if(that.data.imageurllist.length >= 9){
              wx.showModal({
                content:'最多只能选择9张图片',
               showCancel:false
              })
            }else{
              that.data.imageurllist.push(item)
            }
          })
         that.setData({
          imageurllist:that.data.imageurllist,
          upType:'image'
         })
        }else if(res.type == 'video'){
          that.setData({
            upType:'video',
            iconJiaIsshow:false,
            imageurllist:tempFilePaths
          })
        }
      }
    })
  },
  // 点击发布按钮 
 bindpublish(){
    let groupId = this.data.groupId
    let topicId = this.data.topicId.toString()
    let title =this.data.title
    let imageUrl = this.data.imageurllist
      if(title.trim() === ''){
       wx.showToast({
         title: '标题不能为空',
         icon:'none',
       })
        return
      }else if(topicId.trim() === ''){
        wx.showToast({
          title: '话题不能为空',
          icon:'none',
        })
        return
      }else if(groupId.trim() === ''){
        wx.showToast({
          title: '小组不能为空',
          icon:'none',
        })
        return
      }
      if(imageUrl[0].name){
        this.videoUrl = imageUrl[0].name
        let reg = imageUrl[0].name.split(/\./g)
        let extension = reg[reg.length - 1]
        // console.log(reg , extension)
       if(extension == 'm4a' || extension == 'aac' || extension == 'mp3' || extension == 'wav'){ 
        this.data.imageUrl2 = imageUrl[0].tempFilePath
         this.fabu(2)
        return 
      }
      }
  
      // 上传图片到服务
  if(imageUrl.length > 0){
    // for(let i = 0; i<imageUrl.length;i++){
    //   let file = imageUrl[i].tempFilePath
    //   this.upimageFile(file)
    // }
    this.length =  imageUrl.length
    this.upimageFile( this.data.imageurllist , this.length )
  }else{
    this.fabu(0)
  }
  },
  
  // 上传图片函数或视频
  upimageFile( imageurllist , length ){
    if(length == 0){
      return
    }
    let file = imageurllist[this.index].tempFilePath
    wx.showLoading({
      title: '上传中...',
    })
    let that = this
    let url = listen.appUrl2 + 'oss/file/uploadFiles'
    let imageUrl2 = that.data.imageUrl2
    let imageUrl = that.data.imageurllist
    let { token } = wx.getStorageSync('token')
    // console.log(file)
    wx.uploadFile({
      filePath:file,
      name: 'file',
      url: url,
      header:{
        "Content-Type":"application/json",
        "Authorization": token
      },
      formData:{
        'fileType':'file'
      },
      success (res){
        wx.hideLoading()
      let data = JSON.parse(res.data)
        if(data.code == 0){
          imageUrl2.push(data.data.url)
          that.setData({imageUrl2})
          if(imageUrl2.length === imageUrl.length){
            if(that.data.upType == 'image'){
              that.fabu(0)
            }else if(that.data.upType == 'video'){
              that.fabu(1)
            }
          }
          that.index++
          that.length--
          return that.upimageFile(that.data.imageurllist , that.length)
        }else{
          wx.showToast({
            title: data.msg,
            icon:'icon'
          })
        }
      },
    })
  },
  //上传音频文件
  // upaudioFile(){
  //   let imageurllist = this.data.imageurllist
  //   console.log(imageurllist)
    
  //   let { token } = wx.getStorageSync('token')
  //   console.log(imageurllist)
  //   let url = listen.appUrl2 + 'oss/file/uploadFiles'
  //   wx.showLoading({
  //     title:'上传中...'
  //   })
  //   console.log(imageurllist , imageurllist[0].tempFilePath)
  //   wx.uploadFile({
  //     filePath:imageurllist[0].tempFilePath,
  //     name: 'file',
  //     url: url,
  //     header:{
  //       "Content-Type":"application/json",
  //       "Authorization": token
  //     },
  //     formData:{
  //       'fileType':'file'
  //     },
  //     success (res){
  //       wx.hideLoading()
  //       console.log(res)
  //     },
  //     fail(err){
  //       wx.hideLoading()
  //       console.log(err)
  //     }
  //   })
  // },
  // 发布函数
  fabu(type){
    wx.showLoading({
      title: '发布中...',
    })
    let that = this
    let groupId = that.data.groupId
    let topicId = that.data.topicId.toString()
    let value = that.data.value
    let title =that.data.title
    let imageUrl2 = that.data.imageUrl2.toString()
    let url = appUrl + 'informationpublish'
    let videoUrl = this.videoUrl
    listen.request_n_post(url,{
     authorId:App.globalData.userId,// 用户id,
     content:value,// 内容,
     groupId:groupId,// 话题小组id,
     imageUrl:imageUrl2,// 图片地址,
     status:App.globalData.status,// 0,
     title:title,// 标题,
     topicId:topicId,// 话题id,
     type:type,// 0, image , 1 video  , 2  audio
     visible:1,// 1,
     videoUrl:videoUrl,
     tenantCode:App.globalData.tenantCode,// 租户编码
     },res=>{
       wx.hideLoading()
      // console.log('圈子发布接口调用成功',res)
       if(res.data.code == 0){
        wx.showModal({
          title:'提示',
           content:'发布的圈子将会被审核，审核是否通过请关注消息通知',
           confirmText:'我知道了',
           showCancel:false,
           success:res=>{
             if(res.confirm){
              wx.switchTab({
                url: '../channel',
              })
             }
           }
          })
       }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
       }
      })

  },
  // 点击删除图片
  bindremoveimage(e){
    let index = e.currentTarget.dataset.index
    let imageurllist = this.data.imageurllist
    imageurllist.splice(index , 1)
    this.setData({imageurllist})
  },
  // 获取web-view数据
  getotherData(options){
    // accept="audio/m4a, audio/aac, audio/mp3, audio/wav"
    if(options && options.file){
      let file = JSON.parse(options.file)
      let val = file.name.split(/\./g) 
      let extension = val[val.length - 1]
      if(extension == 'm4a' || extension == 'aac' || extension == 'mp3' || extension == 'wav'){   
        file.tempFilePath = file.url 
        this.setData({
          iconJiaIsshow:false,
          imageurllist:[file],
          upType:'audio'
        })
        // console.log(this.data.imageurllist)
      }else{
        wx.showModal({
          content:'请选择正确的音频格式，可选择 m4a/aac/mp3/wav 格式',
          confirmText:'知道了',
          showCancel:false
        })
      }
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