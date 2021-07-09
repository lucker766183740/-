<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" style="display: flex;justify-content: space-between">
      <el-form-item>
        <el-button
          v-if="isAuth(':sysStandardField:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>
      </el-form-item>
      <div style="display: flex">
        <el-form-item style="display: flex">
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
        <el-button style="margin-left: 20px;" @click="getDataList()">查询</el-button>
      </el-form-item>
      </div>
    </el-form>
    <el-table :data="dataList" row-key="id" border v-loading="dataListLoading" style="width: 100%;" highlight-current-row  @current-change="handleCurrentChange">
      <!-- <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column> -->
      <el-table-column prop="id" header-align="center" align="center" label="序号" width="80"></el-table-column>
      <table-tree-column
        prop="field"
        header-align="center"
        treeKey="id"
        align="center"
        label="字段名称"
      ></table-tree-column>
      <!-- <el-table-column prop="pid" header-align="center" align="center" label="父id"></el-table-column> -->
      <el-table-column prop="parentField" header-align="center" align="center" label="上级节点"></el-table-column>
      <el-table-column prop="orderNum" header-align="center" align="center" label="排序"></el-table-column>
      <el-table-column prop="queryCode" header-align="center" align="center" label="编码"></el-table-column>
      <el-table-column prop="createName" header-align="center" align="center" label="添加人" width="130"></el-table-column>
      <el-table-column prop="createDate" header-align="center" align="center" label="添加时间" width="130" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="130" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import TableTreeColumn from '@/components/table-tree-column'
import AddOrUpdate from './sysstandardfield-add-or-update'
import { treeDataTranslate } from '@/utils'
export default {
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false,
      currentRow: null
    }
  },
  components: {
    TableTreeColumn,
    AddOrUpdate
  },
  activated () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/sys/standardField/list'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        console.log(data)
        this.dataList = treeDataTranslate(data, 'id')

        this.dataListLoading = false
      })
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, this.currentRow)
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
          return item.id
        })
      this.$confirm(
        `确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl('/sys/standardField/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>
<style>
  .el-form-item__content{
    display: flex !important;
  }
</style>
