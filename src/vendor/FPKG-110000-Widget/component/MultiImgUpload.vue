<template>
  <div>
    <el-upload
      :headers="{'x-branch-source': $store.state.Config.branchSource}"
      with-credentials
      :on-success="onSuccess"
      :show-file-list="false"
      :action="action"
      multiple
      :name="name">
      <el-button size="small" type="primary">圖片上傳</el-button>
      <div slot="tip" class="el-upload__tip">只能上傳jpg/png文件，且不超過500kb</div>
    </el-upload>
    <el-collapse v-if="value.length > 0" v-model="activeImg" accordion>
      <el-collapse-item v-for="file,i in value" :key="file.url" :title="file.name" :name="i">
        <el-tooltip effect="dark" content="刪除圖片" placement="right">
          <img :src="file.url" @click="onClickImg(file)">
        </el-tooltip>
      </el-collapse-item>
    </el-collapse>
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
      default: () => [],
      type: Array
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
          this.$emit("input", this.value.filter(f => f.guid !== _f.guid))
          // this.form.files = this.form.files.filter(f => f.guid !== _f.guid)
        }).catch(() => {        
        });
    },
  },
  mounted() {
    this.$hub.$on("imgUpload:resetActiveImg", () => {
      this.activeImg = null
    })
  }
}

</script>

<style lang="stylus">
@import '../style/component/ImgUpload'
</style>
