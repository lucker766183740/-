<template>
  <div>
    <!-- <title>我的</title> -->

    <el-row>
      <el-col :span="18">
        <div class="teacherimg" style="height:150px;align-items:center;">
        <img src="~@/assets/img/logo.png" alt=""/>
        <div>
          <h2 style="margin-bottom:10px;">张三</h2>
          <p style="margin:0"> <span><i class="el-icon-edit" style="color: blue;font-size: 20px"></i></span> 江湖风雨，几度阑珊。沧海一粟，愿君一剑轻安。</p>
        </div>      
      </div>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="开设课程" name="first">
              <el-col :span="5" :offset="1" v-for="(v,i) in list.slice(0,2)" :key="i"
                      style="padding:20px 10px;margin-left:10px;">
                <router-link to="/course-classApplication-detail">
                  <el-card>
                    <div class="newtrain start">
                      <div class="newtrain">
                        <img src='~@/assets/img/logo.png' class="image">
                        <el-tag class="fixedTags" :type="v.tag" size="mini">{{ v.status }}</el-tag>
                      </div>
                      <div>
                        <p class="whiteNowarp">标题：{{ v.title }}</p>
                        <!-- <el-divider></el-divider> -->
                        <span><i class="el-icon-user"></i>{{ v.user }}</span>
                        <span><el-tag type="success">{{ v.label }}</el-tag></span>
                      </div>
                    </div>
                  </el-card>
                </router-link>
              </el-col>
          </el-tab-pane>
          <el-tab-pane label="参与课程" name="five">
              <el-col :span="5" :offset="1" v-for="(v,i) in list.slice(2,4)" :key="i"
                      style="padding:20px 10px;margin-left:10px;">
                <router-link to="/course-classApplication-detail">
                  <el-card>
                    <div class="newtrain start">
                      <div class="newtrain">
                        <img src='~@/assets/img/logo.png' class="image">
                        <el-tag class="fixedTags" :type="v.tag" size="mini">{{ v.status }}</el-tag>
                      </div>
                      <div>
                        <p class="whiteNowarp">标题：{{ v.title }}</p>
                        <!-- <el-divider></el-divider> -->
                        <span><i class="el-icon-user"></i>{{ v.user }}</span>
                        <span><el-tag type="success">{{ v.label }}</el-tag></span>
                      </div>
                    </div>
                  </el-card>
                </router-link>
              </el-col>
          </el-tab-pane>

          <el-tab-pane label="我的论坛" name="second">
            <div class="start" v-for="(v,i) in 4" :key="i"
                 style="background:#f9f9f9;padding: 2px 20px 10px 20px;margin-bottom:10px;">
              <router-link to="/teacherResearch-discussionDetail">
                <p style="color:orange;">讨论的标题 -- {{ i + 1 }}</p>
              </router-link>
              <p style="font-size:.9rem;">此外，课堂讲座与在线讨论会和视频等将仔细分析如何在Twitter、商务社交网站LinkedIn和谷歌社交平台Google+上培养粉丝。</p>
              <div>
                <span style="color:orange;font-size:.8rem;"> <i class="el-icon-document"></i>标签</span> <b> | </b>
                <span style="font-size:.8rem;"> 爱吃西红柿 </span><b> | </b>
                <span style="font-size:.8rem;">2012-12-11</span><b> | </b>
                <span style="font-size:.8rem;">3599 浏览量</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的预约" name="third">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column align="center" header-align="center" type="index" label="序号"
                               width="100"></el-table-column>
              <el-table-column align="center" header-align="center" prop="name" label="预约人"
                               width="100"></el-table-column>
              <el-table-column align="center" header-align="center" prop="title" label="标题"
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" header-align="center" prop="request" label="要求"
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" header-align="center" prop="date" label="日期"
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" header-align="center" prop="status" label="状态"></el-table-column>
              <el-table-column align="center" header-align="center" prop="handler" label="处理人"></el-table-column>
              <el-table-column align="center" header-align="center" prop="handleTime" label="处理时间"
                               show-overflow-tooltip></el-table-column>
              <!-- <el-table-column align="center" header-align="center"  label="视频文件">
                <template slot-scope="scope">
                  <router-link  to="http://tv.cctv.com/2019/09/11/VIDEfmdyU1mtosI1ms4b8ulg190911.shtml?spm=C96370.PsikHJQ1ICOX.EFpmlsqgFtbL.3">点击跳转视频链接</router-link>
                </template>
              </el-table-column> -->
              <el-table-column label="解决意见" prop="handleOpinion" show-overflow-tooltip></el-table-column>
              <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="approveHandle(scope.row.id)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待我处理" name="four">
            <el-table v-loading="dataListLoading"
                      :data="dataList"
                      @selection-change="selectionChangeHandle"
                      style="width: 100%;">
              <el-table-column
                type="selection"
                header-align="center"
                align="center"
                width="50"
              ></el-table-column>
              <el-table-column
                prop="applyUser"
                label="申请人"
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="applyDept"
                label="申请人部门"
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column prop="theme" label="流程主题" header-align="center" align="center"
                               width="220px"></el-table-column>
              <el-table-column prop="type" label="流程类型" header-align="center" align="center"></el-table-column>
              <el-table-column prop="applyDate" label="申请日期" header-align="center" align="center"></el-table-column>
              <el-table-column prop="status" label="状态" header-align="center" align="center"></el-table-column>
              <el-table-column
                prop="currentReviewer"
                label="当前审核人"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="endDate"
                label="结束日期"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column align="center" fixed="right" header-align="center" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="text"
                    @click="approveHandle(scope.row.userId)"
                  >流程监控
                  </el-button>
                  <el-button
                    size="small"
                    type="text"
                    @click="approveHandle(scope.row.type)"
                  >详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>


        </el-tabs>
      </el-col>
      <el-col :span="6">

        <el-row>
          <el-card class="box-card" style="margin-left:20px;background-color: #fafafa;">
            <div slot="header">
              <span>个人资料</span>
              <el-button style="float: right; padding: 3px 0" type="text">…</el-button>
            </div>
            <div class="text item">
              用户等级：7
            </div>
            <div class="text item">
              个人积分：500
            </div>
            <div class="text item">
              职称：专家
            </div>
            <div class="text item">
              专长：心理学、审讯
            </div>
            <div class="text item">
              课程：心理学研究课程

            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="box-card" style="margin-left:20px;margin-top:20px;background-color: #fafafa;">
            <div slot="header">
              <span>编辑推荐</span>
              <el-button style="float: right; padding: 3px 0" type="text">…</el-button>
            </div>
            <div v-for="(v,i) in recommendList" :key="i">
              <span style="font-size: 16px;margin-bottom:20px">{{ v.title }}</span>
              <p></p>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import mixinViewModule from '@/utils/view-module'

