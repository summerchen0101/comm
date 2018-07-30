

import {
  GOT_BANK_LIST,
  SWITCH_HISTORY_DIALOG
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_BANK_LIST](state, list) {
    state.bankList = list
  },
  [SWITCH_HISTORY_DIALOG](state, status) {
    state.historyDialogVisible = status
  }
}

export default mutations