<template>
  <el-dialog
    :title="`${withdrawForm.number} 審核`"
    :before-close="() => SWITCH_WITHDRAW_DIALOG(false)"
    :visible.sync="withdrawDialogVisible"
    width="500px">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="帳號">
        <el-input :value="withdrawForm.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="銀行代碼">
        <el-input :value="withdrawForm.bank && withdrawForm.bank.code" disabled></el-input>
      </el-form-item>
      <el-form-item label="分行名稱">
        <el-input :value="withdrawForm.bank && withdrawForm.bank.branch" disabled></el-input>
      </el-form-item>
      <el-form-item label="戶名">
        <el-input :value="withdrawForm.bank && withdrawForm.bank.accName" disabled></el-input>
      </el-form-item>
      <el-form-item label="銀行帳號">
        <el-input :value="withdrawForm.bank && withdrawForm.bank.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="存款點數">
        <el-input :value="withdrawForm.withdrawPoint" disabled></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_WITHDRAW_DIALOG(false)">取 消</el-button>
      <el-button v-if="withdrawForm.type === 'confirm'" type="success">通 過</el-button>
      <el-button v-else type="danger">未 通 過</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_WITHDRAW_DIALOG, 
  GET_WITHDRAW_LIST, 
  SET_WITHDRAW,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      withdrawForm: state => state.Money.withdraw,
      withdrawDialogVisible: state => state.Money.withdrawDialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_WITHDRAW_DIALOG
    ]),
  },
  
  created() {
  }
}
</script>

<style lang="stylus">

</style>
