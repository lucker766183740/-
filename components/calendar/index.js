// components/calendar/index.js
// 获取月份总天数
import listen from '../../utils/request'
    function getMonthDay(year, month) {
      let days = new Date(year, month + 1, 0).getDate()
      return days
    }
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
    weekList:['周日','周一','周二','周三','周四','周五','周六'],
    year:'', //当前年
    month:'', //当前月份
    week:'', //每月第一天是周几
    monthCount:[], // 当前月有多少天
    today:'', // 今天是几号
    margin_left:'', //边距控制从周几开始算
    sign_success:false, // 点击签到成功
    activeClass:'today_not_sign', // 激活的class属性
    signDate:[ // 已经签到的时间
      {date:'2021-04-03', activeClass:'自定义',signStuat:0},
      {date:'2021-05-08', activeClass:'自定义',signStuat:0},
      {date:'2021-05-10', activeClass:'自定义',signStuat:1},
    ],
    todaySign:false , //今天是否已签到
  },
  lifetimes:{
    attached(){
      this.getdata()
      this.today()
      this.getHistoryDate()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取历史签到数据及今天签到状态
    getHistoryDate(){
      let year = this.data.year 
      let month = this.data.month <10 ? '0' + this.data.month : this.data.month
      let today = this.data.today
      let monthCount = this.data.monthCount
      let signDate = this.data.signDate
      let signDay = []
      let _historyDate = []
      let date = year+ '-' + month+ '-01'
      let todaySign = this.data.todaySign
      let url = listen.appUrl + 'sysusersignlog/api/signLog'
      let that = this
      listen.request_n_get(url , {
        date
      } , res=>{
        if(res.data.code == 0 && res.data.data.length > 0){
          signDate = res.data.data
          signDate.forEach(v =>{
            v._date = v.signDate.split('-')
            _historyDate.push({_year:v._date[0] , _month:v._date[1] , _day:v._date[2]})
          })
          _historyDate.forEach(v =>{
            if(year == v._year && month == v._month){
              if((v._day*1 < 10)){v._day = String(v._day).substr(1,1)}
              signDay.push(v._day)
            }
          })
          for (let i = 0; i < monthCount.length; i++) {
            monthCount[i].activeClass = ''
            if(monthCount[i].day == today){monthCount[i].activeClass = 'today_not_sign'}
            for (let j = 0; j < signDay.length; j++) {
             if(monthCount[i].day == signDay[j]){ //已签到
                monthCount[i].activeClass = 'sign_in'
              if(monthCount[i].day == today){
                monthCount[i].activeClass = 'todaySign'
                todaySign = true
              }
             }
            }
          }
          that.setData({monthCount , todaySign})
          // 如果还没有数据
        }else if(res.data.code == 0 && res.data.data.length == 0){
          monthCount.forEach(v=>{
            if(v.day == today){
              v.activeClass = 'today_not_sign'
            }
          })
          that.setData({monthCount})
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }

      })
    },
    //点击签到触发的事件
    handleSignIn(){
      let activeClass = this.data.activeClass
      let that = this
      wx.showLoading({
        title: '签到中...',
      })
      // 0 已签到（sign_in ） ，2 今天已签到（todaySign）
      // 3 今天未签到(today_not_sign)
      let url = listen.appUrl + 'sysusersignlog/api/sign'
      // 签到
      listen.request_n_post(url,{},res=>{
        wx.hideLoading()
        if(res.data.code == 0){
        activeClass = 'todaySign'
          wx.showModal({
            content:'签到成功',
            showCancel:false
          })
          that.triggerEvent('triggerEvent', res.data)
          // 更新数据到页面
          that.getHistoryDate()
        }else{
          wx.showModal({
            content:res.msg,
            showCancel:false
          })
        }
        this.setData({activeClass})
      })
    },
    // 获取当前的具体时间
      getdata(){
        let year = new Date().getFullYear()
        let month = new Date().getMonth()+1
        let week = new Date(year, month-1 ,1).getDay()
        let margin_left = week * (100 / 7)
        let count = getMonthDay(year , month - 1)
        let monthCount = []
        for (let i = 0; i < count; i++) {
          monthCount.push({day:i+1})
        }
        this.setData({
          year,month,week,margin_left,monthCount
        })
      },
      // 计算今天是多少号
      today(){
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let today = new Date().getDate()
        let _year = this.data.year
        let _month = this.data.month
        if(year != _year ||  month != _month){
           today = null
        }else{
          today = new Date().getDate()
        }
        this.setData({today})
      },
      // 点击icon切换月份
      changeMonth(e){
        let type = e.target.dataset.change
        let month = this.data.month
        let year = this.data.year
        let week = this.data.week
        let monthCount =  []
        let count
        let margin_left = this.data.margin_left
        if(type == 'sub'){
          month--
          if(month == 0){ month = 12 ; year--}
        }else if(type == 'add'){
          month++
          if(month == 13){ month = 1 ; year++}
        }
        // 每个月第一天是周几
         week = new Date(year, month-1 ,1).getDay()
        margin_left = week * (100 / 7)
        count =  getMonthDay(year , month-1)       
        for (let i = 0; i < count; i++) {
          monthCount.push({day:i+1})
        }
        this.setData({
          month , year , week , margin_left , monthCount
        })
        this.today()
        this.getHistoryDate()
      }
  }
})
