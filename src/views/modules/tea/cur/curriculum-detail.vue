<template>
  <div class="container">
    <div class="title">
      <h2>审讯技术课程</h2>
    </div>
    <div class="studyClass">
      <div class="studyprogress">
        <el-progress
          type="circle"
          :percentage="80"
          color="#6f6"
          :stroke-width="15"
        ></el-progress>
      </div>
      <div class="flish">
        <i type="success" class="el-icon-success">审讯技术</i>
      </div>
      <div class="btn">
        <el-button type="danger" @click="apply">申请加入</el-button>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="课程资料(3)" name="first">
              <el-card style="text-align: start; margin-bottom: 10px">
                <i class="el-icon-s-opportunity"></i>
                <router-link tag="a" to="/practiceService-Startstudy">
                  <span>资料1：管理后台接口</span>
                </router-link>
              </el-card>
              <el-card style="text-align: start; margin-bottom: 10px">
                <i class="el-icon-s-opportunity"></i>
                <router-link tag="a" to="/practiceService-Startstudy">
                  <span>资料2：桌面设计</span>
                </router-link>
              </el-card>
              <el-card style="text-align: start; margin-bottom: 10px">
                <i class="el-icon-s-opportunity"></i>
                <router-link tag="a" to="/practiceService-Startstudy">
                  <span>资料3：Windows系统维护和管理</span>
                </router-link>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="课程结构(2)" name="third">
              <el-card style="text-align: start; margin-bottom: 10px">
                <router-link tag="a" to="/practiceService-Startstudy">
                  <span>第一讲：审讯技术培训</span>
                </router-link>
                <span style="float: right"> 教师：张三，课时数：3</span>
              </el-card>
              <el-card style="text-align: start; margin-bottom: 10px">
                <router-link tag="a" to="/practiceService-Startstudy">
                  <span>第二讲：现场审讯技术</span>
                </router-link>
                <span style="float: right"> 教师：张三，课时数：4</span>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="课程团队(0)" name="five"
              ><i class="el-icon-office-building">
                正在建设中...
              </i></el-tab-pane
            >
            <el-tab-pane label="经验交流(0)" name="four"
              ><i class="el-icon-office-building">
                正在建设中...
              </i></el-tab-pane
            >
            <el-tab-pane label="建设评价(0)" name="second"
              ><i class="el-icon-office-building">
                正在建设中...
              </i></el-tab-pane
            >
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="teacherClass title">
          <p>课程负责人</p>
          <div class="teacherimg">
            <img src="~@/assets/img/avatar.png" alt="" />
            <span>祖国一颗草</span>
          </div>
        </el-card>
        <el-card class="teacherClass title student">
          <p>团队成员</p>
          <img src="~@/assets/img/avatar.png" alt="" />
        </el-card>

        <el-card class="title">
          <p>最新动态</p>
          <li style="font-size: 0.8rem; line-height: 30px">
            祖国一颗草<span style="color: #aaa">加入课程</span
            >Windows系统维护和管理
          </li>
          <li style="font-size: 0.8rem; line-height: 30px">
            猫不吃鱼<span style="color: #aaa">加入课程</span
            >Windows系统维护和管理
          </li>
          <li style="font-size: 0.8rem; line-height: 30px">
            我是一枝花<span style="color: #aaa">退出课程</span
            >Windows系统维护和管理
          </li>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    apply () {
      this.$message.success('已收到您的加入申请，正在审核中，请您耐心等候！')
    }
  }
}
</script>
<style scoped>
.container {
  width: 80vw;
  margin: 0 auto;
}
.title {
  text-align: start;
}
.studyClass {
  display: flex;
  position: relative;
  background-color: #fafafa;
  padding: 20px;
  margin-bottom: 20px;
}
.studyprogress p {
  padding: 0;
  margin: 0;
}
.flish {
  text-align: center;
  margin: auto 100px;
}
.btn {
  position: absolute;
  right: 100px;
  top: 35%;
}
.teacherClass {
  margin-bottom: 20px;
}
.teacherClass img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
}
.teacherimg {
  display: flex;
  justify-content: start;
  align-items: center;
}
.student img {
  width: 40px;
  height: 40px;
}
.el-icon-office-building {
  color: #777;
}
</style>
