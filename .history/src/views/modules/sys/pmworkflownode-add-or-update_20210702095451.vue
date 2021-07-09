<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row >
        <el-col :span="12">
    <el-form-item label="节点名称" prop="flowNodeName">
      <el-input v-model="dataForm.flowNodeName" placeholder="节点名称"></el-input>
    </el-form-item>
        </el-col>
        <el-col :span="12">
    <el-form-item label="选择对象" prop="flowNodeObject">
      <template>
        <el-radio-group v-model="dataForm.flowNodeObject" @change="radioChange">
          <el-radio :label="1">角色</el-radio>
          <el-radio :label="2">用户</el-radio>
        </el-radio-group>
      </template>
    </el-form-item>
        </el-col>
      </el-row>
        <el-row >
          <el-col :span="12">
    <el-form-item label="执行者" prop="flowNodeExec">
      <!--<el-input v-model="dataForm.flowNodeExec" placeholder="执行者"></el-input>-->
      <el-select v-model="dataForm.flowNodeExec" placeholder="执行者">
        <el-option
          v-for="item in options"
          :key="item.objectId"
          :label="item.objectName"
          :value="item.objectId">
        </el-option>
      </el-select>
    </el-form-item>
          </el-col >
          <el-col :span="12">
    <el-form-item label="审核级别" prop="flowNodeLevel">
      <el-input-number v-model="dataForm.flowNodeLevel"  placeholder="审核级别" ></el-input-number>
    </el-form-item>
          </el-col>
        </el-row>
            <el-row >
              <el-col :span="24">
    <el-form-item label="描述" prop="flowNodeDesc">
      <el-input v-model="dataForm.flowNodeDesc" placeholder="描述"></el-input>
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
          flowNodeId: 0,
          flowId: '',
          flowNodeName: '',
          flowOrgId: '',
          flowNodeObject: 1,
          flowNodeExec: '',
          flowNodeLevel: '',
          flowNodeDesc: '',
          flowNodeReback: '',
          flowNodeReview: '',
          delflag: '',
          createPerson: '',
          createDate: '',
          updatePerson: '',
          updateDate: '',
          weight: ''
        },
        dataRule: {
          flowNodeName: [
            { required: true, message: '节点名称不能为空', trigger: 'blur' }
          ],
          flowNodeObject: [
            { required: true, message: '选择对象不能为空', trigger: 'blur' }
          ],
          flowNodeExec: [
            { required: true, message: '执行者不能为空', trigger: 'blur' }
          ],
          flowNodeLevel: [
            { required: true, message: '审核级别不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 选择对象改变时
      radioChange (data) {
        this.getExecComo()
      },
      // 获取执行者下拉框
      getExecComo () {
        this.$http({
          url: this.$http.adornUrl('/sys/pmworkflownode/getExecComoByObject'),
          method: 'get',
          params: this.$http.adornParams({
            'flowNodeObject': this.dataForm.flowNodeObject
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.list
          }else{
            this.options = []
          }
        })
      },
      // 初始化审核级别 仅在新增的时候初始化
      initLev () {
        this.$http({
          url: this.$http.adornUrl('/sys/pmworkflownode/initLev'),
          method: 'get',
          params: this.$http.adornParams({
            'flowId': this.dataForm.flowId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.flowNodeLevel = data.initLevel
          }
        })
      },
      init (data) {
        this.dataForm.flowNodeId = data.id || 0
        this.dataForm.flowId = data.flowId
        this.visible = true
        if (this.dataForm.flowNodeId === 0) {
          this.initLev()
        }
        this.getExecComo()
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.flowNodeId) {
            this.$http({
              url: this.$http.adornUrl(`/sys/pmworkflownode/info/${this.dataForm.flowNodeId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.flowId = data.pmWorkFlowNode.flowId
                this.dataForm.flowNodeName = data.pmWorkFlowNode.flowNodeName
                this.dataForm.flowOrgId = data.pmWorkFlowNode.flowOrgId
                this.dataForm.flowNodeObject = data.pmWorkFlowNode.flowNodeObject
                this.getExecComo()
                this.dataForm.flowNodeExec = data.pmWorkFlowNode.flowNodeExec
                this.dataForm.flowNodeLevel = data.pmWorkFlowNode.flowNodeLevel
                this.dataForm.flowNodeDesc = data.pmWorkFlowNode.flowNodeDesc
                this.dataForm.flowNodeReback = data.pmWorkFlowNode.flowNodeReback
                this.dataForm.flowNodeReview = data.pmWorkFlowNode.flowNodeReview
                this.dataForm.delflag = data.pmWorkFlowNode.delflag
                this.dataForm.createPerson = data.pmWorkFlowNode.createPerson
                this.dataForm.createDate = data.pmWorkFlowNode.createDate
                this.dataForm.updatePerson = data.pmWorkFlowNode.updatePerson
                this.dataForm.updateDate = data.pmWorkFlowNode.updateDate
                this.dataForm.weight = data.pmWorkFlowNode.weight
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
              url: this.$http.adornUrl(`/sys/pmworkflownode/${!this.dataForm.flowNodeId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'flowNodeId': this.dataForm.flowNodeId || undefined,
                'flowId': this.dataForm.flowId,
                'flowNodeName': this.dataForm.flowNodeName,
                'flowNodeObject': this.dataForm.flowNodeObject,
                'flowNodeExec': this.dataForm.flowNodeExec,
                'flowNodeLevel': this.dataForm.flowNodeLevel,
                'flowNodeDesc': this.dataForm.flowNodeDesc
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
