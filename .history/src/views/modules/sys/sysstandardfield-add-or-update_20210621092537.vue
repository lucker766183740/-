<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="上级分类" prop="parentId">
        <template>
          <!-- <el-tooltip class="item" effect="dark" content="一级分类的父节点为0" :value="true" > -->
             <el-input v-model="dataForm.parentId" placeholder="上级分类" disabled></el-input>
          <!-- </el-tooltip> -->
        </template>
      </el-form-item>
      <el-form-item label="编码" prop="queryCode">
        <el-input v-model="dataForm.queryCode" placeholder="编码" @blur="onblur"></el-input>
      </el-form-item>
      <el-form-item label="字段名称" prop="field">
        <el-input v-model="dataForm.field" placeholder="字段名称"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="dataForm.orderNum" placeholder="排序"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        parentId: '',
        field: '',
        childField: '',
        queryCode: '',
        orderNum: ''
      },
      dataRule: {
        parentId: [{ required: true, message: '父id不能为空', trigger: 'blur' }],
        field: [
          { required: true, message: '字段名称不能为空', trigger: 'blur' }
        ],
        childField: [
          { required: true, message: '子字段名称不能为空', trigger: 'blur' }
        ],
        orderNum: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
        queryCode: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    init (id, row) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (row) {
          this.dataForm.parentId = row.id
        } else {
          this.dataForm.parentId = 0
        }
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `//sysStandardField/info/${this.dataForm.id}`
            ),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.parentId = data.sysStandardField.parentId
              this.dataForm.field = data.sysStandardField.field
              this.dataForm.childField = data.sysStandardField.childField
              this.dataForm.orderNum = data.sysStandardField.orderNum
              this.dataForm.queryCode = data.sysStandardField.queryCode
            }
          })
        }
      })
    },
    onblur () {
      if (this.dataForm.queryCode != null && this.dataForm.queryCode != '') {
        this.$http({
          url: this.$http.adornUrl('/sysStandardField/code'),
          method: 'post',
          data: this.$http.adornData({'queryCode': this.dataForm.queryCode, 'id': this.dataForm.id})
        }).then(({ data }) => {
          if (data && data.code === 0) {
            if (!data.t) {
              this.dataForm.queryCode = ''
              this.$message.error('编码' + data.t + '重复！请重新编码。')
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `//sysStandardField/${!this.dataForm.id ? 'save' : 'update'}`
            ),
            method: 'post',
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              parentId: this.dataForm.parentId,
              field: this.dataForm.field,
              childField: this.dataForm.childField,
              orderNum: this.dataForm.orderNum,
              queryCode: this.dataForm.queryCode
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
