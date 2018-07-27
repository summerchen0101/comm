<template>
  <el-dialog
    :title="form.guid ? '編輯版型' : '新增版型'"
    :before-close="() => SWITCH_THEME_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="themeForm"
      >
      <el-form-item label="代碼" prop="code">
        <el-input v-model.trim="form.code"></el-input>
      </el-form-item>
      <el-form-item label="名稱" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="狀態" prop="status">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      
      <el-form-item label="圖片" prop="files">
        <MultiImgUpload v-model="form.files" 
                    :action="fileUploadApi"
                    :on-success="onUploadSuccess"></MultiImgUpload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_THEME_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.guid" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_THEME_DIALOG, 
  GET_THEME_LIST, 
  GET_THEME, 
  ADD_THEME, 
  EDIT_THEME, 
  CHECK_THEME_FORM, 
  UPLOAD_THEME_FILE 
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { branchDomain, fakeDomain } from '@/vendor/FPKG-10000-Config/branch'
import MultiImgUpload from '@/vendor/FPKG-110000-Widget/component/MultiImgUpload.vue';
import { codeValidator } from '@/vendor/FPKG-120000-Util/customValidate';

let initForm = {
        guid: "",
        code: "",
        name: "",
        status: true,
        files: []
      }
export default {
  components: {
    MultiImgUpload,
  },
  data() {
    return {
      form: Object.assign({}, initForm),
      formRules: {
        code: [
          { required: true, message: '代碼為必填', trigger: 'blur' },
        ]
      },
      fileUploadApi: `http://${fakeDomain}/theme/basic/uploadPreview`,
      activeImg: null
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.Theme.dialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_THEME_DIALOG
    ]),
    onUploadSuccess(res) {
      if(res.code === 0) {
        var file = res.response
        this.form.files.push({
            guid: file.p7_file_guid, 
            name: file.p7_file_source_name, 
            url: `http://${branchDomain}/${file.p7_file_folder}/${file.p7_file_name}`
          })
      }
    },
    
    onCreateSubmit() {
      this.$refs.themeForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_THEME, this.form)
        }
      });
    },
    onEditSubmit() {
      this.$refs.themeForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_THEME, this.form)
        }
      });
    },
  },
  
  mounted() {
    this.$hub.$on("theme:clearThemeForm", () => {
      this.form = Object.assing({}, initForm)
      this.$hub.$emit("imgUpload:resetActiveImg")
      this.$nextTick(() => {
        this.$refs.themeForm.resetFields();
      })
    })
  }
}
</script>

<style lang="stylus">

</style>
