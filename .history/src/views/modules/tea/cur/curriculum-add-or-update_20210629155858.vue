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
          <el-select v-model="dataForm.promoter" style="width:100%" placeholder="请选择">
            <el-option v-for="item in promotList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
          <el-form-item label="负责人" prop="director">
          <el-select v-model="dataForm.director" style="width:100%" placeholder="请选择">
            <el-option v-for="item in directList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
      },
      promotList: [],
      directList: []
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
        this.getBaseData()
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
    // 获取基础信息 责任人/发起人
    getBaseData () {
      this.promotList = []
      this.directList = []
      this.$http.get(`/sys/user/userlist`).then(({ data: res }) => {
        console.log('res', res)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.promotList = res.data
        this.directList = res.data
      }).catch(() => {
      })
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
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
