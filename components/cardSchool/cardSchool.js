// components/cardSchool/cardSchool.js
Component({
  properties:{
    rightList:Array,
    booklistId:Number
  },
  data:{},
  methods:{
    bindnavgetorto(e){
      let title = e.currentTarget.dataset.title
      let channelid = e.currentTarget.dataset.booklistid
      // 点击更多跳转页面
      wx.navigateTo({
        url: '/pages/circle/moreSchool/moreSchool?channelid=' + channelid + '&title=' + title,
      })
    },
    // 点击跳转详情
      bindgetSchoolNavgetor(e){
        let bookdetailId = e.currentTarget.dataset.bookdetailid
   
        wx.navigateTo({
          url: '/pages/circle/details/details?id=' + bookdetailId,
        })
  }
}
})