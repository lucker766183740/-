// components/newcommment/newcomment.js
Component({
  properties:{
    List:Array
  },
  data:{},
  attached(){},
  methods:{
    // 跳转用户详细信息页
    bindnavgator(e){
      let othId = e.currentTarget.dataset.othid
 
      let  url =  '/pages/information/useContent/userContent?othId=' + othId
      getApp().haveUserToken(url)
  }
}
})