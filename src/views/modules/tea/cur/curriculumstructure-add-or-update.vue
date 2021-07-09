<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
          <el-form-item label="父id" prop="pid">
          <el-input v-model="dataForm.pid" placeholder="父id"></el-input>
      </el-form-item>
          <el-form-item label="课程id" prop="curriculumId">
          <el-input v-model="dataForm.curriculumId" placeholder="课程id"></el-input>
      </el-form-item>
          <el-form-item label="章节名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="章节名称"></el-input>
      </el-form-item>
          <el-form-item label="概述" prop="describe">
          <el-input v-model="dataForm.describe" placeholder="概述"></el-input>
      </el-form-item>
          <el-form-item label="教师" prop="teacher">
          <el-input v-model="dataForm.teacher" placeholder="教师"></el-input>
      </el-form-item>
          <el-form-item label="课时数" prop="classHour">
          <el-input v-model="dataForm.classHour" placeholder="课时数"></el-input>
      </el-form-item>
          <el-form-item label="资源id" prop="resourcesId">
          <el-input v-model="dataForm.resourcesId" placeholder="资源id"></el-input>
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
        pid: '',
        curriculumId: '',
        name: '',
        describe: '',
        teacher: '',
        classHour: '',
        resourcesId: ''
      }
    }
  },
  computed: {
    dataRule () {
      return {
        pid: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        curriculumId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        describe: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        classHour: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        resourcesId: [
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
      this.$http.get(`/cur/curriculumstructure/${this.dataForm.id}`).then(({ data: res }) => {
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
        this.$http[!this.dataForm.id ? 'post' : 'put']('/cur/curriculumstructure/', this.dataForm).then(({ data: res }) => {
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
