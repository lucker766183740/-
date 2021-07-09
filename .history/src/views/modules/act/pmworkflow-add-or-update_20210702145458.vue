<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row >
        <el-col :span="12">
      <el-form-item label="流程名称" prop="flowName">
      <el-input v-model="dataForm.flowName" placeholder="流程名称"></el-input>
    </el-form-item>
        </el-col>
        <el-col :span="12">
    <el-form-item label="流程对象" prop="flowType">
      <el-select v-model="dataForm.flowType" placeholder="流程对象">
          <el-option
            v-for="item in options"
            :key="item.ssccodevalue"
            :label="item.ssccodename"
            :value="item.ssccodevalue">
          </el-option>
      </el-select>
    </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="是否启用" prop="delflag">
            <template>
              <el-radio-group v-model="dataForm.delflag">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
    <el-form-item label="描述" prop="flowDesc">
      <el-input v-model="dataForm.flowDesc" placeholder="描述"></el-input>
    </el-form-item>
        </el-col>
      </el-row>
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
        options: [],
        dataForm: {
          flowId: 0,
          flowName: '',
          flowType: '',
          flowDesc: '',
          delflag: '',
          createPerson: '',
          createDate: '',
          updatePerson: '',
          updateDate: '',
          isAppoint: '',
          chooseJob: '',
          sysType: ''
        },
        dataRule: {
          flowName: [
            { required: true, message: '流程名称不能为空', trigger: 'blur' }
          ],
          flowType: [
            { required: true, message: '流程对象不能为空', trigger: 'blur' }
          ],
          delflag: [
            { required: true, message: '是否启用不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      
      init (id) {
        this.dataForm.flowId = id || 0
        this.visible = true    
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.flowId) {
            this.$http({
              url: this.$http.adornUrl(`/sys/pmworkflow/info/${this.dataForm.flowId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.flowName = data.pmWorkFlow.flowName
                this.dataForm.flowType = data.pmWorkFlow.flowType
                this.dataForm.flowDesc = data.pmWorkFlow.flowDesc
                this.dataForm.delflag = data.pmWorkFlow.delflag
                this.dataForm.createPerson = data.pmWorkFlow.createPerson
                this.dataForm.createDate = data.pmWorkFlow.createDate
                this.dataForm.updatePerson = data.pmWorkFlow.updatePerson
                this.dataForm.updateDate = data.pmWorkFlow.updateDate
                this.dataForm.isAppoint = data.pmWorkFlow.isAppoint
                this.dataForm.chooseJob = data.pmWorkFlow.chooseJob
                this.dataForm.sysType = data.pmWorkFlow.sysType
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/pmworkflow/${!this.dataForm.flowId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'flowId': this.dataForm.flowId || undefined,
                'flowName': this.dataForm.flowName,
                'flowType': this.dataForm.flowType,
                'flowDesc': this.dataForm.flowDesc,
                'delflag': this.dataForm.delflag,
                'createPerson': this.dataForm.createPerson,
                'createDate': this.dataForm.createDate,
                'updatePerson': this.dataForm.updatePerson,
                'updateDate': this.dataForm.updateDate,
                'isAppoint': this.dataForm.isAppoint,
                'chooseJob': this.dataForm.chooseJob,
                'sysType': this.dataForm.sysType
              })
            }).then(({data}) => {
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
