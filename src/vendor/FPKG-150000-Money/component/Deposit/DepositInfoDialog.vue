<template>
  <el-dialog
    :title="`${form.number} 查看/${form.payTypeName}`"
    :before-close="() => SWITCH_DEPOSIT_INFO_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="500px">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="帳號">
        <el-input :value="form.account" disabled></el-input>
      </el-form-item>

      <!-- 銀行大額(銀行卡) -->
      <template v-if="form.payTypeId === 4">
        <el-form-item label="銀行代碼">
          <el-input :value="form.bankInfo && form.bankInfo.bankCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="分行名稱">
          <el-input :value="form.bankInfo && form.bankInfo.branchName" disabled></el-input>
        </el-form-item>
        <el-form-item label="戶名">
          <el-input :value="form.bankInfo && form.bankInfo.accountName" disabled></el-input>
        </el-form-item>
        <el-form-item label="銀行帳號">
          <el-input :value="form.bankInfo && form.bankInfo.bankAccount" disabled></el-input>
        </el-form-item>
      </template>
      
      <!-- 超商 -->
      <template v-if="form.payTypeId === 1">
        <!-- <el-form-item label="繳費超商">
          <el-input :value="form.bankInfo && form.bankInfo.storeName" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="繳費代碼">
          <el-input :value="form.bankInfo && form.bankInfo.paymentNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="交易序號">
          <el-input :value="form.bankInfo && form.bankInfo.tradeNo" disabled></el-input>
        </el-form-item>
      </template>
      
      <!-- 小額 -->
      <template v-if="form.payTypeId === 2">
        <el-form-item label="銀行代碼">
          <el-input :value="form.bankInfo && form.bankInfo.bankCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="銀行帳號">
          <el-input :value="form.bankInfo && form.bankInfo.bankAccount" disabled></el-input>
        </el-form-item>
        <el-form-item label="交易序號">
          <el-input :value="form.bankInfo && form.bankInfo.tradeNo" disabled></el-input>
        </el-form-item>
      </template>

      <!-- 信用卡 -->
      <template v-if="form.payTypeId === 3">
        <el-form-item label="交易序號">
          <el-input :value="form.bankInfo && form.bankInfo.tradeNo" disabled></el-input>
        </el-form-item>
      </template>
      
      <!-- 共用 -->
      <el-form-item label="存款點數">
        <el-input :value="$root.toCurrency(form.depositPoint)" disabled></el-input>
      </el-form-item>

      <!-- 訂單為「取消」狀態時顯示原因 -->
      <el-form-item v-if="form.status === 3" label="原因">
        <el-input :value="form.reason" disabled></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="SWITCH_DEPOSIT_INFO_DIALOG(false)">確 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_DEPOSIT_INFO_DIALOG, 
  GET_DEPOSIT_LIST, 
  SET_DEPOSIT,
  USER_INFO,
  SET_DEPOSIT_STATUS,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      form: state => state.Money.Deposit.deposit,
      dialogVisible: state => state.Money.Deposit.depositInfoDialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_DEPOSIT_INFO_DIALOG
    ]),
  },
  
  created() {
  }
}
</script>

<style lang="stylus">

</style>
