<template>
  <div>
    <el-upload
      :headers="{'x-branch-source': $store.state.Config.branchSource}"
      with-credentials
      :on-success="onSuccess"
      :show-file-list="false"
      :action="action"
      :name="name">
      <el-button size="small" type="primary">圖片上傳</el-button>
      <div slot="tip" class="el-upload__tip">只能上傳jpg/png文件，且不超過500kb</div>
    </el-upload>
    <el-tooltip v-if="value" effect="dark" content="刪除圖片" placement="right">
      <img :src="value.url" @click="onClickImg(value)">
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      default: "file_upload",
      type: String
    },
    action: {
      default: "",
      type: String
    },
    onSuccess: {
      type: Function
    },
    value: {
      default: () => {},
      type: Object
    },
  },
  data() {
    return {
      activeImg: null
    }
  },
  methods: {
    onClickImg(_f) {
      this.$confirm('是否刪除圖片', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit("input", null)
        }).catch(() => {        
        });
    },
  },
  mounted() {
  }
}

</script>

<style lang="stylus">
@import '../style/component/ImgUpload'
</style>
