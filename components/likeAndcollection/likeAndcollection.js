// components/likeAndcollection/likeAndcollection.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userdata:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindlikeAndcollectionidhide(){
      this.triggerEvent('triggerEvent',{isshow:true})
    }
  }
})
