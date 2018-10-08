<template>
  <el-dialog
    title="修改個人密碼"
    id="PasswdDialog"
    :visible.sync="dialogVisible"
    width="400px"
    @closed="clearForm"
    :before-close="() => SWITCH_PASSWD_DIALOG(false)">
    <el-form 
      label-width="100px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="passwdForm"
      >
      <el-form-item label="舊密碼" prop="oldPw">
        <el-input type="password" v-model.trim="form.oldPw"></el-input>
      </el-form-item>
      <el-form-item label="新密碼" prop="pw">
        <el-input type="password" v-model.trim="form.pw" placeholder="8-12英數字"></el-input>
      </el-form-item>
      <el-form-item label="新密碼確認" prop="pw_confirm">
        <el-input type="password" v-model.trim="form.pw_confirm" placeholder="8-12英數字"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_PASSWD_DIALOG(false)">取 消</el-button>
      <el-button type="primary" @click="onSubmit">修 改</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_PASSWD_DIALOG,
  EDIT_USER_PASSWD,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { userPwValidator, pwConfirmValidator, phoneValidator } from '@/vendor/FPKG-120000-Util/customValidate'
let initForm = {
        oldPw: "",
        pw: "",
        pw_confirm: "",
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.Widget.passwdDialogVisible
    }),
    formRules() {
      return {
        oldPw: [
          {required: true, message: "舊密碼為必填", trigger: "blur"},
          {validator: userPwValidator, trigger: "blur"},
        ],
        pw: [
          {required: true, message: "新密碼為必填", trigger: "blur"},
          {validator: userPwValidator, trigger: "blur"},
        ],
        pw_confirm: [
          {required: true, message: "新密碼確認為必填", trigger: "blur"},
          {validator: pwConfirmValidator.bind(this), trigger: "blur"},
        ],
      }
    }
  },
  methods: {
    ...mapMutations([
      SWITCH_PASSWD_DIALOG
    ]),
    onSubmit() {
      this.$refs.passwdForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_USER_PASSWD, this.form)
        }
      });
    },
    clearForm() {
      console.log("clearForm")
      setTimeout(() => this.$refs.passwdForm.clearValidate())
      this.form = Object.assign({}, initForm)
    }
  },
}
</script>

<style lang="stylus">
#HistoryDialog
  .el-table 
    th 
      background-color: #eee
    td p 
      margin-bottom: 0

</style>
