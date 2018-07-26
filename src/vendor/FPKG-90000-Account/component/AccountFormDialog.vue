<template>
  <el-dialog
    :title="form.guid ? '編輯帳號' : '新增帳號'"
    :before-close="() => SWITCH_ACCOUNT_DIALOG(false)"
    :visible.sync="createDialogVisible"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="accountForm"
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_ACCOUNT_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.guid" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_ACCOUNT_DIALOG, 
  GET_ACCOUNT_LIST, 
  GET_ACCOUNT, 
  ADD_ACCOUNT, 
  EDIT_ACCOUNT,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { codeValidator } from '@/vendor/FPKG-10000-Config/customValidate';

let initForm = {
        guid: "",
        code: "",
        name: "",
        status: true,
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
      formRules: {
        code: [
          { required: true, message: '代碼為必填', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' },
        ]
      },
    }
  },
  computed: {
    ...mapState({
      createDialogVisible: state => state.Account.createDialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_ACCOUNT_DIALOG
    ]),
    
    onCreateSubmit() {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_ACCOUNT, this.form)
        }
      });
    },
    onEditSubmit() {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_ACCOUNT, this.form)
        }
      });
    },
  },
  
  mounted() {
    this.$hub.$on("account:clearAccountForm", () => {
      this.form = initForm
      this.$nextTick(() => {
        this.$refs.accountForm.resetFields();
      })
    })
  }
}
</script>

<style lang="stylus">

</style>