export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        activatedIsNeed: false
      },
      activeName: 'first',
      studyList: [
        {title: '教育私有学习方案', userNum: '36', publishNum: '10'},
        {title: '课程建设动态', userNum: '11', publishNum: '25'},
        {title: '微表情分析', userNum: '35', publishNum: '6'},
        {title: '语音分析', userNum: '26', publishNum: '9'},
        {title: '定制服务', userNum: '40', publishNum: '13'}
      ],
      recommendList: [
        {title: '⒈熟蛋返生论文作者在镜头前痛哭'},
        {title: '⒉31省区市新增12例确诊均为境外输入'},
        {title: '⒊美国曾向太平洋偷排767吨毒废水'},
        {title: '⒋专家解读野生东北虎为何现身村庄'}
      ],
      tableData: [
        {
          title: '犯罪心理生理问题',
          name: '豆豆',
          request: '讲解清楚不明白的地方',
          date: '2020-02-23 16:00',
          status: '未处理',
          handler: '黄老师',
          handleTime: '2021-01-02 12:33',
          handleOpinion: '心理素质迅速提高'
        },
        {
          title: '犯罪心理生理问题',
          name: '豆豆',
          request: '讲解清楚不明白的地方',
          date: '2020-11-13 19:00',
          status: '未处理',

          handler: '黄老师',
          handleTime: '2021-01-02 12:33',
          handleOpinion: '心理素质迅速提高'
        },
        {
          title: '犯罪知情眼动相关问题',
          name: '刑煌',
          request: '讲解清楚不明白的地方',
          date: '2020-02-23 16:00',
          status: '未处理',
          handler: '林老师',
          handleTime: '2020-03-03 16:00',
          handleOpinion: 'XXXXXXXXXXXXXXX'
        },
        {
          title: '犯罪知情眼动相关问题',
          name: '刑煌',
          request: '讲解清楚不明白的地方',
          date: '2020-02-23 16:00',
          status: '未处理',
          handler: '林老师',
          handleTime: '2020-03-03 16:00',
          handleOpinion: 'XXXXXXXXXXXXXXX'
        }
      ],
      dataList: [
        {
          id: '1',
          applyUser: '张三',
          applyDept: '行政部',
          theme: '案例资源流程_张三_20210501',
          type: '资源上传',
          applyDate: '2020-05-01',
          status: '审核中',
          currentReviewer: '张瑞',
          endDate: ''
        },
        {
          id: '2',
          applyUser: '李四',
          applyDept: '教研室',
          theme: '课程开设流程_李四_20210530',
          type: '课程开设',
          applyDate: '2020-05-30',
          status: '审核中',
          currentReviewer: 'lope',
          endDate: ''
        }
      ],
      list: [
        {title: '实践活动课程', user: '张三', label: '实践', status: '已完成', tag: 'success', imageUrl: '/static/image/1.png'},
        {title: '心理学课程', user: '张三', label: '心理学', status: '已完成', tag: 'success', imageUrl: '/static/image/2.png'},
        {title: '审讯技术课程', user: '王五', label: '审讯技术课程', status: '已完成', tag: 'success', imageUrl: '/static/image/3.png'},
        {title: '现场勘查课程', user: '刘能', label: '现场勘查', status: '审核中', tag: 'danger', imageUrl: '/static/image/4.png'}
      ]
    }
  },
  methods: {
    approveHandle () {
      this.$message.success('查看预约详情页面！')
    }
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}
li {
  list-style: none;
}

.pm_0 {
  padding: 0;
  margin: 0;
}

.start {
  text-align: start;
}

.newtest img {
  width: 100%;
  height: 6vw;
}

.card_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card_container li {
  margin: 10px;
}

.card_container li p {
  font-size: .8rem;
  color: #333;
}

.card_container li i {
  font-size: 2rem;
  color: #777;
}

.newtrain {
  position: relative;
}

.newtrain img {
  width: 100%;
  height: 8vw;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.teacherimg {
  display: flex;
  margin-left: 50px;
}

.teacherimg img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

</style>
