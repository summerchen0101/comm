<template>
  <el-dialog
    :title="form.id ? '編輯存款帳戶' : '新增存款帳戶'"
    :before-close="() => SWITCH_DEPOSIT_ACC_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="depositAccForm"
      >
      <el-form-item label="銀行代碼" prop="bankID">
        <el-select v-model="form.bankID">
          <el-option v-for="b in bankList" :key="b.bank_id" :value="b.bank_id" :label="b.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分行名稱" prop="branchName">
        <el-input v-model.trim="form.branchName"></el-input>
      </el-form-item>
      <el-form-item label="戶名" prop="accountName">
        <el-input v-model.trim="form.accountName"></el-input>
      </el-form-item>
      <el-form-item label="銀行帳號" prop="bankAccount">
        <el-input v-model.trim="form.bankAccount"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_DEPOSIT_ACC_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.id" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_DEPOSIT_ACC_DIALOG, 
  GET_DEPOSIT_ACC_LIST, 
  GET_DEPOSIT_ACC, 
  ADD_DEPOSIT_ACC, 
  EDIT_DEPOSIT_ACC,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { codeValidator } from '@/vendor/FPKG-120000-Util/customValidate';
import { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'

let initForm = {
        id: "",
        bankID: null,
        branchName: "",
        accountName: "",
        bankAccount: "",
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
      formRules: {
        bankID: [
          { required: true, message: '銀行代碼為必填', trigger: 'blur' },
        ],
        branchName: [
          { required: true, message: '分行名稱為必填', trigger: 'blur' },
        ],
        accountName: [
          { required: true, message: '戶名為必填', trigger: 'blur' },
        ],
        bankAccount: [
          { required: true, message: '銀行帳戶為必填', trigger: 'blur' },
        ],
      },
      startAtOption: {
        disabledDate: (val) => {
          return dateBefore(startAtDay(new Date()), val)
        }
      },
      endAtOption: {
        disabledDate: (val) => {
          return dateBefore(this.form.startAt, val) 
        }
      },
    }
  },
  computed: {
    ...mapState({
      bankList: state => state.Global.bankList,
      dialogVisible: state => state.Money.DepositAcc.dialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_DEPOSIT_ACC_DIALOG
    ]),
    
    onCreateSubmit() {
      this.$refs.depositAccForm.validate((valid) => {
        if (valid) {
          let bank = this.bankList.find(b => b.bank_id === this.form.bankID)
          this.$store.dispatch(ADD_DEPOSIT_ACC, {...this.form, bankCode: bank.code})
        }
      });
    },
    onEditSubmit() {
      this.$refs.depositAccForm.validate((valid) => {
        if (valid) {
          let bank = this.bankList.find(b => b.bank_id === this.form.bankID)
          this.$store.dispatch(EDIT_DEPOSIT_ACC, {...this.form, bankCode: bank.code})
        }
      });
    },
    setForm(formData) {
      setTimeout(() => this.$refs.depositAccForm.clearValidate())
      this.form = Object.assign({}, formData)
    },
    clearForm() {
      setTimeout(() => this.$refs.depositAccForm.clearValidate())
      this.form = Object.assign({}, initForm)
    },
  },
  
  created() {
    this.$hub.$on("Money:depositAccFormUpdate", this.setForm)
    this.$hub.$on("Money:clearDepositAccForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
