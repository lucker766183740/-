<template>
  <el-container>
    <el-header style="height: 0px"></el-header>
    <el-main style="height: 50%">
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-select v-model="dataForm.flowType" placeholder="流程对象">
          <el-option
            v-for="item in options"
            :key="item.ssccodevalue"
            :label="item.ssccodename"
            :value="item.ssccodevalue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList" @row-click="rowClick"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        type="index" width="70"
        header-align="center"
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="flowName" width="180"
        header-align="center"
        align="center"
        label="流程名称">
      </el-table-column>
      <el-table-column
        prop="ssccodename" width="180"
        header-align="center"
        align="center"
        label="流程对象">
      </el-table-column>
      <el-table-column
        prop="isAppoint" width="100"
        header-align="center"
        align="center"
        label="是否启用">
      </el-table-column>
      <el-table-column
        prop="flowDesc" width="180"
        header-align="center"
        align="center"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="username" width="100"
        header-align="center"
        align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createDate" width="180"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.flowId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.flowId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination-->
      <!--@size-change="sizeChangeHandle"-->
      <!--@current-change="currentChangeHandle"-->
      <!--:current-page="pageIndex"-->
      <!--:page-sizes="[10, 20, 50, 100]"-->
      <!--:page-size="pageSize"-->
      <!--:total="totalPage"-->
      <!--layout="total, sizes, prev, pager, next, jumper">-->
    <!--</el-pagination>-->
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
    </el-main>
    <el-main style="height: 50%">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataListNode()">
        <el-form-item>
          <el-button  type="primary" @click="addOrUpdateHandleNode()">新增</el-button>
          <el-button  type="danger" @click="deleteHandleNode()" :disabled="dataListSelectionsNode.length <= 0">批量删除</el-button>
        </el-form-item>
        <el-form-item>
          已选择：{{flowName}}
        </el-form-item>
      </el-form>
      <el-table
        :data="dataListNode"
        border
        v-loading="dataListLoadingNode"
        @selection-change="selectionChangeHandleNode"
        style="width: 100%;">
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          type="index" width="70"
          header-align="center"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="flowNodeName" width="120"
          header-align="center"
          align="center"
          label="节点名称">
        </el-table-column>
        <el-table-column
          prop="execName" width="120"
          header-align="center"
          align="center"
          label="执行者">
        </el-table-column>
        <el-table-column
          prop="flowNodeLevel" width="120"
          header-align="center"
          align="center"
          label="审核级别">
        </el-table-column>
        <el-table-column width="280"
          prop="flowNodeDesc"
          header-align="center"
          align="center"
          label="描述">
        </el-table-column>
        <el-table-column width="120"
          prop="createUserName"
          header-align="center"
          align="center"
          label="创建人">
        </el-table-column>
        <el-table-column width="180"
          prop="createDate"
          header-align="center"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addOrUpdateHandleNode(scope.row.flowNodeId)">修改</el-button>
            <el-button type="text" size="small" @click="deleteHandleNode(scope.row.flowNodeId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update-node v-if="addOrUpdateVisibleNode" ref="addOrUpdateNode" @refreshDataList="getDataListNode"></add-or-update-node>

    </el-main>
  </el-container>
</template>

<script>
  import AddOrUpdate from './pmworkflow-add-or-update'
  import AddOrUpdateNode from './pmworkflownode-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          flowType: ''
        },
        options: [],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        // 子表部分
        dataListNode: [],
        dataListLoadingNode: false,
        dataListSelectionsNode: [],
        addOrUpdateVisibleNode: false,
        flowId: -1, // 所选中行的主键ID
        flowName: ''
      }
    },
    components: {
      AddOrUpdate,
      AddOrUpdateNode
    },
    activated () {
      this.getFlowType()
      this.getDataList()
    },
    methods: {
      // 多选 子表
      selectionChangeHandleNode (val) {
        this.dataListSelectionsNode = val
      },
      // 新增 / 修改 子表
      addOrUpdateHandleNode (id) {
        if (this.flowId === -1) {
          this.$message.error('请选择一条主流程！')
          return
        }
        this.addOrUpdateVisibleNode = true
        var data = {id: id, flowId: this.flowId}
        this.$nextTick(() => {
          this.$refs.addOrUpdateNode.init(data)
        })
      },
      // 删除 子表
      deleteHandleNode (id) {
        var ids = id ? [id] : this.dataListSelectionsNode.map(item => {
          return item.flowNodeId
        })
        this.$confirm(`确定删除选择的数据?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/pmworkflownode/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataListNode()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 子表查询
      getDataListNode () {
        this.dataListLoadingNode = true
        this.$http({
          url: this.$http.adornUrl('/sys/pmworkflownode/list'),
          method: 'get',
          params: this.$http.adornParams({
            'flowId': this.flowId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataListNode = data.list
          } else {
            this.dataListNode = []
          }
          this.dataListLoadingNode = false
        })
      },
      // 行点击事件(执行子表查询)
      rowClick (row) {
        this.flowId = row.flowId
        this.flowName = row.flowName
        this.getDataListNode()
      },
      // 获取下拉框
      getFlowType () {
        this.$http({
          url: this.$http.adornUrl(`/sys/sysselectcode/getComoByCode`),
          method: 'get',
          params: this.$http.adornParams({
            code: 'flowType'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.list
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/pmworkflow/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'flowType': this.dataForm.flowType
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.list
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.flowId
        })
        this.$confirm(`确定删除选择的数据?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/pmworkflow/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
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
