<template>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
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
                                    id: '',
                                                pid: '',                                                curriculumId: '',                                                name: '',                                                describe: '',                                                teacher: '',                                                classHour: '',                                                resourcesId: ''                        },
        dataRule: {
                                            pid: [
            { required: true, message: '父id不能为空', trigger: 'blur' }
        ],                                    curriculumId: [
            { required: true, message: '课程id不能为空', trigger: 'blur' }
        ],                                    name: [
            { required: true, message: '章节名称不能为空', trigger: 'blur' }
        ],                                    describe: [
            { required: true, message: '概述不能为空', trigger: 'blur' }
        ],                                    teacher: [
            { required: true, message: '教师不能为空', trigger: 'blur' }
        ],                                    classHour: [
            { required: true, message: '课时数不能为空', trigger: 'blur' }
        ],                                    resourcesId: [
            { required: true, message: '资源id不能为空', trigger: 'blur' }
        ]                        }
    }
    },
        methods: {
        init (id) {
            this.dataForm.id = id || 0
            this.visible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].resetFields()
                if (this.dataForm.id) {
                    this.$http({
                        url: this.$http.adornUrl(`/cur/curriculumStructure/info/${this.dataForm.id}`),
                            method: 'get',
                            params: this.$http.adornParams()
                }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.dataForm = {
                                ...this.dataForm,
                                ...data.curriculumStructure
                            }
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
                    url: this.$http.adornUrl(`/cur/curriculumStructure/${!this.dataForm.id ? 'save' : 'update'}`),
                        method: 'post',
                        data: this.$http.adornData(this.dataForm)
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
