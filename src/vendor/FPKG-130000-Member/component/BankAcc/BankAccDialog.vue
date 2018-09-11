<template>
  <el-dialog
    title="銀行帳號審核"
    :before-close="() => SWITCH_BANK_ACC_DIALOG(false)"
    @open="onOpen"
    @closed="clearForm"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form
      label-width="80px"
      label-position="left"
      status-icon
      :model="form"
      :rules="formRules"
      ref="bankAccForm"
      >
      <el-form-item label="帳號" prop="account">
        <el-input v-model.trim="form.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="銀行代碼" prop="bankName">
        <el-input v-model.trim="form.bankName" disabled></el-input>
      </el-form-item>
      <el-form-item label="分行名稱" prop="branchName">
        <el-input v-model.trim="form.branchName" :disabled="['cancel', 'info'].indexOf(bankAcc.type) > -1"></el-input>
      </el-form-item>
      <el-form-item label="戶名" prop="accountName">
        <el-input v-model.trim="form.accountName" :disabled="['cancel', 'info'].indexOf(bankAcc.type) > -1"></el-input>
      </el-form-item>
      <el-form-item label="銀行帳號" prop="bankAccount">
        <el-input v-model.trim="form.bankAccount" :disabled="['cancel', 'info'].indexOf(bankAcc.type) > -1"></el-input>
      </el-form-item>
      <el-form-item label="圖片" prop="pic">
        <img v-if="form.pic" :src="form.pic" alt="">
        <span v-else>(尚無圖片)</span>
      </el-form-item>
      <el-form-item v-if="['cancel', 'info'].indexOf(bankAcc.type) > -1" label="原因" prop="reason">
        <el-input v-model.trim="form.reason" :disabled="bankAcc.type === 'info'"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <template v-if="bankAcc.type === 'info'">
        <el-button type="primary" @click="SWITCH_BANK_ACC_DIALOG(false)">確 定</el-button>
      </template>
      <template v-else>
        <el-button @click="SWITCH_BANK_ACC_DIALOG(false)">取 消</el-button>
        <el-button v-if="bankAcc.type === 'edit'" type="primary" @click="onChangeStatus('confirm')">修 改</el-button>
        <el-button v-if="bankAcc.type === 'confirm'" type="success" @click="onChangeStatus('confirm')">通 過</el-button>
        <el-button v-else-if="bankAcc.type === 'cancel'" type="danger" @click="onChangeStatus('cancel')">未 通 過</el-button>
      </template>
    </span>
  </el-dialog>
</template>

<script>
import {
  SWITCH_BANK_ACC_DIALOG,
  GET_BANK_ACC_LIST,
  GET_BANK_ACC,
  EDIT_BANK_ACC,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'

let initForm = {
        id: "",
        account: "",
        nick: "",
        bankCode: "",
        bankName: "",
        branchName: "",
        accountName: "",
        bankAccount: "",
        reason: "",
        pic: ""
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.Member.BankAcc.dialogVisible,
      bankAcc: state => state.Member.BankAcc.bankAcc,
    }),
    formRules() {
      return {
        branchName: [
          { required: true, message: '分行名稱為必填', trigger: 'blur' },
        ],
        accountName: [
          { required: true, message: '戶名為必填', trigger: 'blur' },
        ],
        bankAccount: [
          { required: true, message: '銀行帳號為必填', trigger: 'blur' },
        ],
        reason: [
          { required: ['cancel', 'info'].indexOf(this.bankAcc.type) > -1, message: '原因為必填', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    ...mapMutations([
      SWITCH_BANK_ACC_DIALOG
    ]),
    setForm(formData) {
      setTimeout(() => this.$refs.bankAccForm.clearValidate())
      this.form = Object.assign({}, formData)
    },
    clearForm() {
      setTimeout(() => this.$refs.bankAccForm.clearValidate())
      this.form = Object.assign({}, initForm)
    },

    onOpen() {
      let _d = this.bankAcc
      this.form = Object.assign({}, this.form, {
        id: _d.id,
        account: _d.account,
        nick: _d.nick,
        bankCode: _d.bankCode,
        bankName: _d.bankName,
        branchName: _d.branchName,
        accountName: _d.accountName,
        bankAccount: _d.bankAccount,
        reason: _d.reason,
        pic: _d.pic,
      })
    },
    onChangeStatus(action) {
      this.$refs.bankAccForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_BANK_ACC, {
            ...this.form,
            action,
          })
        }
      });
    }
  },

  created() {
    this.$hub.$on("Member:bankAccFormUpdate", this.setForm)
    this.$hub.$on("Member:clearBankAccForm", this.clearForm)
  }
}
</script>

<style lang="stylus">
</style>
