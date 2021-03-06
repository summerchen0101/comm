

import { 
  GOT_WITHDRAW_INFO,
  GOT_WITHDRAW_LIST,
  SWITCH_WITHDRAW_DIALOG,
  SWITCH_WITHDRAW_INFO_DIALOG,
  SET_WITHDRAW,
  CHANGED_WITHDRAW_LIST_TYPE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'
import Router from '@/router'

const mutations = {
  [GOT_WITHDRAW_LIST](state, result) {
    state.withdrawList = result.data.map(t => {
      let bankInfo = t.operation_bank_info
      return {
        id: t.id,
        number: t.no,
        account: t.account,
        nick: t.nickname,
        status: t.status,
        reason: t.reason,
        operator: t.review_user,
        withdrawAt: t.created_at,
        updatedAt: t.updated_at,
        bankInfo: {
          withdrawPoint: Router.app.$numeral(bankInfo.credit).value(),
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
          fee: Router.app.$numeral(bankInfo.fee).value(),
          disallowWithdrawFee: Router.app.$numeral(bankInfo.below_norm_fee).value(),
          freight: Router.app.$numeral(bankInfo.freight).value(),
        },
        withdrawType: t.member_withdrawal_limit_id
      }
    })
    state.withdrawPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [SET_WITHDRAW](state, withdraw) {
    state.withdraw = withdraw
  },
  [GOT_WITHDRAW_INFO](state, info) {
    state.withdrawInfo = Object.assign({}, state.withdrawInfo,{
      count: info.credit_count,
      total: info.credit_total,
    })
  },
  [SWITCH_WITHDRAW_INFO_DIALOG](state, status) {
    state.withdrawInfoDialogVisible = status
  },
  [SWITCH_WITHDRAW_DIALOG](state, status) {
    state.withdrawDialogVisible = status
    if(status) {
      EventsHub.$emit("withdraw:clearForm")
    }
  },
  [CHANGED_WITHDRAW_LIST_TYPE](state, status) {
    state.listType = status
  },
}

export default mutations