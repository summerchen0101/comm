<template>
  <el-dialog
    :title="dialogTitle"
    :before-close="() => SWITCH_SITE_ANNOUNCE_DIALOG(false)"
    @open="resetForm"
    @closed="onCloseDialog"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="siteAnnounceForm"
      >
      <el-form-item label="置頂" prop="lockTop">
        <el-radio-group v-model="form.lockTop">
          <el-radio :label="true">開啟</el-radio>
          <el-radio :label="false">關閉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="標題" prop="title">
        <el-input v-model.trim="form.title" placeholder="20字為限"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model.trim="form.desc" placeholder="500字為限"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_SITE_ANNOUNCE_DIALOG(false)">取 消</el-button>
      <el-button v-if="$route.query.dia === 1" type="primary" @click="onCreateSubmit">新 增</el-button>
      <el-button v-else-if="$route.query.dia === 2" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else-if="$route.query.dia === 3" type="primary" @click="onCopySubmit">複 製</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_SITE_ANNOUNCE_DIALOG, 
  GET_SITE_ANNOUNCE_LIST, 
  GET_SITE_ANNOUNCE, 
  ADD_SITE_ANNOUNCE, 
  EDIT_SITE_ANNOUNCE,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { codeValidator, startAtValidator, endAtValidator } from '@/vendor/FPKG-120000-Util/customValidate';
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'

let initForm = {
        id: "",
        title: "",
        desc: "",
        lockTop: false,
      }
export default {
  data() {
    return {
      form: Object.assign(initForm),
      dialogTypes: [
        {id: 1, title: '新增平台公告'},
        {id: 2, title: '編輯平台公告'},
        {id: 3, title: '複製平台公告'},
      ]
    }
  },
  computed: {
    dialogTitle() {
      let i = this.dialogTypes.findIndex(t => t.id === this.$route.query.dia)
      return i > -1 ? this.dialogTypes[i].title : 'xxx'
    },
    ...mapState({
      dialogVisible: state => state.Announce.SiteAnnounce.dialogVisible,
      siteAnnounceList: state => state.Announce.SiteAnnounce.siteAnnounceList,
    }),
    formRules() {
      return {
        code: [
          { required: true, message: '代碼為必填', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' },
        ],
        lockTop: [
          { required: true, message: '置頂狀態為必填', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '標題為必填', trigger: 'blur' },
          { max: 20, message: '最多為20字內', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '內容為必填', trigger: 'blur' },
          { max: 500, message: '最多為500字內', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    ...mapMutations([
      SWITCH_SITE_ANNOUNCE_DIALOG
    ]),
    
    onCreateSubmit() {
      this.$refs.siteAnnounceForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_SITE_ANNOUNCE, this.form)
        }
      });
    },
    onEditSubmit() {
      this.$refs.siteAnnounceForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_SITE_ANNOUNCE, this.form)
        }
      });
    },
    onCopySubmit() {
      this.$refs.siteAnnounceForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_SITE_ANNOUNCE, this.form)
        }
      });
    },
    setForm(formData) {
      setTimeout(() => this.$refs.siteAnnounceForm.clearValidate())
      this.form = Object.assign({}, formData)
    },
    resetForm() {
      setTimeout(() => this.$refs.siteAnnounceForm.clearValidate())
      if(this.$route.query.id) {
        let index = this.siteAnnounceList.findIndex(t => t.id == this.$route.query.id)
        this.form = Object.assign({}, this.siteAnnounceList[index])
      }
      else {
        this.form = Object.assign({}, initForm)
      }
    },
    onCloseDialog() {
      this.$router.push({name: this.$route.name, query: {}})
    }
  },
  
  created() {
    this.$hub.$on("Announce:siteAnnounceFormUpdate", this.setForm)
    this.$hub.$on("Announce:clearSiteAnnounceForm", this.resetForm)
  }
}
</script>

<style lang="stylus">

</style>
