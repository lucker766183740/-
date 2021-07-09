<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? '新增': '修改'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-tabs v-model="activeName" style="min-height:500px;">
    <el-tab-pane label="基础信息" name="first">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
          <el-form-item label="课程名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="课程名称"></el-input>
      </el-form-item>
          <el-form-item label="标签" prop="label">
         <ren-select v-model="dataForm.label" dict-type="cur_label" placeholder="分类" style="width:100%"></ren-select>
      </el-form-item>
          <el-form-item label="发起人" prop="promoter">
          <el-select v-model="dataForm.promoter" style="width:100%" placeholder="请选择">
            <el-option v-for="item in promotList" :key="item.userId" :label="item.realname" :value="item.userId"></el-option>
          </el-select>
      </el-form-item>
          <el-form-item label="负责人" prop="director">
          <el-select v-model="dataForm.director" style="width:100%" placeholder="请选择">
            <el-option v-for="item in directList" :key="item.userId" :label="item.realname" :value="item.userId"></el-option>
          </el-select>
      </el-form-item>
          <!-- <el-form-item label="图片" prop="image">
          <el-input v-model="dataForm.image" placeholder="图片"></el-input>
      </el-form-item> -->
          <el-form-item label="课程说明" prop="content">
          <el-input v-model="dataForm.content" placeholder="课程说明"></el-input>
      </el-form-item>
          <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    </el-tab-pane>
    <el-tab-pane label="课程资料" name="second">
      <el-card style="margin-bottom:50px;">
            <div class="card">
                <span >资料总数 <span style="color:#888;">{{resList.length}}</span></span>
                <el-button type="primary" size="mini"  @click="addOrUpdateHandle()" style="margin-left:40px;">添加资料</el-button>
            </div>
            <curriculum-add-res  v-if="dialogVisible" @getcurrAddData="getcurrAddData" ref="curriculumAddRes" @refreshDataList="getDataList"></curriculum-add-res>
        </el-card>
        <!-- 添加的所有课程资料 -->
        <div class="addclassTime">
            <el-card style="margin-bottom:10px;" v-for="(v,i) in resList" :key="i">
                <div class="classTimeDetails">
                    <span style="margin-right:50px;">标题名称:{{v.title}}</span>
                    <span>资料类型:{{v.resource}}</span>
                </div>
                <i class="el-icon-close closeIcon" @click="removeData(i)"></i>
            </el-card>
        </div>
    </el-tab-pane>
    <el-tab-pane label="课程结构" name="third">
      <el-button type="primary" style="margin-bottom:30px;" @click="addHandle2('one')">新增课时</el-button>
      <el-row>
        <el-col :span="9">
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node , data }">
              <span>{{ node.label }}</span>
              <span style="margin-left:35px;">
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  新增
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="13" style="margin-left:5%">
          <curriculum-add-structure v-if="dialogVisible2" @getStructureData="getStructureData" ref="curriculumAddStructure" ></curriculum-add-structure>
        </el-col>
      </el-row>
      
    </el-tab-pane>
    <el-tab-pane label="课程团队" name="fourth">
      <el-transfer
      style="text-align: left; display: inline-block"
      v-model="valueTrans"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['Source', 'Target']"
      :button-texts="['到左边', '到右边']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="dataTrans">
      <span slot-scope="{ option }">{{ option.label }}</span>
    </el-transfer>
    </el-tab-pane>
  </el-tabs>
    
    <template slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">确认</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
import mixinViewModule from '@/utils/view-module'
import curriculumAddRes from './curriculum-add-res.vue'
import curriculumAddStructure from './curriculum-add-structure.vue'
export default {
  mixins: [mixinViewModule],
  data () {
    let data = []
    return {
      data: JSON.parse(JSON.stringify(data)),
      dialogVisible: false,
      dialogVisible2: false,
      visible: false,
      activeName: 'first',
      id: 100000,
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
      directList: [],
      valueTrans: '',
      resList: [],
      dataTrans: [],
      structList: []
    }
  },
  components: {
    curriculumAddRes,
    curriculumAddStructure
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
    addOrUpdateHandle () {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.curriculumAddRes.init()
      })
    },
    addHandle2 (str) {
      this.dialogVisible2 = true
      this.$nextTick(() => {
        this.$refs.curriculumAddStructure.init(str)
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
      this.$http.get(`/sys/user/list`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.promotList = res.list
        this.directList = res.list
        this.generateData(res.list)
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        console.log('data', this.dataForm)
        console.log('valueTrans', this.valueTrans)
        console.log('resList', this.resList)
        console.log('kejian', this.data)
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
    }, 1000, { 'leading': true, 'trailing': false }),
    generateData (data) {
      let trans = []
      data.forEach((item, index) => {
        trans.push({
          label: item.realname,
          key: item.userId,
          pinyin: item.realname
        })
      })
      this.dataTrans = trans
    },
    getcurrAddData (data) {
      this.resList.push(data)
      console.log('11111111111', this.resList)
    },
    // 删除创建的数据
    removeData (i) {
      this.resList.splice(i, 1)
    },
    // 树形结构
    append (data) {
      this.addHandle2(data)
    },
    getStructureData (_d) {
      this.structList.push(_d)
      console.log('-d', _d)
      let newObj = {}
      if (_d.str === 'one') {
        newObj = { id: this.id++, label: _d.chapter, children: [] }
        this.data.push(newObj)
      } else {
        let data = _d.str
        const newChild = { id: this.id++, label: _d.chapter, children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      }
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>
<style scoped>
  .closeIcon{
    float: right;
    margin-top: -19px;
  }
    .custom-tree-node {
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
