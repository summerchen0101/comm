<template>
  <el-dialog
    :title="`${withdraw.number} 資訊`"
    :before-close="() => SWITCH_WITHDRAW_INFO_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="500px">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="帳號">
        <el-input :value="withdraw.account" disabled></el-input>
      </el-form-item>

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
      <el-form-item label="提領點數">
        <el-input :value="$root.toCurrency(withdraw.withdrawPoint)" disabled></el-input>
      </el-form-item>

      <el-form-item v-if="withdraw.status == 3" label="原因" prop="reason">
        <el-input type="textarea" v-model="withdraw.reason" disabled></el-input>
      </el-form-item>

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
