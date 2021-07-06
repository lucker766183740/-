
// components/tabbar/tabbar.js
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    count:0,
    selected: 0,
    color: "#333",
    selectedColor: "red",
    list: [
      {
        pagePath: "/pages/home/home",
        text: "首页",
        iconPath: "/image/icon/shouye.png",
        selectedIconPath: "/image/icon/shouye1.png"
      },
      {
        pagePath: "/pages/circle/circle",
        text: "频道",
        iconPath: "/image/icon/pindao.png",
        selectedIconPath: "/image/icon/pindao1.png"
      }, {
        pagePath: "/pages/channel/channel",
        text: "圈子",
        iconPath: "/image/icon/quanzi.png",
        selectedIconPath: "/image/icon/quanzi1.png"
      },
      {
        pagePath: "/pages/information/information",
        text: "消息",
        iconPath: "/image/icon/msg.png",
        selectedIconPath: "/image/icon/msg1.png"
      },
      {
        pagePath: "/pages/myself/myself",
        text: "我的",
        iconPath: "/image/icon/wo-de.png",
        selectedIconPath: "/image/icon/wo-de-red.png"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handchangepages(e){
      let index = e.currentTarget.dataset.index
      let list = this.data.list
      list.forEach((v,i)=>{
        if(index == i){
          // this.setData({selected:index})
          wx.switchTab({
            url: v.pagePath,
          })
        }
      })
    },
  }
})
