

import {
  GOT_BANK_LIST,
  GOT_FEE_LIST,
  GOT_STATUS_OPTIONS,
  GOT_DISPENSE_ACC_OPTIONS,
  GOT_USER_STATUS_OPTIONS,
  GOT_MEMBER_STATUS_OPTIONS,
  GOT_MEMBER_LAYER_OPTIONS,
  GOT_MEMBER_GAME_STATUS_OPTIONS,
  GOT_MEMBER_DEPOSIT_LIMIT_OPTIONS,
  GOT_GAME_TYPE_OPTIONS,
  GOT_GAME_TEMPLATE_OPTIONS,
  GOT_PAYWAY_OPTIONS,
  GOT_POINT_TRANSFER_OPTIONS,
  GOT_WITHDRAW_TYPE_OPTIONS,
  GOT_COMMISSION_WEEKS_OPTIONS,
  GOT_COMMISSION_LEVEL_WEEKS_OPTIONS,
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
  [GOT_MEMBER_LAYER_OPTIONS](state, list) {
    state.memberLayerOpts = list
  },
  [GOT_MEMBER_GAME_STATUS_OPTIONS](state, list) {
    state.memberGameStatusOpts = list
  },
  [GOT_MEMBER_DEPOSIT_LIMIT_OPTIONS](state, list) {
    state.memberDepositLimitOpts = list
  },
  [GOT_GAME_TYPE_OPTIONS](state, list) {
    state.gameTypeOpts = list
  },
  [GOT_PAYWAY_OPTIONS](state, list) {
    state.payTypeOpts = list
  },
  [GOT_GAME_TEMPLATE_OPTIONS](state, {gameType, options}) {
    if(gameType === 8) {
      state.gameTplOpts[gameType] = {
        all: options.find(t => t.type === 'all').item,
        roulette: options.find(t => t.type === 'roulette').item,
      }
    }else {
      state.gameTplOpts[gameType] = options
    }
    
  },
  [GOT_POINT_TRANSFER_OPTIONS](state, list) {
    state.pointTransferOpts = list.filter(opt => opt.id !== 0)
  },
  [GOT_WITHDRAW_TYPE_OPTIONS](state, list) {
    state.withdrawTypeOpts = list
  },
  [GOT_COMMISSION_WEEKS_OPTIONS] (state, list) {
    state.commissionWeeksOpts = list
  },
  [GOT_COMMISSION_LEVEL_WEEKS_OPTIONS] (state, result) {
    state.commissionLevelOpts = result.level.map(t => ({label: t.level, value: t.id}))
    state.commissionLevelStartWeeksOpts = result.week.start.map(t => ({label: t.option, value: t.value}))
    state.commissionLevelEndWeeksOpts = result.week.end.map(t => ({label: t.option, value: t.value}))
  },
}

export default mutations