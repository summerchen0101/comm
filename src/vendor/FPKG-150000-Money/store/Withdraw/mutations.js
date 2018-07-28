

import { 
  GOT_WITHDRAW_STATUS_LIST, 
  GOT_WITHDRAW_INFO,
  GOT_WITHDRAW_LIST,
  SWITCH_WITHDRAW_DIALOG,
  SET_WITHDRAW,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_WITHDRAW_LIST](state, result) {
    state.withdrawList = result.data.map(t => {
      let bank = t.operation_bank_info
      return {
        number: t.no,
        account: t.account,
        nick: t.nickname,
        withdrawPoint: t.credit,
        withdrawAt: t.withdraw_at,
        expireAt: t.expire_at,
        bankInfo: {
          code: "",
          branch: "",
          accName: "",
          account: "",
        }
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
  [GOT_WITHDRAW_STATUS_LIST](state, statusList) {
    state.withdrawStatusList = statusList
  },
  [GOT_WITHDRAW_INFO](state, info) {
    state.withdrawInfo = Object.assign({}, state.withdrawInfo,{
      count: info.credit_count,
      total: info.credit_total,
    })
  },
  [SWITCH_WITHDRAW_DIALOG](state, status) {
    state.withdrawDialogVisible = status
  },
}

export default mutations