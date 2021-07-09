import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import renRadioGroup from '@/components/ren-radio-group'
import renSelect from '@/components/ren-select'
import renRegionTree from '@/components/ren-region-tree'
import renCommonTree from '@/components/ren-common-tree'
import renCheckboxGroup from '@/components/ren-checkbox-group'
import renImage from '@/components/ren-image'
import { getDictLabel } from '@/utils'

Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.use(renRadioGroup)
Vue.use(renSelect)
Vue.use(renRegionTree)
Vue.use(renCommonTree)
Vue.use(renCheckboxGroup)
Vue.use(renImage)

// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
