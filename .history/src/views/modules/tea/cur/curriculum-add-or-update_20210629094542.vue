<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? '新增': '修改'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()">
          <el-form-item label="课程名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="课程名称"></el-input>
      </el-form-item>
          <el-form-item label="标签" prop="label">
          <el-input v-model="dataForm.label" placeholder="标签：0 微课；1 慕课；2 spoc；3 直播；4 线下课程；"></el-input>
      </el-form-item>
          <el-form-item label="发起人" prop="promoter">
          <el-input v-model="dataForm.promoter" placeholder="发起人"></el-input>
      </el-form-item>
          <el-form-item label="负责人" prop="director">
          <el-input v-model="dataForm.director" placeholder="负责人"></el-input>
      </el-form-item>
          <el-form-item label="图片" prop="image">
          <el-input v-model="dataForm.image" placeholder="图片"></el-input>
      </el-form-item>
          <el-form-item label="课程说明" prop="content">
          <el-input v-model="dataForm.content" placeholder="课程说明"></el-input>
      </el-form-item>
          <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
        name: '',
        label: '',
        promoter: '',
        director: '',
        image: '',
        content: '',
        remark: '',
        status: '',
        buildStatus: '',
        evaluate: '',
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
        label: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        promoter: [
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
      this.$http.get(`/tea/cur/${this.dataForm.id}`).then(({ data: res }) => {
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
        console.log('dataForm', this.$http)
        this.$http[!this.dataForm.id ? 'post' : 'put']('/tea/cur/', this.dataForm).then(({ data: res }) => {
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
