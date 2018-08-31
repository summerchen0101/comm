<template>
  <el-dialog
    :before-close="() => SWITCH_DISPENSE_INFO_DIALOG(false)"
    :visible.sync="dialogVisible"
    :show-close="false"
    width="500px">
    <div slot="title">
      <span class="el-dialog__title">{{dispense.number}} 資訊</span>
      <!-- <el-button type="info" class="float-right" @click="onCopyText">複製資訊</el-button> -->
    </div>
    <el-form label-width="80px" label-position="left">
      <el-form-item label="帳號">
        <el-input :value="dispense.account" disabled></el-input>
      </el-form-item>

      <el-form-item label="銀行代碼">
          <el-input :value="dispense.bankInfo && dispense.bankInfo.bankCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="分行名稱">
        <el-input :value="dispense.bankInfo && dispense.bankInfo.branchName" disabled></el-input>
      </el-form-item>
      <el-form-item label="戶名">
        <el-input :value="dispense.bankInfo && dispense.bankInfo.accountName" disabled></el-input>
      </el-form-item>
      <el-form-item label="銀行帳號">
        <el-input :value="dispense.bankInfo && dispense.bankInfo.bankAccount" disabled></el-input>
      </el-form-item>
      <el-form-item label="提款點數">
        <el-input :value="$root.toCurrency(dispense.withdrawPoint)" disabled></el-input>
      </el-form-item>
      <el-form-item label="出款點數">
        <el-input :value="$root.toCurrency(dispense.dispensePoint)" disabled></el-input>
      </el-form-item>

      <!-- 訂單為「成功」狀態時顯示出款銀行資訊 -->
      <el-form-item v-if="dispense.status == 1" label="出款帳戶" prop="dispenseAcc">
        <el-select v-model="dispense.dispenseAcc" style="width: 100%" disabled>
          <el-option v-for="f in dispenseAccList" :key="f.id" :value="f.id" :label="f.name"></el-option>
        </el-select>
      </el-form-item>
      <!-- 訂單為「取消」狀態時顯示原因 -->
      <el-form-item v-if="dispense.status == 3" label="原因" prop="reason">
        <el-input type="textarea" v-model="dispense.reason" disabled></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="SWITCH_DISPENSE_INFO_DIALOG(false)">確 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_DISPENSE_INFO_DIALOG, 
  GET_DISPENSE_LIST, 
  SET_DISPENSE,
  USER_INFO,
  SET_DISPENSE_STATUS,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { onCopyText } from '@/vendor/FPKG-120000-Util/other'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      dispenseAccList: state => state.Global.dispenseAccList,
      dispense: state => state.Money.Dispense.dispense,
      dialogVisible: state => state.Money.Dispense.dispenseInfoDialogVisible,
    }),
    copyText() {
      return [
        {title: '帳號', content: this.dispense.account},
        {title: '銀行代碼', content: this.dispense.bankInfo.bankCode},
        {title: '分行名稱', content: this.dispense.bankInfo.branchName},
        {title: '戶名', content: this.dispense.bankInfo.accountName},
        {title: '銀行帳號', content: this.dispense.bankInfo.bankAccount},
        {title: '提款點數', content: this.dispense.withdrawPoint},
        {title: '出款點數', content: this.dispense.dispensePoint},
      ]
    }
  },
  methods: {
    ...mapMutations([
      SWITCH_DISPENSE_INFO_DIALOG
    ]),
    onCopyText,
  },
  
  created() {
  }
}
</script>

<style lang="stylus">

</style>
