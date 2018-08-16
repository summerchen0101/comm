

import {
  GOT_BANK_LIST,
  GOT_FEE_LIST,
  GOT_STATUS_OPTIONS,
  GOT_DISPENSE_ACC_OPTIONS,
  GOT_USER_STATUS_OPTIONS,
  GOT_MEMBER_STATUS_OPTIONS,
  GOT_MEMBER_DEPOSIT_LIMIT_OPTIONS,
  GOT_GAME_TYPE_OPTIONS,
  GOT_GAME_TEMPLATE_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_BANK_LIST](state, list) {
    state.bankList = list
  },
  [GOT_FEE_LIST](state, list) {
    state.feeList = list
  },
  [GOT_STATUS_OPTIONS](state, list) {
    state.statusOpts = list
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
  [GOT_MEMBER_DEPOSIT_LIMIT_OPTIONS](state, list) {
    state.memberDepositLimitOpts = list
  },
  [GOT_GAME_TYPE_OPTIONS](state, list) {
    state.gameTypeOpts = list
  },
  [GOT_GAME_TEMPLATE_OPTIONS](state, {gameType, options}) {
    state.gameTplOpts[gameType] = options
  },
}

export default mutations