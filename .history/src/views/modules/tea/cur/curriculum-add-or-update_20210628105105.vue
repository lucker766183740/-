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
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item
        label="标签：0 微课；1 慕课；2 spoc；3 直播；4 线下课程；"
        prop="label"
      >
        <el-input
          v-model="dataForm.label"
          placeholder="标签：0 微课；1 慕课；2 spoc；3 直播；4 线下课程；"
        ></el-input>
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
      <el-form-item
        label="审核状态：0、未提交；1、审核中；2、通过；3、退回"
        prop="status"
      >
        <el-input
          v-model="dataForm.status"
          placeholder="审核状态：0、未提交；1、审核中；2、通过；3、退回"
        ></el-input>
      </el-form-item>
      <el-form-item label="建设状态：0、建设中；1、已完成" prop="buildStatus">
        <el-input
          v-model="dataForm.buildStatus"
          placeholder="建设状态：0、建设中；1、已完成"
        ></el-input>
      </el-form-item>
      <el-form-item label="建设评价" prop="evaluate">
        <el-input v-model="dataForm.evaluate" placeholder="建设评价"></el-input>
      </el-form-item>
      <el-form-item label="删除标识  0：未删除    1：删除" prop="delFlag">
        <el-input
          v-model="dataForm.delFlag"
          placeholder="删除标识  0：未删除    1：删除"
        ></el-input>
      </el-form-item>
      <el-form-item label="租户编码" prop="tenantCode">
        <el-input
          v-model="dataForm.tenantCode"
          placeholder="租户编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建者" prop="creator">
        <el-input v-model="dataForm.creator" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-input
          v-model="dataForm.createDate"
          placeholder="创建时间"
        ></el-input>
      </el-form-item>
      <el-form-item label="更新者" prop="updater">
        <el-input v-model="dataForm.updater" placeholder="更新者"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateDate">
        <el-input
          v-model="dataForm.updateDate"
          placeholder="更新时间"
        ></el-input>
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
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        label: "",
        promoter: "",
        director: "",
        image: "",
        content: "",
        remark: "",
        status: "",
        buildStatus: "",
        evaluate: "",
        delFlag: "",
        tenantCode: "",
        creator: "",
        createDate: "",
        updater: "",
        updateDate: "",
      },
      dataRule: {
        name: [
          { required: true, message: "课程名称不能为空", trigger: "blur" },
        ],
        label: [
          {
            required: true,
            message:
              "标签：0 微课；1 慕课；2 spoc；3 直播；4 线下课程；不能为空",
            trigger: "blur",
          },
        ],
        promoter: [
          { required: true, message: "发起人不能为空", trigger: "blur" },
        ],
        director: [
          { required: true, message: "负责人不能为空", trigger: "blur" },
        ],
        image: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        content: [
          { required: true, message: "课程说明不能为空", trigger: "blur" },
        ],
        remark: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        status: [
          {
            required: true,
            message: "审核状态：0、未提交；1、审核中；2、通过；3、退回不能为空",
            trigger: "blur",
          },
        ],
        buildStatus: [
          {
            required: true,
            message: "建设状态：0、建设中；1、已完成不能为空",
            trigger: "blur",
          },
        ],
        evaluate: [
          { required: true, message: "建设评价不能为空", trigger: "blur" },
        ],
        delFlag: [
          {
            required: true,
            message: "删除标识  0：未删除    1：删除不能为空",
            trigger: "blur",
          },
        ],
        tenantCode: [
          { required: true, message: "租户编码不能为空", trigger: "blur" },
        ],
        creator: [
          { required: true, message: "创建者不能为空", trigger: "blur" },
        ],
        createDate: [
          { required: true, message: "创建时间不能为空", trigger: "blur" },
        ],
        updater: [
          { required: true, message: "更新者不能为空", trigger: "blur" },
        ],
        updateDate: [
          { required: true, message: "更新时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/cur/curriculum/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.curriculum.name;
              this.dataForm.label = data.curriculum.label;
              this.dataForm.promoter = data.curriculum.promoter;
              this.dataForm.director = data.curriculum.director;
              this.dataForm.image = data.curriculum.image;
              this.dataForm.content = data.curriculum.content;
              this.dataForm.remark = data.curriculum.remark;
              this.dataForm.status = data.curriculum.status;
              this.dataForm.buildStatus = data.curriculum.buildStatus;
              this.dataForm.evaluate = data.curriculum.evaluate;
              this.dataForm.delFlag = data.curriculum.delFlag;
              this.dataForm.tenantCode = data.curriculum.tenantCode;
              this.dataForm.creator = data.curriculum.creator;
              this.dataForm.createDate = data.curriculum.createDate;
              this.dataForm.updater = data.curriculum.updater;
              this.dataForm.updateDate = data.curriculum.updateDate;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/cur/curriculum/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              label: this.dataForm.label,
              promoter: this.dataForm.promoter,
              director: this.dataForm.director,
              image: this.dataForm.image,
              content: this.dataForm.content,
              remark: this.dataForm.remark,
              status: this.dataForm.status,
              buildStatus: this.dataForm.buildStatus,
              evaluate: this.dataForm.evaluate,
              delFlag: this.dataForm.delFlag,
              tenantCode: this.dataForm.tenantCode,
              creator: this.dataForm.creator,
              createDate: this.dataForm.createDate,
              updater: this.dataForm.updater,
              updateDate: this.dataForm.updateDate,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                },
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
  },
};
</script>
