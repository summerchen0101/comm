<template>
  <el-dialog
    :title="`${depositForm.number} 審核`"
    :before-close="() => SWITCH_DEPOSIT_DIALOG(false)"
    :visible.sync="depositDialogVisible"
    width="500px">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="帳號">
        <el-input :value="depositForm.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="銀行代碼">
        <el-input :value="depositForm.bank && depositForm.bank.code" disabled></el-input>
      </el-form-item>
      <el-form-item label="分行名稱">
        <el-input :value="depositForm.bank && depositForm.bank.branch" disabled></el-input>
      </el-form-item>
      <el-form-item label="戶名">
        <el-input :value="depositForm.bank && depositForm.bank.accName" disabled></el-input>
      </el-form-item>
      <el-form-item label="銀行帳號">
        <el-input :value="depositForm.bank && depositForm.bank.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="存款點數">
        <el-input :value="depositForm.depositPoint" disabled></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_DEPOSIT_DIALOG(false)">取 消</el-button>
      <el-button v-if="depositForm.type === 'confirm'" type="success">通 過</el-button>
      <el-button v-else type="danger">未 通 過</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_DEPOSIT_DIALOG, 
  GET_DEPOSIT_LIST, 
  SET_DEPOSIT,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      depositForm: state => state.Money.deposit,
      depositDialogVisible: state => state.Money.depositDialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_DEPOSIT_DIALOG
    ]),
  },
  
  created() {
  }
}
</script>

<style lang="stylus">

</style>
