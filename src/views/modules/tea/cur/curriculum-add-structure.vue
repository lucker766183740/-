<template>
  <el-form :data="fromData"  label-width="60px" label-position="left" v-show="dialogVisible">

    <el-form-item label="章节">
      <el-input v-model="fromData.name" placeholder="章节"></el-input>
    </el-form-item>

    <el-form-item label="概述">
      <el-input v-model="fromData.describe" placeholder="概述"></el-input>
    </el-form-item>

    <el-form-item label="教师">
      <el-input v-model="fromData.teacher" placeholder="教师"></el-input>
    </el-form-item>

    <el-form-item label="课时数">
      <el-input v-model="fromData.classHour" placeholder="课时数"></el-input>
    </el-form-item>

  <el-form-item label="附件">
    <el-input placeholder="关键字"  v-model="fromData.val">
      <el-button  slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
  </el-form-item>

   <el-table  :data="tableData" border  style="width: 100%;" 
     @current-change="handleCurrentChange" 
     :row-style="setRowStyle"
     highlight-current-row
     :header-cell-style="{'text-align':'center'}" 
     :cell-style="{'text-align':'center'}">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="date" label="日期" width="100"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleChange"
      :page-size="5"
      layout="total, prev, pager, next"
      :total="totalPage">
    </el-pagination>

    <el-form-item label-width="60%" style="margin-top:30px">
      <el-button type="danger" icon="el-icon-delete" @click="handleClose"></el-button>
      <el-button type="success" icon="el-icon-check" @click="submit"></el-button>
    </el-form-item>
   
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      fromData: {
        str: '',
        name: '',
        teacher: '',
        classHour: 1,
        describe: '',
        val: '',
        tableData: {}
      },
      totalPage: 0,
      tableData: [],
      pageSize: 1
    }
  },
  methods: {
    init (str) {
      this.fromData = {
        str: '',
        name: '',
        teacher: '',
        classHour: 1,
        describe: '',
        val: '',
        tableData: {}
      }
      this.dialogVisible = true
      this.fromData.str = str
    },
    // 关闭弹窗
    handleClose () {
      this.dialogVisible = false
    },
    submit () {
      if (this.fromData.describe && this.fromData.name && this.fromData.classHour && this.fromData.teacher) {
        this.$emit('getStructureData', this.fromData)
        this.$message.success('新增成功')
        this.handleClose()
      } else {
        this.$message.info('请输入完整的课时信息')
      }
    },
    handleCurrentChange (val) {
      this.fromData.tableData = val
    },
    // 资源库搜索
    search () {
      this.$http.get(
        'tea/res/page',
        {
          params: this.$http.adornParams({
            'order': '',
            'sidx': '',
            'page': this.pageSize,
            'limit': '5',
            'name': this.fromData.val,
            'status': '2'
          })
        }
      ).then(({ data: res }) => {
        if (res.code !== 0) {
          this.tableData = []
          this.totalPage = 0
          return this.$message.error(res.msg)
        }
        this.tableData = res.page.list
        this.totalPage = res.page.totalCount
      }).catch(() => {})
    },
    handleChange (page) {
      this.pageSize = page
      this.search()
    },
    // 这个方法直接加到methods里就好了，页面会自动调用的
    setRowStyle ({row}) {
      if (row === this.fromData.tableData) {
        return 'color:turquoise;'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  // .el-dialog-s{
  //   z-index: 11;
  // }
.el-form-item{
  margin-bottom: 5px;
}

</style>