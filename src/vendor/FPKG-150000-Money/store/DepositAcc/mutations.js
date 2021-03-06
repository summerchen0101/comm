

import { 
  GOT_BANK_LIST, 
  GOT_DEPOSIT_ACC_LIST, 
  SWITCH_DEPOSIT_ACC_DIALOG 
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_DEPOSIT_ACC_LIST](state, result) {
    state.depositAccList = result.data.map(t => ({
      id: t.id,
      bankCode: t.code,
      bankID: t.bank_id,
      branchName: t.branch,
      accountName: t.name,
      bankAccount: t.account,
      checkingPoint: t.debit || "-",
      savedPoint: t.credit || "-",
      isPrimary: t.active == 1,
      operation: t.operation,
      updatedAt: t.updated_at,
    }));
    state.depositAccPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },

  [SWITCH_DEPOSIT_ACC_DIALOG](state, status) {
    state.dialogVisible = status
    if(status) {
      EventsHub.$emit("Money:clearDepositAccForm")
    }
  },
}

export default mutations