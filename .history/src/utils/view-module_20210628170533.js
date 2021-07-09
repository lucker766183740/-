// import Cookies from 'js-cookie'
export default {
  data () {
    /* eslint-disable */
    return {
      // 设置属性
      mixinViewModuleOptions: {
        createdIsNeed: false,       // 此页面是否在创建时，调用查询数据列表接口？
        activatedIsNeed: true,    // 此页面是否在激活（进入）时，调用查询数据列表接口？
        getDataListURL: '',       // 数据列表接口，API地址
        getDataListIsPage: false, // 数据列表接口，是否需要分页？
        deleteURL: '',            // 删除接口，API地址
        deleteIsBatch: false,     // 删除接口，是否需要批量？
        deleteIsBatchKey: '',   // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
        exportURL: ''             // 导出接口，API地址
      },
      // 默认属性
      dataForm: {},               // 查询条件
      dataList: [],               // 数据列表
      order: '',                  // 排序，asc／desc
      sidx: '',                   // 排序，字段
      pageIndex: 1,               // 当前页码
      pageSize: 10,               // 每页数
      totalPage: 0,               // 总条数
      dataListLoading: false,     // 数据列表，loading状态
      dataListSelections: [],     // 数据列表，多选项
      addOrUpdateVisible: false   // 新增／更新，弹窗visible状态
    }
  },
  created () {
    if (this.mixinViewModuleOptions.createdIsNeed) {
      this.query()
    }
  },
  activated () {
    if (this.mixinViewModuleOptions.activatedIsNeed) {
      this.query()
    }
  },
  methods: {
    // 获取数据列表
    query () {
      this.dataListLoading = true
      console.log("url",this.mixinViewModuleOptions.getDataListURL)
      this.$http.get(
        this.mixinViewModuleOptions.getDataListURL,
        {
          params: this.$http.adornParams({
            'order': this.order,
            'sidx': this.sidx,
            'page': this.pageIndex,
            'limit': this.pageSize,
            ...this.dataForm
          })
        }
      ).then(({ data: res }) => {
        this.dataListLoading = false
        if (res.code !== 0) {
          this.dataList = []
          this.totalPage = 0
          return this.$message.error(res.msg)
        }
        this.dataList = this.mixinViewModuleOptions.getDataListIsPage ? res.page.list : res.data
        this.totalPage = this.mixinViewModuleOptions.getDataListIsPage ? res.page.totalCount : 0
      }).catch(() => {
        this.dataListLoading = false
      })
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 排序
    dataListSortChangeHandle (data) {
      if (!data.order || !data.prop) {
        this.order = ''
        this.sidx = ''
        return false
      }
      this.order = data.order.replace(/ending$/, '')
      this.sidx = data.prop.replace(/([A-Z])/g, '_$1').toLowerCase()
      this.query()
    },
    // 分页, 每页条数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.query()
    },
    // 分页, 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.query()
    },
    getDataList: function () {
      this.pageIndex = 1
      this.query()
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 返回每行数据index
    indexMethod (index) {
      return (this.pageIndex - 1) * this.pageSize + index + 1
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.roleId
      })
      // this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
      this.$confirm(`确定对选定数据进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.mixinViewModuleOptions.deleteURL,
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    }
    // 导出
    // exportHandle () {
    //   var params = qs.stringify({
    //     'token': Cookies.get('token'),
    //     ...this.dataForm
    //   })
    //   window.location.href = `${window.SITE_CONFIG['apiURL']}${this.mixinViewModuleOptions.exportURL}?${params}`
    // }
  }
}
