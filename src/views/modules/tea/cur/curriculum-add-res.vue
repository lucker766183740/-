<template>
  <el-dialog 
  custom-class="el-dialog-s" append-to-body
  title="添加课程资料"
  :visible.sync="dialogVisible"
  width="40%"
  :close-on-click-modal="false"
  :before-close="handleClose">

  <el-form label-width="100px" :model="formInline" class="demo-form-inline">
    <el-form-item label="添加标题">
      <el-input v-model="formInline.title" style="width:300px"></el-input>
    </el-form-item>

    <el-form-item label="资料类型"  prop="resource">
    <el-radio-group v-model="formInline.resource" >
      <el-radio border v-model="formInline.resource" label="1">资源库上传</el-radio>
      <!-- <el-radio border v-model="formInline.resource" label="2">本地上传</el-radio> -->
    </el-radio-group>
  </el-form-item>

    <el-form-item label="添加资料"   v-if="formInline.resource == 1">
      <el-input style="width:300px" v-model="formInline.name">
         <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </el-form-item>

<el-table
  v-if="formInline.resource == 1 "
    :data="tableData"
    style="width: 100%;"
    border
    :row-style="setRowStyle"
    highlight-current-row
    @current-change="handleCurrentChange"
    :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}">
    <el-table-column
      prop="name"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="authorName"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型">
      <template slot-scope="scope">
          {{ $getDictLabel("res_type", scope.row.type) }}
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    @current-change="handleChange"
    :page-size="5"
    layout="total, prev, pager, next"
    :total="totalPage">
  </el-pagination>

  <el-upload
  v-if="formInline.resource == 2"
  style="margin-top:30px;"
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
    
  <el-form-item label-position="right" label-width="71%" style="margin-top:50px">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="submit">保存</el-button>
  </el-form-item>

  </el-form>
  </el-dialog>

</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      formInline: {
        title: '',
        user: '',
        region: '',
        resource: '1',
        name: ''
      },
      tableData: [],
      fileList: [],
      pageSize: 1,
      list: [],
      totalPage: 0,
      submitList: {} // 保存提交的数据
    }
  },
  methods: {
    init () {
      this.dialogVisible = true
      this.formInline.title = ''
      this.submitList = {}
      this.tableData = []
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleClose () {
      this.dialogVisible = false
    },
    search () {
      // console.log('text', this.formInline.name)
      this.$http.get(
        'tea/res/page',
        {
          params: this.$http.adornParams({
            'order': '',
            'sidx': '',
            'page': this.pageSize,
            'limit': '5',
            'name': this.formInline.name,
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
      // 表格单选
    handleCurrentChange (val) {
      this.list = val
      if (this.submitList.data) {
        this.submitList.resourcesId = val.id
      }
    },
    // 保存页面数据
    submit () {
      if (!this.formInline.title) {
        return this.$message.info('资料标题不能为空')
      }
      this.submitList.title = this.formInline.title
      this.submitList.resource = this.formInline.resource === '1' ? '资源库上传' : '本地上传'
      console.log(this.submitList)

      this.$emit('getcurrAddData', this.submitList)
      this.$message.success('保存成功')

      this.dialogVisible = false
    },
    handleChange (page) {
      this.pageSize = page
      this.search()
    },
    // 这个方法直接加到methods里就好了，页面会自动调用的
    setRowStyle ({row}) {
      if (row === this.list) {
        return 'color:turquoise;'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-dialog-s{
    z-index: 11;
  }

</style>