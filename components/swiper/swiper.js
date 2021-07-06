// components/swiper/swiper.js
Component({
  properties:{
    swiperData:Array
  },
  data:{},
  methods:{
    //跳转轮播图话题
    navgetorswiperTopic(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../../pages/home/swiperTopic/swiperTopic?id=' + id,
      })
    },
  }
})
