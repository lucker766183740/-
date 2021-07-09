<template>
  <el-card shadow="never" class="aui-card--fill">
    <title>案例库</title>
    <div class="mod-__resourcesfile}">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.name" placeholder="名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="isAuth('tea:res:delete')" type="danger" @click="deleteHandle()">批量删除</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="selectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="content" label="案情" header-align="center" align="center"></el-table-column>
        <el-table-column prop="keyword" label="侦察过程" header-align="center" align="center"></el-table-column>
        <el-table-column prop="message" label="教学设计及关键问题" header-align="center" align="center"></el-table-column>
        <el-table-column prop="conclusion" label="研究结论" header-align="center" align="center"></el-table-column>
        <el-table-column prop="opinion" label="专家意见" header-align="center" align="center"></el-table-column>
        <el-table-column prop="status" label="审核状态" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="isAuth('tea:res:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
            <el-button v-if="isAuth('tea:res:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/utils/view-module'
import AddOrUpdate from './resCase-add-or-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/tea/res/page',
        getDataListIsPage: true,
        deleteURL: '/tea/res',
        deleteIsBatch: true
      },
      dataForm: {
        name: '',
        type: '1'
      }
    }
  },
  components: {
    AddOrUpdate
  }
}
</script>
