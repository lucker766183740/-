import listen , { appUrl } from '../../utils/request' 
Component({
  properties:{
    bookList:Array,
    isindex:Number,
  },
  data:{},
  methods:{
    bindnavgetor(e){
      let isindex = this.data.isindex
      let bookdetailId = e.currentTarget.dataset.bookdetailid
      let userId = getApp().globalData.userId
      if( isindex == 0 ){//图书详情页面
        let addplaylistUrl = appUrl + 'chapterplay/saveAll'
        listen.request_n_post(addplaylistUrl,{
          bookListId:bookdetailId,
          userId
        },res=>{
          if (res.statusCode === 200 && res.data.code === 0) {
          console.log('图书添加成功',res)
          }
        })
        wx.navigateTo({
          url: '/pages/circle/details/details?id=' + bookdetailId + '&userId=' +userId,
        })
      }else if(isindex == 1){//章节播放页
        // 单个添加至播放列表
        getApp().addchapterplay(bookdetailId)
        wx.navigateTo({
          url: '/pages/home/audio/audio?nowPlayaudio=' + bookdetailId,
        })
      }else{//圈子动态页面
        wx.navigateTo({
          url: '/pages/channel/userDetails/userDetails?id=' + bookdetailId +'&userId=' + userId,
        })
      }
    }
  }
})