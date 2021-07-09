<template>
  <el-checkbox-group :value="value+''" v-model="checked" @input="$emit('input', $event)">
    <el-checkbox :label="data.dictValue" v-for="data in dataList" :key="data.dictValue">{{data.dictLabel}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
import { getDictDataList } from '@/utils'
export default {
  name: 'RenCheckboxGroup',
  data () {
    return {
      dataList: getDictDataList(this.dictType),
      checked: [],
      value: []
    }
  },
  props: {
    // value: [Boolean, Array, String, Number],
    dictType: String,
    checkedfor: Array
  },

  watch: {
    checkedfor (val) {
      this.checked = val
      console.log(this.checked)
    }
  }
}
</script>
