<template>
  <div class="container">
    <el-row :gutter="20">
      <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
      style="display: flex; justify-content: space-between"
    >
      <el-form-item>
        <el-button
          type="primary"
          @click="addOrUpdateHandle()"
          >新增课程</el-button
        >
      </el-form-item>
      <div style="display: flex">
        <el-form-item style="display: flex">
          <el-select v-model="dataForm.subname" placeholder="请选择标签" >
              <el-option value="1" label="微课">微课</el-option>
              <el-option value="2" label="慕课">慕课</el-option>
              <el-option value="3" label="spoc">spoc</el-option>
              <el-option value="4" label="直播（录播）">直播（录播）</el-option>
              <el-option value="5" label="线下课程">线下课程</el-option>
            </el-select>
            <el-select v-model="dataForm.status" placeholder="请选择状态" >
              <el-option value="1" label="审核中">审核中</el-option>
              <el-option value="2" label="建设中">建设中</el-option>
              <el-option value="3" label="已完成">已完成</el-option>
              <el-option value="4" label="待审核">待审核</el-option>
              <el-option value="5" label="已退回">已退回</el-option>
            </el-select>
          <el-button style="margin-left: 20px" @click="getDataList()">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    </el-row>
    <el-row :gutter="100" class="card">
      <el-col :span="5" :offset="1"  v-for="(v,i) in dataList" :key="i" style="padding:20px 10px;margin-left:10px;">
        <router-link  to="/course-classApplication-detail">
          <el-card>
            <div class="newtrain start">
              <div class="newtrain">
                <img :src='"" + (i+1)  + ".png"' class="image">
                <el-tag class="fixedTags" :type="v.tag" size="mini">{{v.status}}</el-tag>
              </div>
              <div>
                <p class="whiteNowarp">名称：{{v.title}}</p>
                <el-divider></el-divider>
                <span><i class="el-icon-user"></i>{{v.user}}</span>
                <span><el-tag type="success">{{v.label}}</el-tag></span>
              </div>
            </div>
          </el-card>
        </router-link>

      </el-col>
    </el-row>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>

</template>
<script>
import mixinViewModule from '@/utils/view-module'
import AddOrUpdate from './curriculum-add-or-update'
export default{
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        createdIsNeed: true,
        getDataListURL: this.$http.adornUrl('/tea/cur/list'),
        getDataListIsPage: true,
        deleteURL: this.$http.adornUrl('/tea/cur'),
        deleteIsBatch: true,
        deleteIsBatchKey: 'id',
        activatedIsNeed: false
      },
      list: []
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    this.getList()
  },
  methods: {
    // 获取数据列表
    getList () {
      
    }
  }
}
</script>
<style  scoped>
.container{
  width: 80vw;
  margin: 0 auto;
}
.card{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.image{
  width: 100%;
  height: calc(80vw / 8);
}

.start{
  text-align: start;
}

.newtrain{
  position: relative;
}
.whiteNowarp{
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fixedTags{
  position: absolute;
  top: 0px;
  right: 0px;
}
.newtrain img{
  width: 100%;
  height: 8vw;
}
.chapter{
  display: flex;
  justify-content: space-between;
}

</style>
