<template>
  <el-dialog
    :before-close="() => SWITCH_DISPENSE_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="500px">
    <span slot="title" class="el-dialog__title">
      {{dispense.number}} 審核
       / 
      <span class="text-info">{{$root.toOption(typeOpts, dispense.withdrawType)}}</span>
      <el-button type="info" class="float-right" @click="onCopyText">複製資訊</el-button>
    </span>
    <el-form ref="dispenseForm" 
              :model="form" 
              label-position="top" 
              :rules="formRules"
              style="margin-top: -20px"
              >
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
          
          <!-- 網路轉帳：訂單為「通過」狀態時顯示出款銀行資訊 -->
          <el-form-item v-if="type === 'confirm' && dispense.withdrawType === 1" label="出款帳戶" prop="dispenseAcc">
            <el-select v-model="form.dispenseAcc" style="width: 100%">
              <el-option v-for="f in dispenseAccList" :key="f.id" :value="f.id" :label="f.name"></el-option>
            </el-select>
          </el-form-item>

          <!-- 現金專送：訂單為「通過」狀態時顯示備註 -->
          <el-form-item v-if="type === 'confirm' && dispense.withdrawType === 3" label="備註" prop="notes">
            <span slot="label">備註 <small class="text-danger ml-1">字限100</small></span>
            <el-input type="textarea" v-model="form.notes"></el-input>
          </el-form-item>

          <!-- 訂單為「取消」狀態時顯示原因 -->
          <el-form-item v-if="type === 'cancel'" label="原因" prop="reason">
            <span slot="label">原因 <small class="text-danger ml-1">字限100</small></span>
            <el-input type="textarea" v-model="form.reason"></el-input>
          </el-form-item>
          
        </el-col>
        <el-col :span="12">
          <el-form-item label="錢包點數">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.pocketPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="未達流水點數">
            <el-input :value="$root.toCurrency(dispense.bankInfo && dispense.bankInfo.disallowWithdrawPoint)" disabled></el-input>
          </el-form-item>
          <el-form-item label="達流水可提領">
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
      <el-button @click="SWITCH_DISPENSE_DIALOG(false)">取 消</el-button>
      <el-button v-if="type === 'confirm'" type="success" @click="onChangeStatus('confirm')">通 過</el-button>
      <el-button v-else-if="type === 'cancel'" type="danger" @click="onChangeStatus('cancel')">未 通 過</el-button>
      <el-button v-else-if="type === 'back'" type="warning" @click="onChangeStatus('back')">駁 回</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  SWITCH_DISPENSE_DIALOG,
  GET_DISPENSE_LIST,
  SET_DISPENSE,
  USER_INFO,
  SET_DISPENSE_STATUS,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { onCopyText } from '@/vendor/FPKG-120000-Util/other'

let initForm = {
        reason: "",
        dispenseAcc: "",
        notes: ""
      }

export default {
  data() {
    return {
      form: Object.assign({}, initForm),
      type: '',
    }
  },
  computed: {
    ...mapState({
      typeOpts: state => state.Global.withdrawTypeOpts,
      dispenseAccList: state => state.Global.dispenseAccList,
      dispense: state => state.Money.Dispense.dispense,
      dialogVisible: state => state.Money.Dispense.dispenseDialogVisible,
    }),
    formRules() {
      return {
        reason: [
          { required: this.type === 'cancel', message: '原因為必填', trigger: 'blur' },
          { max: 100, message: '字數最多為100字', trigger: 'blur' },
        ],
        notes: [
          { required: this.type === 'confirm' && this.dispense.withdrawType === 3, message: '備註為必填', trigger: 'blur' },
          { max: 100, message: '字數最多為100字', trigger: 'blur' },
        ],
        dispenseAcc: [
          { required: this.type === 'confirm' && this.dispense.withdrawType === 1, message: '出款帳戶為必填', trigger: 'blur' },
        ],
      }
    },
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
      SWITCH_DISPENSE_DIALOG
    ]),
    onCopyText,
    clearForm() {
      setTimeout(() => this.$refs.dispenseForm.clearValidate())
      this.form = Object.assign({}, initForm)
    },
    onChangeStatus(action) {
      this.$refs.dispenseForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(SET_DISPENSE_STATUS, {
            ...this.dispense,
            ...this.form,
            action,
            operatorId: this.$store.getters[USER_INFO].id
          })
        }
      });

    }
  },

  created() {
    this.$hub.$on("dispense:clearForm", this.clearForm)
  }
}
</script>

<style lang="stylus">
</style>
