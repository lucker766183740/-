// components/listenTeam/listenTeam.js
Component({
  properties:{
    Teamlist:Array,
    Title:String,
    all:Boolean
  },
  data:{},
  attached(){
 
  },
  methods:{
    bindnavgetormoreTeam(){
      wx.navigateTo({
        url: '/pages/channel/moreTeam/moreTeam',
      })
    },
    bindnavgetorTeamDetails(e){
      let teamId = e.currentTarget.dataset.teamid
      wx.navigateTo({
        url: '/pages/channel/teamDetails/teamDetails?id=' + teamId
      })
    }
  }
})