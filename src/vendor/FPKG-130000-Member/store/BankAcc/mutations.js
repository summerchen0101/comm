

import { 
  GOT_BANK_ACC_LIST,
  SWITCH_BANK_ACC_DIALOG,
  SET_BANK_ACC,
  CHANGE_BANK_ACC_LIST_TYPE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_BANK_ACC_LIST](state, result) {
    state.bankAccList = result.data.map(t => ({
      id: t.id,
      account: t.account,
      nick: t.nickname,
      bankCode: t.code,
      bankName: t.bank,
      branchName: t.branch,
      createdAt: t.created_at,
      accountName: t.name,
      bankAccount: t.bank_account,
      isDuplicated: t.account_color,
      operator: t.review_user,
      operation: t.operation,
      reason: t.reason,
      pic: t.operation_bank_info.images
    }))
    state.bankAccPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [SWITCH_BANK_ACC_DIALOG](state, status) {
    state.dialogVisible = status
    if(status) {
      EventsHub.$emit("Member:clearBankAccForm")
    }
  },
  [SET_BANK_ACC](state, _d) {
    state.bankAcc = _d
  },
  [CHANGE_BANK_ACC_LIST_TYPE](state, status) {
    state.listType = status
  },
}

export default mutations