<template>
  <el-dialog
    title="新增帳號"
    :before-close="() => SWITCH_MEMBER_DIALOG(false)"
    :visible.sync="dialogVisible"
    @closed="afterClosed"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="memberForm"
      >
      <el-form-item label="手機" prop="phone">
        <el-input v-model.trim="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="pw">
        <el-input type="password" v-model.trim="form.pw"></el-input>
      </el-form-item>
      <el-form-item label="密碼確認" prop="pw_confirm">
        <el-input type="password" v-model.trim="form.pw_confirm"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_MEMBER_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.id" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_MEMBER_DIALOG,
  ADD_MEMBER,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { memberPwValidator, pwConfirmValidator, phoneValidator } from '@/vendor/FPKG-120000-Util/customValidate.js'

let initForm = {
        phone: "",
        pw: "",
        pw_confirm: ""
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.Member.MemberManage.dialogVisible,
    }),
    formRules() {
      return {
        phone: [
          {required: true, message: "手機為必填", trigger: "blur"},
          {validator: phoneValidator, trigger: "blur"},
        ],
        pw: [
          {required: true, message: "密碼為必填", trigger: "blur"},
          {validator: memberPwValidator, trigger: "blur"},
        ],
        pw_confirm: [
          {required: true, message: "密碼確認為必填", trigger: "blur"},
          {validator: pwConfirmValidator, trigger: "blur"},
        ],
      }
    }
  },
  methods: {
    ...mapMutations([
      SWITCH_MEMBER_DIALOG
    ]),
    
    onCreateSubmit() {
      this.$refs.memberForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_MEMBER, this.form)
        }
      });
    },
    clearForm() {
      setTimeout(() => this.$refs.memberForm.clearValidate())
      this.form = Object.assign({}, initForm)
    },
    afterClosed() {
      this.clearForm()
    }
  },
  
  created() {
    this.$hub.$on("Member:clearMemberForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
