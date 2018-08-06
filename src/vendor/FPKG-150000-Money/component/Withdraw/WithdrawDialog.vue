<template>
  <el-dialog
    :title="`${withdraw.number} 審核`"
    :before-close="() => SWITCH_WITHDRAW_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="500px">
    <el-form label-width="80px" 
              ref="withdrawForm" 
              :model="form" 
              label-position="left" 
              :rules="formRules"
              >
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
      <el-form-item label="提款點數">
        <el-input :value="withdraw.withdrawPoint" disabled></el-input>
      </el-form-item>

      <!-- 訂單為「確定」狀態時顯示手續費 -->
      <el-form-item v-if="type === 'confirm'" label="手續費" prop="fee">
        <el-select v-model="form.fee">
          <el-option v-for="f in feeList" :key="f.id" :value="f.id" :label="f.name"></el-option>
        </el-select>
      </el-form-item>
      <!-- 訂單為「取消」狀態時顯示原因 -->
      <el-form-item v-if="type === 'cancel'" label="原因" prop="reason">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
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
        fee: 0
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
      feeList: state => state.Global.feeList,
      withdraw: state => state.Money.Withdraw.withdraw,
      dialogVisible: state => state.Money.Withdraw.withdrawDialogVisible,
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
      SWITCH_WITHDRAW_DIALOG
    ]),
    clearForm() {
      setTimeout(() => this.$refs.withdrawForm.clearValidate())
      this.form = Object.assign({}, initForm)
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
      
    }
  },
  
  created() {
    this.$hub.$on("withdraw:clearForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
