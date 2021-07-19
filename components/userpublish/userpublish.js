// components/userpublish/userpublish.js
import listen from '../../utils/request'
Component({
  properties:{
    userPublishList:Array,
    userId:String || Number,
    loginId:String || Number
  },
  data:{},
  attached(){

  },
  methods:{
    // 点击查看大图
    bindSeeLogimg(e){
      let allUrl = e.currentTarget.dataset.allurl
      let url = e.currentTarget.dataset.url
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: allUrl // 需要预览的图片http链接列表
      })
    },
    // 展开全部
    isopenAll(e){
      let pubId = e.currentTarget.dataset.pubid
      let userPublishList = this.properties.userPublishList
      userPublishList.forEach((item,index)=>{
        if(pubId === item.id){
          item._isshow = !item._isshow
        }
      })
      this.setData({pubId,userPublishList})
    },
    // 进入话题页面
    bindnavgetor(e){
    let teamId = e.currentTarget.dataset.teamid
      wx.navigateTo({
        url: '/pages/channel/teamDetails/teamDetails?id=' + teamId,
      })
    },
    // 进入小组页面
    bindnavgetorjingseDetails(e){
      let topicId = e.currentTarget.dataset.topicid
      wx.navigateTo({
        url: '/pages/channel/scenery/scenery?topicId=' + topicId,
      })
    },
    // 进入圈子详情页面
    bindnavgetorteamdetails(e){
      let id = e.currentTarget.dataset.publishid
      let tenantCode = e.currentTarget.dataset.tenantcode
      let userId = getApp().globalData.userId
      wx.navigateTo({
        url: '/pages/channel/userDetails/userDetails?id=' + id + '&userId=' + userId + '&tenantCode=' + tenantCode
      })
    },
    // 圈子点赞
    bindchannerLike(e){
      let userPublishList = this.properties.userPublishList
      let id = e.currentTarget.dataset.id
      let authorId = e.currentTarget.dataset.authorid
      let  type = 2
      let islike

      userPublishList.forEach(item=>{
        if(item.id === id){
           islike = !item.haveLike
          item.haveLike = !item.haveLike
        }
        if(item.haveLike === true && item.id == id){
          item.likeNum++
        }
        if(!item.haveLike && item.id === id){
          item.likeNum-- 
        }
      })
      console.log(userPublishList)
      getApp().userComment(id,type,islike , authorId ,id)
      this.setData({userPublishList})
    },
    // 圈子收藏
    bindchannerComment(e){
      let informationId = e.currentTarget.dataset.informationid
      let authorId = e.currentTarget.dataset.authorid
      let type = 2
      let collection = !e.currentTarget.dataset.collection
      let userPublishList = this.properties.userPublishList  
      userPublishList.forEach(item=>{
        if(item.id === informationId){item.haveCollect = collection}
        if(item.haveCollect === true && item.id == informationId){
          item.collectNum++
        }
        if(!item.haveCollect && item.id ===informationId){
          item.collectNum-- 
        }
      })
      getApp().userCollection(informationId , type , collection , authorId)
      this.setData({userPublishList})
    },
    // 跳转用户详情页
    bindnavgetoruser(e){
      let creator = e.currentTarget.dataset.creator
      if(creator == this.properties.userId){
        return
      }
      wx.navigateTo({
        url: '/pages/information/useContent/userContent?othId=' + creator,
      })
    },
    //删除圈子
    deleteTheChannel(e){
      console.log(this.data.userPublishList)
      let that = this
      let id = e.currentTarget.dataset.id
      let authorId = e.currentTarget.dataset.authorid
      let url = listen.appUrl+ 'informationpublish/app/delete?id=' + id
      wx.showModal({
        content:'确定要删除这条圈子吗？',
        success(res){
          if(res.confirm){
            wx.showLoading({
              title: '正在删除...'
            })
            listen.request_n_get(url,{},res=>{
              wx.hideLoading()
              if(res.data.code == 0){
                wx.showToast({
                  title: '删除成功',
                })
                let userPublishList = that.data.userPublishList
                let arr = []
                userPublishList.forEach((v,i)=>{
                  if(v.id !== id){
                    arr.push(v)
                  }
                })
                that.setData({userPublishList:arr})
                that.triggerEvent('totalRedu')
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon:'none'
                })
              }
            })
          }
        }
      })
    }
  }
})