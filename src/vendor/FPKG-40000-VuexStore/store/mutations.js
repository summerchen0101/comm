

import {
  GOT_BANK_LIST,
  GOT_FEE_LIST,
  GOT_DISPENSE_ACC_OPTIONS,
  GOT_USER_STATUS_OPTIONS,
  GOT_MEMBER_STATUS_OPTIONS,
  GOT_DAILY_DEPOSIT_LIMIT_OPTIONS,
  GOT_GAME_TYPE_OPTIONS,
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
    state.userStatusOpts = list
  },
  [GOT_MEMBER_STATUS_OPTIONS](state, list) {
    state.memberStatusOpts = list
  },
  [GOT_DAILY_DEPOSIT_LIMIT_OPTIONS](state, list) {
    state.dailyDepositLimitOpts = list
  },
  [GOT_GAME_TYPE_OPTIONS](state, list) {
    state.gameTypeOpts = list
  },
}

export default mutations