<template>
  <el-dialog
    :title="`${form.number} ${form.type === 'check' ? '查看' : '審核'}`"
    :before-close="() => SWITCH_DEPOSIT_DIALOG(false)"
    :visible.sync="depositDialogVisible"
    width="500px">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="帳號">
        <el-input :value="form.account" disabled></el-input>
      </el-form-item>
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
      <el-form-item label="存款點數">
        <el-input :value="form.depositPoint" disabled></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 'cancel'" label="原因">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
    </el-form>
    <span v-if="form.type === 'check'" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="SWITCH_DEPOSIT_DIALOG(false)">確 定</el-button>
    </span>
    <span v-else slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_DEPOSIT_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.type === 'confirm'" type="success" @click="onChangeStatus(true)">通 過</el-button>
      <el-button v-else-if="form.type === 'cancel'" type="danger" @click="onChangeStatus(false)">未 通 過</el-button>
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

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      form: state => state.Money.Deposit.deposit,
      depositDialogVisible: state => state.Money.Deposit.depositDialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_DEPOSIT_DIALOG
    ]),
    onChangeStatus() {
      this.$store.dispatch(SET_DEPOSIT_STATUS, {
        ...this.form,
        operatorId: this.$store.getters[USER_INFO].id
      })
    }
  },
  
  created() {
  }
}
</script>

<style lang="stylus">

</style>
