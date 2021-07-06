import listen , { appUrl } from "../../utils/request"
// components/cardNext/cardNext.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardNextTitle:Array
  },
  attached (){
  this.dataHtmlchange()
},
  /**
   * 组件的初始数据
   */
  data: {
    dataList:[],
    start:0,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击 ‘换一换’ 
    // listen/subjectdetail/app/list;//主题“换一换”功能（参数  subjectId：""）
    bindchangeData(e){
      let subjectId = e.currentTarget.dataset.subjectid
      let index = e.currentTarget.dataset.subindex
      let cardNextTitle = this.properties.cardNextTitle
      let url = appUrl + 'subjectdetail/app/list?subjectId=' + subjectId
      listen.request_n_get(url,{},({data})=>{
       let  subList = data.data
        cardNextTitle[index].subList = subList
        this.setData({cardNextTitle})
      })
    },
    // 点击图片跳转
    bindnavgetordetails(e){
      let bookdetailId = e.currentTarget.dataset.bookdetailid
      wx.navigateTo({
        url: '/pages/circle/details/details?id=' + bookdetailId,
      })
    },
    //将发送到页面上的数据设置成3条，并且在点击‘换一换’的时候进行切换
    dataHtmlchange(index){
      let data = this.properties.cardNextTitle
      let data2 = JSON.parse(JSON.stringify(data))
      let start = this.data.start//0
     
     for(let i = 0;i<data2.length;i++){
      if(start >= data[1].imagechild.length){
        start = 0
        this.setData({start})
      }
      if((typeof index) === 'number'){
        data2[index].imagechild = data2[index].imagechild.slice(start,start + 3)
        this.setData({dataList:data2})
        return
      }
         data2[i].imagechild = data2[i].imagechild.slice(0,3)
     }
      this.setData({dataList:data2})
    }
  }
})
