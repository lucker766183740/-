<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()">
          <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
          <el-form-item label="案情" prop="content">
          <el-input v-model="dataForm.content" placeholder="案情"></el-input>
      </el-form-item>
          <el-form-item label="侦察过程" prop="keyword">
          <el-input v-model="dataForm.keyword" placeholder="侦察过程"></el-input>
      </el-form-item>
          <el-form-item label="关键问题" prop="message">
          <el-input v-model="dataForm.message" placeholder="关键问题"></el-input>
      </el-form-item>
          <el-form-item label="研究结论" prop="conclusion">
          <el-input v-model="dataForm.conclusion" placeholder="研究结论"></el-input>
      </el-form-item>
          <el-form-item label="专家意见" prop="opinion">
          <el-input v-model="dataForm.opinion" placeholder="专家意见"></el-input>
      </el-form-item>
      </el-form>
    <template slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">确认</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: '',
        authorId: '',
        type: '',
        name: '',
        content: '',
        keyword: '',
        isPublish: '',
        message: '',
        conclusion: '',
        opinion: '',
        fileType: '',
        fileName: '',
        fileUrl: '',
        fileSuffix: '',
        fileSize: '',
        integral: '',
        collectNum: '',
        downloadNum: '',
        shareNum: '',
        status: '',
        remark: '',
        delFlag: '',
        tenantCode: '',
        creator: '',
        createDate: '',
        updater: '',
        updateDate: ''
      }
    }
  },
  computed: {
    dataRule () {
      return {
        name: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        isPublish: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        conclusion: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        opinion: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.getInfo()
        }
      })
    },
    // 获取信息
    getInfo () {
      this.$http.get(`//resourcesfile/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http[!this.dataForm.id ? 'post' : 'put']('//resourcesfile/', this.dataForm).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {})
      })
    }, 1000, { 'leading': true, 'trailing': false })
  }
}
</script>
