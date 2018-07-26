<template>
  <el-dialog
    id="BranchFormDialog"
    :title="form.guid ? '編輯站台' : '新增站台'"
    :before-close="() => SWITCH_BRANCH_DIALOG(false)"
    :visible.sync="createDialogVisible"
    width="70%">
    <el-form 
      label-width="120px" 
      label-position="left"
      :model="form"
      :rules="formRules"
      ref="branchForm"
      >
      <el-form-item label="代碼" prop="code">
        <el-input v-model.trim="form.code"></el-input>
      </el-form-item>
      <el-form-item label="名稱" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="狀態" prop="status" required>
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="允許註冊" prop="allowRegister" required>
        <el-radio-group v-model="form.allowRegister">
          <el-radio label="y">是</el-radio>
          <el-radio label="n" value>否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分公司數量" prop="subsidiaries">
        <el-input-number v-model="form.subsidiaries" :min="1" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="年份類型" prop="yearType" required>
        <el-radio-group v-model="form.yearType">
          <el-radio label="1">西元</el-radio>
          <el-radio label="2">民國</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="備註" prop="memo">
        <el-input type="textarea" v-model="form.memo"></el-input>
      </el-form-item>
      <el-form-item label="LOGO" prop="logoFile">
        <SingleImgUpload v-model="form.logoFile" 
                    name="p3_bch_logo"
                    :action="fileUploadApi"
                    :on-success="onUploadSuccess"></SingleImgUpload>
      </el-form-item>
      <el-form-item prop="domains">
        <template slot="label">
          <span>站台網址</span>
          <el-button type="text" size="mini" class="ml-1" @click="onClickDomainAdd">
            <font-awesome-icon icon="plus-circle" style="font-size: 15px"/>
          </el-button>
        </template>
        <div class="form-groups">
          <div 
            class="inside-form"
            v-for="d,i in form.domains" 
            :key="i"
            >
            <el-form-item label="網址" :prop="'domains.' + i + '.domain'" :rules="domainRules">
              <el-input v-model="d.domain"></el-input>
            </el-form-item>
            <el-form-item label="使用https">
              <el-radio-group v-model="d.isHttps">
                <el-radio label="y">是</el-radio>
                <el-radio label="n">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="設為主網址">
              <el-radio v-model="form.primaryDoaminIndex" :label="i">&nbsp;</el-radio>
            </el-form-item>
            <el-form-item label="備註">
              <el-input type="textarea" v-model="d.memo"></el-input>
            </el-form-item>
            <el-button v-if="form.domains.length > 1" slot="label" type="text" @click="onClickDomainDel(i)">刪除網址</el-button>
          </div>
        </div>
        
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_BRANCH_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.guid" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_BRANCH_DIALOG, 
  GET_BRANCH_LIST, 
  GET_BRANCH, 
  ADD_BRANCH, 
  EDIT_BRANCH,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { branchDomain, fakeDomain } from '@/vendor/FPKG-10000-Config/branch'
import SingleImgUpload from '@/vendor/FPKG-110000-Widget/component/SingleImgUpload.vue';
import { codeValidator } from '@/vendor/FPKG-10000-Config/customValidate';

let initDomain = {
          domain: "",
          isHttps: "n",
          memo: ""
        }
let initForm = {
        guid: "",
        code: "",
        name: "",
        status: true,
        allowRegister: "y", // 允許註冊 必填,{in:y,n}
        subsidiaries: 0, // 分公司數量 0~200
        yearType: "1", // 年份類型	必填,{in:1,2}
        memo: "", // 不可超過200字	
        logoFile: null, // fileGuid,
        domains: [
          Object.assign({}, initDomain)
        ],
        primaryDoaminIndex: 0
      }
export default {
  components: {
    SingleImgUpload
  },
  data() {
    return {
      form: Object.assign({}, initForm),
      domainRules: [
        {
          required: true, message: '網址不能為空', trigger: 'blur'
        }
      ],
      formRules: {
        code: [
          { required: true, message: '代碼為必填', trigger: 'blur' },
          // { validator: codeValidator, trigger: 'blur' },
        ],
        name: [
          { required: true, message: '名稱為必填', trigger: 'blur' },
        ],
      },
      fileUploadApi: `http://${fakeDomain}/branch/setting/uploadLogo`,
    }
  },
  computed: {
    ...mapState({
      createDialogVisible: state => state.Branch.createDialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_BRANCH_DIALOG
    ]),
    onUploadSuccess(res) {
      if(res.code === 0) {
        var file = res.response
        this.form.logoFile = {
            guid: file.p7_file_guid, 
            name: file.p7_file_source_name, 
            url: `http://${branchDomain}/${file.p7_file_folder}/${file.p7_file_name}`
          }
      }
    },

    onCreateSubmit() {
      this.$refs.branchForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_BRANCH, this.form)
        }
      });
    },
    onEditSubmit() {
      this.$refs.branchForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_BRANCH, this.form)
        }
      });
    },

    onClickDomainAdd() {
      this.form.domains.push(Object.assign({}, initDomain))
    },
    onClickDomainDel(index) {
      console.log(index)
      this.form.domains.splice(index, 1)
    },
  },
  
  mounted() {
    this.$hub.$on("branch:clearBranchForm", () => {
      this.form = initForm
      this.$nextTick(() => {
        this.$refs.branchForm.resetFields();
      })
    })
  }
}
</script>

<style lang="stylus">
#BranchFormDialog
  .el-form 
    .form-groups
      .inside-form
        margin-bottom: 20px
        padding-bottom: 10px
        border-bottom: 1px solid #ddd
        .el-form-item--small.el-form-item
          // margin-bottom: 0
        &:last-of-type 
          border-bottom: 0
</style>
