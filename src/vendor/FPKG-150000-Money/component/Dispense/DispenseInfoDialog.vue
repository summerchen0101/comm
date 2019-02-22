<template>
  <el-dialog
    :before-close="() => SWITCH_DISPENSE_INFO_DIALOG(false)"
    :visible.sync="dialogVisible"
    :show-close="false"
    width="500px">
    <span slot="title" class="el-dialog__title">
      {{dispense.number}} 資訊
       / 
      <span class="text-info">{{$root.toOption(typeOpts, dispense.withdrawType)}}</span>
      <!-- <el-button type="info" class="float-right" @click="onCopyText">複製資訊</el-button> -->
    </span>
    <el-form label-position="top" style="margin-top: -20px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="帳號">
            <el-input :value="dispense.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="實際出款">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.actualWithdrawPoint)" disabled></el-input>
          </el-form-item>
          
          <!-- 僅「網路轉帳」及「臨櫃專存」時顯示銀行資訊 -->
          <template v-if="dispense.withdrawType !== 3">
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
          </template>
          
          <!-- 網路轉帳：訂單為「成功」狀態時顯示出款銀行資訊 -->
          <el-form-item v-if="dispense.status == 1 && dispense.withdrawType == 1" label="出款帳戶" prop="dispenseAcc">
            <el-select :value="dispense.dispenseAcc" style="width: 100%" disabled>
              <el-option v-for="f in dispenseAccList" :key="f.id" :value="f.id" :label="f.name"></el-option>
            </el-select>
          </el-form-item>
          
          <!-- 現金專送：訂單為「成功」狀態時顯示備註 -->
          <el-form-item v-if="dispense.status == 1 && dispense.withdrawType === 3" label="備註" prop="notes">
            <el-input type="textarea" :value="dispense.notes" disabled></el-input>
          </el-form-item>

          <!-- 訂單為「取消」狀態時顯示原因。 出款取消: 5 -->
          <el-form-item v-if="dispense.status == 5" label="原因" prop="reason">
            <el-input type="textarea" :value="dispense.reason" disabled></el-input>
          </el-form-item>
          
        </el-col>
        <el-col :span="12">
          <el-form-item label="錢包點數">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.pocketPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="未達流水點數">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.disallowWithdrawPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="已達流水點數">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.allowWithdrawPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="提款點數">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.withdrawPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="提款手續費">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.fee)" disabled></el-input>
          </el-form-item>
          <el-form-item label="未達流水手續費">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.disallowWithdrawFee)" disabled></el-input>
          </el-form-item>
          <el-form-item label="運費">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.freight)" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
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
      typeOpts: state => state.Global.withdrawTypeOpts,
      dispenseAccList: state => state.Global.dispenseAccList,
      dispense: state => state.Money.Dispense.dispense,
      dialogVisible: state => state.Money.Dispense.dispenseInfoDialogVisible,
    }),
    copyText() {
      if(this.dispense.withdrawType === 3) {
        return [
          {title: '帳號', content: this.dispense.account},
          {title: '實際出款', content: this.$root.toCurrency(this.dispense.bankInfo.actualWithdrawPoint)},
        ]
      }
      else {
        return [
          {title: '帳號', content: this.dispense.account},
          {title: '實際出款', content: this.$root.toCurrency(this.dispense.bankInfo.actualWithdrawPoint)},
          {title: '銀行代碼', content: this.dispense.bankInfo.bankCode},
          {title: '分行名稱', content: this.dispense.bankInfo.branchName},
          {title: '戶名', content: this.dispense.bankInfo.accountName},
          {title: '銀行帳號', content: this.dispense.bankInfo.bankAccount},
          // {title: '提領點數', content: this.$root.toCurrency(this.dispense.withdrawPoint)},
          // {title: '出款點數', content: this.$root.toCurrency(this.dispense.dispensePoint)},
        ]
      }
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
