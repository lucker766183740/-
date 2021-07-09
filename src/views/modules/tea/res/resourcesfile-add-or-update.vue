<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()">
          <el-form-item label="作者id" prop="authorId">
          <el-input v-model="dataForm.authorId" placeholder="作者id"></el-input>
      </el-form-item>
          <el-form-item label="类型：0、案例；1、课件；2、大纲；3、教材；4、讲义；5、辅导资料；6、实用工具" prop="type">
          <el-input v-model="dataForm.type" placeholder="类型：0、案例；1、课件；2、大纲；3、教材；4、讲义；5、辅导资料；6、实用工具"></el-input>
      </el-form-item>
          <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
          <el-form-item label="内容、摘要、案情" prop="content">
          <el-input v-model="dataForm.content" placeholder="内容、摘要、案情"></el-input>
      </el-form-item>
          <el-form-item label="关键词、用途、侦察过程" prop="keyword">
          <el-input v-model="dataForm.keyword" placeholder="关键词、用途、侦察过程"></el-input>
      </el-form-item>
          <el-form-item label="是否出版 0:否,1:是（教材）" prop="isPublish">
          <el-input v-model="dataForm.isPublish" placeholder="是否出版 0:否,1:是（教材）"></el-input>
      </el-form-item>
          <el-form-item label="出版信息、关键问题" prop="message">
          <el-input v-model="dataForm.message" placeholder="出版信息、关键问题"></el-input>
      </el-form-item>
          <el-form-item label="研究结论" prop="conclusion">
          <el-input v-model="dataForm.conclusion" placeholder="研究结论"></el-input>
      </el-form-item>
          <el-form-item label="专家意见" prop="opinion">
          <el-input v-model="dataForm.opinion" placeholder="专家意见"></el-input>
      </el-form-item>
          <el-form-item label="文件类型：" prop="fileType">
          <el-input v-model="dataForm.fileType" placeholder="文件类型："></el-input>
      </el-form-item>
          <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="dataForm.fileName" placeholder="文件名称"></el-input>
      </el-form-item>
          <el-form-item label="文件路径" prop="fileUrl">
          <el-input v-model="dataForm.fileUrl" placeholder="文件路径"></el-input>
      </el-form-item>
          <el-form-item label="文件后缀" prop="fileSuffix">
          <el-input v-model="dataForm.fileSuffix" placeholder="文件后缀"></el-input>
      </el-form-item>
          <el-form-item label="文件大小" prop="fileSize">
          <el-input v-model="dataForm.fileSize" placeholder="文件大小"></el-input>
      </el-form-item>
          <el-form-item label="下载积分" prop="integral">
          <el-input v-model="dataForm.integral" placeholder="下载积分"></el-input>
      </el-form-item>
          <el-form-item label="收藏数量" prop="collectNum">
          <el-input v-model="dataForm.collectNum" placeholder="收藏数量"></el-input>
      </el-form-item>
          <el-form-item label="下载数量" prop="downloadNum">
          <el-input v-model="dataForm.downloadNum" placeholder="下载数量"></el-input>
      </el-form-item>
          <el-form-item label="分享数量" prop="shareNum">
          <el-input v-model="dataForm.shareNum" placeholder="分享数量"></el-input>
      </el-form-item>
          <el-form-item label="审核状态：0、未提交；1、审核中；2、通过；3、退回" prop="status">
          <el-input v-model="dataForm.status" placeholder="审核状态：0、未提交；1、审核中；2、通过；3、退回"></el-input>
      </el-form-item>
          <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
          <el-form-item label="删除标识  0：未删除    1：删除" prop="delFlag">
          <el-input v-model="dataForm.delFlag" placeholder="删除标识  0：未删除    1：删除"></el-input>
      </el-form-item>
          <el-form-item label="租户id" prop="tenantCode">
          <el-input v-model="dataForm.tenantCode" placeholder="租户id"></el-input>
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
        authorId: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
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
        ],
        fileType: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        fileName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        fileUrl: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        fileSuffix: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        fileSize: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        integral: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        collectNum: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        downloadNum: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        shareNum: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        remark: [
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
