<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-cur__curriculum}">
      <el-form
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="getDataList()"
      >
        <el-form-item>
          <el-input v-model="dataForm.id" placeholder="id" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t("query") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('cur:curriculum:save')"
            type="primary"
            @click="addOrUpdateHandle()"
            >{{ $t("add") }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('cur:curriculum:delete')"
            type="danger"
            @click="deleteHandle()"
            >{{ $t("deleteBatch") }}</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        v-loading="dataListLoading"
        :data="dataList"
        border
        @selection-change="dataListSelectionChangeHandle"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="主键id"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="课程名称"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="label"
          label="标签：0 微课；1 慕课；2 spoc；3 直播；4 线下课程；"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="promoter"
          label="发起人"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="director"
          label="负责人"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="image"
          label="图片"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="content"
          label="课程说明"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="审核状态：0、未提交；1、审核中；2、通过；3、退回"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="buildStatus"
          label="建设状态：0、建设中；1、已完成"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="evaluate"
          label="建设评价"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="delFlag"
          label="删除标识  0：未删除    1：删除"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tenantCode"
          label="租户编码"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="creator"
          label="创建者"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="updater"
          label="更新者"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="updateDate"
          label="更新时间"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('handle')"
          fixed="right"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              v-if="$hasPermission('cur:curriculum:update')"
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row.id)"
              >{{ $t("update") }}</el-button
            >
            <el-button
              v-if="$hasPermission('cur:curriculum:delete')"
              type="text"
              size="small"
              @click="deleteHandle(scope.row.id)"
              >{{ $t("delete") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle"
      >
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update
        v-if="addOrUpdateVisible"
        ref="addOrUpdate"
        @refreshDataList="getDataList"
      ></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from "@/utils/view-module";
import AddOrUpdate from "./curriculum-add-or-update";
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: "/cur/curriculum/page",
        getDataListIsPage: true,
        deleteURL: "/cur/curriculum",
        deleteIsBatch: true,
      },
      dataForm: {
        id: "",
      },
    };
  },
  components: {
    AddOrUpdate,
  },
};
</script>
