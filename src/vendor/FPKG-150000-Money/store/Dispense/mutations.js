

import { 
  GOT_DISPENSE_INFO,
  GOT_DISPENSE_LIST,
  SWITCH_DISPENSE_DIALOG,
  SWITCH_DISPENSE_INFO_DIALOG,
  SET_DISPENSE,
  CHANGED_DISPENSE_LIST_TYPE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_DISPENSE_LIST](state, result) {
    state.dispenseList = result.data.map(t => {
      let bankInfo = t.operation_bank_info
      return {
        id: t.id,
        number: t.no,
        account: t.account,
        nick: t.nickname,
        dispensePoint: t.dispense_credit,
        dispenseAcc: t.dispense_account_id,
        status: t.status,
        reason: t.reason,
        notes: t.remark,
        operator: t.review_user,
        dispenseAt: t.created_at,
        updatedAt: t.updated_at,
        bankInfo: {
          withdrawPoint: bankInfo.credit,
          actualWithdrawPoint: bankInfo.actual_credit,

          bankCode: `${bankInfo.code}-${bankInfo.bank}`,
          branchName: bankInfo.branch,
          accountName: bankInfo.name,
          bankAccount: bankInfo.account,
          
          tradeNo: bankInfo.no,
          paymentNo: bankInfo.payment_no,
          storeName: bankInfo.from,

          pocketPoint: bankInfo.balance,
          disallowWithdrawPoint: bankInfo.below_norm_credit,
          allowWithdrawPoint: bankInfo.approve_norm_credit,
          fee: bankInfo.fee,
          disallowWithdrawFee: bankInfo.below_norm_fee,
          freight: bankInfo.freight,
        },
        withdrawType: t.member_withdrawal_limit_id
      }
    })
    state.dispensePager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [SET_DISPENSE](state, dispense) {
    state.dispense = dispense
  },
  [GOT_DISPENSE_INFO](state, info) {
    state.dispenseInfo = Object.assign({}, state.dispenseInfo,{
      count: info.credit_count,
      total: info.credit_total,
    })
  },
  [SWITCH_DISPENSE_INFO_DIALOG](state, status) {
    state.dispenseInfoDialogVisible = status
  },
  [SWITCH_DISPENSE_DIALOG](state, status) {
    state.dispenseDialogVisible = status
    if(status) {
      EventsHub.$emit("dispense:clearForm")
    }
  },
  [CHANGED_DISPENSE_LIST_TYPE](state, status) {
    state.listType = status
  },
}

export default mutations