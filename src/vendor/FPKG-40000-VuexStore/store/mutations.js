

import {
  GOT_BANK_LIST,
  GOT_FEE_LIST,
  GOT_DISPENSE_ACC_OPTIONS,
  GOT_USER_STATUS_OPTIONS,
  GOT_DAILY_DEPOSIT_LIMIT_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_BANK_LIST](state, list) {
    state.bankList = list
  },
  [GOT_FEE_LIST](state, list) {
    state.feeList = list
  },
  [GOT_DISPENSE_ACC_OPTIONS](state, list) {
    state.dispenseAccList = list
  },
  [GOT_USER_STATUS_OPTIONS](state, list) {
    state.statusOpts = list
  },
  [GOT_DAILY_DEPOSIT_LIMIT_OPTIONS](state, list) {
    state.dailyDepositLimitOpts = list
  },
}

export default mutations