<template>
  <el-dialog
    :before-close="() => SWITCH_WITHDRAW_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="500px">
    <span slot="title" class="el-dialog__title">
      {{withdraw.number}} 審核
       / 
      <span class="text-info">{{$root.toOption(typeOpts, withdraw.withdrawType)}}</span>
    </span>
    <el-form ref="withdrawForm" 
              :model="form" 
              label-position="top" 
              :rules="formRules"
              style="margin-top: -20px"
              >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="帳號">
            <el-input :value="withdraw.account" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="withdraw.bankInfo" label="實際出款">
            <el-input :value="$root.toCurrency(currentActualWithdrawPoint)" disabled></el-input>
          </el-form-item>
          
          <!-- 僅「網路轉帳」及「臨櫃專存」時顯示銀行資訊 -->
          <template v-if="withdraw.withdrawType !== 3">
            <el-form-item label="銀行代碼">
                <el-input :value="withdraw.bankInfo && withdraw.bankInfo.bankCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="分行名稱">
              <el-input :value="withdraw.bankInfo && withdraw.bankInfo.branchName" disabled></el-input>
            </el-form-item>
            <el-form-item label="戶名">
              <el-input :value="withdraw.bankInfo && withdraw.bankInfo.accountName" disabled></el-input>
            </el-form-item>
            <el-form-item label="銀行帳號">
              <el-input :value="withdraw.bankInfo && withdraw.bankInfo.bankAccount" disabled></el-input>
            </el-form-item>
          </template>
          
          <!-- 訂單為「取消」狀態時顯示原因 -->
          <el-form-item v-if="type === 'cancel'" label="原因" prop="reason">
            <el-input type="textarea" v-model="form.reason"></el-input>
          </el-form-item>
          
        </el-col>
        <el-col :span="12">
          <el-form-item label="錢包點數">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.pocketPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="未達流水點數">
            <!-- <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.disallowWithdrawPoint)" disabled></el-input> -->
            <el-input value="-" disabled></el-input>
          </el-form-item>
          <el-form-item label="達流水可提領">
            <!-- <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.allowWithdrawPoint)" disabled></el-input> -->
            <el-input value="-" disabled></el-input>
          </el-form-item>
          <el-form-item label="提款點數">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.withdrawPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="提款手續費">
            <el-input v-model.number.trim="form.fee" 
                      :disabled="type !== 'confirm'" 
                      type="number"
                      @blur="getCurrentActualWithdrawPoint"></el-input>
          </el-form-item>
          <el-form-item label="未達流水手續費">
            <el-input v-model.number.trim="form.disallowWithdrawFee" 
                      :disabled="type !== 'confirm'" 
                      type="number"
                      @blur="getCurrentActualWithdrawPoint"></el-input>
          </el-form-item>
          <el-form-item label="運費">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.freight)" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_WITHDRAW_DIALOG(false)">取 消</el-button>
      <el-button v-if="type === 'confirm'" type="success" @click="onChangeStatus('confirm')">通 過</el-button>
      <el-button v-else-if="type === 'cancel'" type="danger" @click="onChangeStatus('cancel')">未 通 過</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_WITHDRAW_DIALOG, 
  GET_WITHDRAW_LIST, 
  SET_WITHDRAW,
  USER_INFO,
  SET_WITHDRAW_STATUS,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

let initForm = {
        reason: "",
        fee: 0,
        disallowWithdrawFee: 0,
      }

export default {
  data() {
    return {
      form: Object.assign({}, initForm),
      type: '',
      currentActualWithdrawPoint: ""
    }
  },
  computed: {
    ...mapState({
      typeOpts: state => state.Global.withdrawTypeOpts,
      withdraw: state => state.Money.Withdraw.withdraw,
      dialogVisible: state => state.Money.Withdraw.withdrawDialogVisible,
    }),
    formRules() {
      return {
        reason: [
          { required: this.type === 'cancel', message: '原因為必填', trigger: 'blur' },
        ]
      }
    },
  },
  watch: {
    "form": "getCurrentActualWithdrawPoint"
  },
  methods: {
    ...mapMutations([
      SWITCH_WITHDRAW_DIALOG
    ]),
    clearForm() {
      setTimeout(() => this.$refs.withdrawForm.clearValidate())
      this.form = Object.assign({}, initForm, {
        fee: this.withdraw.bankInfo.fee
      })
    },
    onChangeStatus(action) {
      this.$refs.withdrawForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(SET_WITHDRAW_STATUS, {
            ...this.withdraw,
            ...this.form,
            action,
            operatorId: this.$store.getters[USER_INFO].id
          })
        }
      });
    },
    getCurrentActualWithdrawPoint() {
      console.log(
        this.withdraw.bankInfo.withdrawPoint,
        this.form.fee,
        this.form.disallowWithdrawFee,
        this.withdraw.bankInfo.freight,
      )
      this.currentActualWithdrawPoint = this.withdraw.bankInfo.withdrawPoint - (
        this.form.fee +
        this.form.disallowWithdrawFee +
        this.withdraw.bankInfo.freight
      )
    }
  },
  
  created() {
    this.$hub.$on("withdraw:clearForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
