<template>
  <div class="ren-common">
    <el-upload
      :action="imageUploadUrl"
      list-type="picture-card"
      :data="imageUploadParam"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="imageOnSuccess"
      :file-list="imageList"
      :limit="limit"
      :id="id"
      :on-exceed="imageOnExceed"
      :on-change="imageOnChange"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: "RenImage",
  data() {
    return {
      imageUploadUrl: `${window.SITE_CONFIG['apiURL']}/oss/file/upload?access_token=${VueCookie.get('access_token')}`,
      imageUploadParam: {
        fileType: 'image'
      },
      dialogVisible: false,
      dialogImageUrl: '',
      imgUrl: this.imageUrl
    };
  },
  props: {
    imageList: Array,
    limit:Number,
    imageUrl: String,
    id:String
  },
  methods: {
    imageOnSuccess (response, file, fileList) {
      console.log(fileList)
    },
    imageOnExceed (files, fileList) {
      this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    handlePreview (file) {
      console.log(file)
    },

    handleRemove (file, fileList) {
      console.log('fileList:', fileList)
      this.imageUrlChange(fileList)
      var params = qs.stringify({
        'access_token': Cookies.get('access_token'),
        'imageUrl': file.url,
        'id': this.id
      })
      this.$http.delete(
          `${window.SITE_CONFIG['apiURL']}/oss/file?${params}`
        )
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = tru
    },

    imageOnChange (file, fileList) {
      console.log('fileList:', fileList)
      this.imageUrlChange(fileList)
    },
    imageUrlChange(fileList){
      this.imgUrl = ""
      let list = fileList
      let arr = []
      if(list.length > 0) {
        for (let image of list) {
          if (image.response) {
            arr.push(image.response.data.url)
          }
        }
        this.imgUrl = arr.join(',')
      }
      this.$emit('input', this.imgUrl)
    }
  }
}
</script>
