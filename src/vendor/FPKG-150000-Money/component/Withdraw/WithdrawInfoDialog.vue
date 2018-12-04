<template>
  <el-dialog
    :before-close="() => SWITCH_WITHDRAW_INFO_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="500px">
    <span slot="title" class="el-dialog__title">
      {{withdraw.number}} 資訊
       / 
      <span class="text-info">{{$root.toOption(typeOpts, withdraw.withdrawType)}}</span>
    </span>
    <el-form label-position="top" style="margin-top: -20px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="帳號">
            <el-input :value="withdraw.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="實際出款">
            <el-input :value="withdraw.actualWithdrawPoint" disabled></el-input>
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

          <el-form-item label="原因">
            <el-input type="textarea" :value="withdraw.reason" disabled></el-input>
          </el-form-item>
          
        </el-col>
        <el-col :span="12">
          <el-form-item label="錢包點數">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.pocketPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="未達流水點數">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.disallowWithdrawPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="達流水可提領">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.allowWithdrawPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="提款點數">
            <el-input :value="$root.toCurrency(withdraw.withdrawPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="提款手續費">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.fee)" disabled></el-input>
          </el-form-item>
          <el-form-item label="未達流水手續費">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.disallowWithdrawFee)" disabled></el-input>
          </el-form-item>
          <el-form-item label="運費">
            <el-input :value="$root.toCurrency(withdraw.bankInfo && withdraw.bankInfo.freight)" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="SWITCH_WITHDRAW_INFO_DIALOG(false)">確 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_WITHDRAW_INFO_DIALOG, 
  GET_WITHDRAW_LIST, 
  SET_WITHDRAW,
  USER_INFO,
  SET_WITHDRAW_STATUS,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      typeOpts: state => state.Global.withdrawTypeOpts,
      withdraw: state => state.Money.Withdraw.withdraw,
      dialogVisible: state => state.Money.Withdraw.withdrawInfoDialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_WITHDRAW_INFO_DIALOG
    ]),
  },
  
  created() {
  }
}
</script>

<style lang="stylus">

</style>
