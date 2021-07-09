<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-__resourcesfile}">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.id" placeholder="id" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="isAuth(':resourcesfile:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="isAuth(':resourcesfile:delete')" type="danger" @click="deleteHandle()">批量删除</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="selectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="id" label="主键id" header-align="center" align="center"></el-table-column>
        <el-table-column prop="authorId" label="作者id" header-align="center" align="center"></el-table-column>
        <el-table-column prop="type" label="类型：0、案例；1、课件；2、大纲；3、教材；4、讲义；5、辅导资料；6、实用工具" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="content" label="内容、摘要、案情" header-align="center" align="center"></el-table-column>
        <el-table-column prop="keyword" label="关键词、用途、侦察过程" header-align="center" align="center"></el-table-column>
        <el-table-column prop="isPublish" label="是否出版 0:否,1:是（教材）" header-align="center" align="center"></el-table-column>
        <el-table-column prop="message" label="出版信息、关键问题" header-align="center" align="center"></el-table-column>
        <el-table-column prop="conclusion" label="研究结论" header-align="center" align="center"></el-table-column>
        <el-table-column prop="opinion" label="专家意见" header-align="center" align="center"></el-table-column>
        <el-table-column prop="fileType" label="文件类型：" header-align="center" align="center"></el-table-column>
        <el-table-column prop="fileName" label="文件名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="fileUrl" label="文件路径" header-align="center" align="center"></el-table-column>
        <el-table-column prop="fileSuffix" label="文件后缀" header-align="center" align="center"></el-table-column>
        <el-table-column prop="fileSize" label="文件大小" header-align="center" align="center"></el-table-column>
        <el-table-column prop="integral" label="下载积分" header-align="center" align="center"></el-table-column>
        <el-table-column prop="collectNum" label="收藏数量" header-align="center" align="center"></el-table-column>
        <el-table-column prop="downloadNum" label="下载数量" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shareNum" label="分享数量" header-align="center" align="center"></el-table-column>
        <el-table-column prop="status" label="审核状态：0、未提交；1、审核中；2、通过；3、退回" header-align="center" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" header-align="center" align="center"></el-table-column>
        <el-table-column prop="delFlag" label="删除标识  0：未删除    1：删除" header-align="center" align="center"></el-table-column>
        <el-table-column prop="tenantCode" label="租户id" header-align="center" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建者" header-align="center" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="updater" label="更新者" header-align="center" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="更新时间" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="isAuth(':resourcesfile:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
            <el-button v-if="isAuth(':resourcesfile:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/utils/view-module'
import AddOrUpdate from './resourcesfile-add-or-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '//resourcesfile/page',
        getDataListIsPage: true,
        deleteURL: '//resourcesfile',
        deleteIsBatch: true
      },
      dataForm: {
        id: ''
      }
    }
  },
  components: {
    AddOrUpdate
  }
}
</script>
