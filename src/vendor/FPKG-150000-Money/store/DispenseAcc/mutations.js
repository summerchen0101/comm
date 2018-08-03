

import { 
  GOT_BANK_LIST, 
  GOT_DISPENSE_ACC_LIST, 
  SWITCH_DISPENSE_ACC_DIALOG 
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_DISPENSE_ACC_LIST](state, result) {
    state.dispenseAccList = result.data.map(t => ({
      id: t.id,
      bankCode: t.code,
      branchName: t.branch,
      accountName: t.name,
      bankAccount: t.account,
      isPrimary: t.active == 1,
      operation: t.operation,
    }))
    state.dispenseAccPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },

  [SWITCH_DISPENSE_ACC_DIALOG](state, status) {
    state.dialogVisible = status
    EventsHub.$emit("Money:clearDispenseAccForm")
  },
}

export default mutations