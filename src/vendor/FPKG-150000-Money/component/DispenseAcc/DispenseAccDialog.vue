<template>
  <el-dialog
    :title="form.id ? '編輯出款帳戶' : '新增出款帳戶'"
    :before-close="() => SWITCH_DISPENSE_ACC_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="dispenseAccForm"
      >
      <el-form-item label="銀行代碼" prop="bankCode">
        <el-select v-model="form.bankCode">
          <el-option v-for="b in bankList" :key="b.code" :value="b.code" :label="b.name"></el-option>
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
      <el-button @click="SWITCH_DISPENSE_ACC_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.id" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_DISPENSE_ACC_DIALOG, 
  GET_DISPENSE_ACC_LIST, 
  GET_DISPENSE_ACC, 
  ADD_DISPENSE_ACC, 
  EDIT_DISPENSE_ACC,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { codeValidator } from '@/vendor/FPKG-120000-Util/customValidate';
import { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'

let initForm = {
        id: "",
        bankCode: null,
        branchName: "",
        accountName: "",
        bankAccount: "",
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
      formRules: {
        bankCode: [
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
      dialogVisible: state => state.Money.DispenseAcc.dialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_DISPENSE_ACC_DIALOG
    ]),
    
    onCreateSubmit() {
      console.log(this.form)
      this.$refs.dispenseAccForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_DISPENSE_ACC, this.form)
        }
      });
    },
    onEditSubmit() {
      this.$refs.dispenseAccForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_DISPENSE_ACC, this.form)
        }
      });
    },
    setForm(formData) {
      this.form = Object.assign({}, formData)
    },
    clearForm() {
      this.form = Object.assign({}, initForm)
      if(this.$refs.dispenseAccForm) {
        this.$refs.dispenseAccForm.resetFields();
      }
    },
  },
  
  created() {
    this.$hub.$on("Money:dispenseAccFormUpdate", this.setForm)
    this.$hub.$on("Money:clearDispenseAccForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
