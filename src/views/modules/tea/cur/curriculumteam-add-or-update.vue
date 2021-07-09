<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
          <el-form-item label="课程id" prop="curriculumId">
          <el-input v-model="dataForm.curriculumId" placeholder="课程id"></el-input>
      </el-form-item>
          <el-form-item label="用户id" prop="userId">
          <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
      </el-form-item>
          <el-form-item label="用户角色：0、发起人；1、负责人；2、普通成员" prop="role">
          <el-input v-model="dataForm.role" placeholder="用户角色：0、发起人；1、负责人；2、普通成员"></el-input>
      </el-form-item>
          <el-form-item label="审核状态：2、审核中；3、通过；4、退回" prop="status">
          <el-input v-model="dataForm.status" placeholder="审核状态：2、审核中；3、通过；4、退回"></el-input>
      </el-form-item>
          <el-form-item label="审核意见" prop="auditOpinion">
          <el-input v-model="dataForm.auditOpinion" placeholder="审核意见"></el-input>
      </el-form-item>
          <el-form-item label="删除标识  0：未删除    1：删除" prop="delFlag">
          <el-input v-model="dataForm.delFlag" placeholder="删除标识  0：未删除    1：删除"></el-input>
      </el-form-item>
      </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
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
        curriculumId: '',
        userId: '',
        role: '',
        status: '',
        auditOpinion: '',
        delFlag: ''
      }
    }
  },
  computed: {
    dataRule () {
      return {
        curriculumId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        userId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        role: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        auditOpinion: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        delFlag: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
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
      this.$http.get(`/cur/curriculumteam/${this.dataForm.id}`).then(({ data: res }) => {
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
        this.$http[!this.dataForm.id ? 'post' : 'put']('/cur/curriculumteam/', this.dataForm).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: this.$t('prompt.success'),
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
