<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? '新增': '修改'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()">
          <el-form-item label="课程名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="课程名称"></el-input>
      </el-form-item>
          <el-form-item label="标签：0 微课；1 慕课；2 spoc；3 直播；4 线下课程；" prop="label">
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
          <el-form-item label="审核状态：0、未提交；1、审核中；2、通过；3、退回" prop="status">
          <el-input v-model="dataForm.status" placeholder="审核状态：0、未提交；1、审核中；2、通过；3、退回"></el-input>
      </el-form-item>
          <el-form-item label="建设状态：0、建设中；1、已完成" prop="buildStatus">
          <el-input v-model="dataForm.buildStatus" placeholder="建设状态：0、建设中；1、已完成"></el-input>
      </el-form-item>
          <el-form-item label="建设评价" prop="evaluate">
          <el-input v-model="dataForm.evaluate" placeholder="建设评价"></el-input>
      </el-form-item>
          <el-form-item label="删除标识  0：未删除    1：删除" prop="delFlag">
          <el-input v-model="dataForm.delFlag" placeholder="删除标识  0：未删除    1：删除"></el-input>
      </el-form-item>
          <el-form-item label="租户编码" prop="tenantCode">
          <el-input v-model="dataForm.tenantCode" placeholder="租户编码"></el-input>
      </el-form-item>
          <el-form-item label="创建者" prop="creator">
          <el-input v-model="dataForm.creator" placeholder="创建者"></el-input>
      </el-form-item>
          <el-form-item label="创建时间" prop="createDate">
          <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
      </el-form-item>
          <el-form-item label="更新者" prop="updater">
          <el-input v-model="dataForm.updater" placeholder="更新者"></el-input>
      </el-form-item>
          <el-form-item label="更新时间" prop="updateDate">
          <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>
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
        ],
        director: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        buildStatus: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        evaluate: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        delFlag: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        tenantCode: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        creator: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        createDate: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        updater: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        updateDate: [
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
      this.$http.get(`/cur/curriculum/${this.dataForm.id}`).then(({ data: res }) => {
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
        this.$http[!this.dataForm.id ? 'post' : 'put']('/cur/curriculum/', this.dataForm).then(({ data: res }) => {
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
