

import { 
  GOT_DEPOSIT_STATUS_LIST, 
  GOT_DEPOSIT_INFO,
  GOT_DEPOSIT_LIST,
  SWITCH_DEPOSIT_DIALOG,
  SET_DEPOSIT,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_DEPOSIT_LIST](state, result) {
    state.depositList = result.data.map(t => {
      let bank = t.operation_bank_info
      return {
        number: t.no,
        account: t.account,
        nick: t.nickname,
        depositPoint: t.credit,
        depositAt: t.deposit_at,
        expireAt: t.expire_at,
        bankInfo: {
          code: "",
          branch: "",
          accName: "",
          account: "",
        }
      }
    })
    state.depositPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [SET_DEPOSIT](state, deposit) {
    state.deposit = deposit
  },
  [GOT_DEPOSIT_STATUS_LIST](state, statusList) {
    state.depositStatusList = statusList
  },
  [GOT_DEPOSIT_INFO](state, info) {
    state.depositInfo = Object.assign({}, state.depositInfo,{
      count: info.credit_count,
      total: info.credit_total,
    })
  },
  [SWITCH_DEPOSIT_DIALOG](state, status) {
    state.depositDialogVisible = status
  },
}

export default mutations