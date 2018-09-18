<template>
  <el-dialog
    :title="`${deposit.number} 審核`"
    :before-close="() => SWITCH_DEPOSIT_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="500px">
    <el-form label-width="80px"
              ref="depositForm"
              :model="form"
              label-position="left"
              :rules="formRules"
              >
      <el-form-item label="帳號">
        <el-input :value="deposit.account" disabled></el-input>
      </el-form-item>

      <!-- 銀行大額(銀行卡) -->
      <template v-if="deposit.payTypeId === 4">
        <el-form-item label="銀行代碼">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.bankCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="分行名稱">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.branchName" disabled></el-input>
        </el-form-item>
        <el-form-item label="戶名">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.accountName" disabled></el-input>
        </el-form-item>
        <el-form-item label="銀行帳號">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.bankAccount" disabled></el-input>
        </el-form-item>
        <el-form-item label="匯款帳戶">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.depositTo" disabled></el-input>
        </el-form-item>
      </template>

      <!-- 超商 -->
      <template v-if="deposit.payTypeId === 1">
        <!-- <el-form-item label="繳費超商">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.storeName" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="繳費代碼">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.paymentNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="交易序號">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.tradeNo" disabled></el-input>
        </el-form-item>
      </template>

      <!-- 小額 -->
      <template v-if="deposit.payTypeId === 2">
        <el-form-item label="銀行代碼">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.bankCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="銀行帳號">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.bankAccount" disabled></el-input>
        </el-form-item>
        <el-form-item label="交易序號">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.tradeNo" disabled></el-input>
        </el-form-item>
      </template>

      <!-- 信用卡 -->
      <template v-if="deposit.payTypeId === 3">
        <el-form-item label="交易序號">
          <el-input :value="deposit.bankInfo && deposit.bankInfo.tradeNo" disabled></el-input>
        </el-form-item>
      </template>

      <!-- 共用 -->
      <el-form-item label="存款點數">
        <el-input :value="$root.toCurrency(deposit.depositPoint)" disabled></el-input>
      </el-form-item>

      <!-- 訂單為「取消」狀態時顯示原因 -->
      <el-form-item v-if="type === 'cancel'" label="原因" prop="reason">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_DEPOSIT_DIALOG(false)">取 消</el-button>
      <el-button v-if="type === 'confirm'" type="success" @click="onChangeStatus('confirm')">通 過</el-button>
      <el-button v-else-if="type === 'cancel'" type="danger" @click="onChangeStatus('cancel')">未 通 過</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  SWITCH_DEPOSIT_DIALOG,
  GET_DEPOSIT_LIST,
  SET_DEPOSIT,
  USER_INFO,
  SET_DEPOSIT_STATUS,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

let initForm = {
        reason: ""
      }

export default {
  data() {
    return {
      form: Object.assign({}, initForm),
      type: ''
    }
  },
  computed: {
    ...mapState({
      deposit: state => state.Money.Deposit.deposit,
      dialogVisible: state => state.Money.Deposit.depositDialogVisible,
    }),
    formRules() {
      return {
        reason: [
          { required: this.type === 'cancel', message: '原因為必填', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    ...mapMutations([
      SWITCH_DEPOSIT_DIALOG
    ]),
    clearForm() {
      setTimeout(() => this.$refs.depositForm.clearValidate())
      this.form = Object.assign({}, initForm)
    },
    onChangeStatus(action) {
      this.$refs.depositForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(SET_DEPOSIT_STATUS, {
            ...this.deposit,
            reason: this.form.reason,
            action,
            operatorId: this.$store.getters[USER_INFO].id
          })
        }
      });

    }
  },

  created() {
    this.$hub.$on("deposit:clearForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
