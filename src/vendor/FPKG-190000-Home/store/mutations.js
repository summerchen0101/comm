

import { GOT_REVIEW_LIST, SWITCH_REVIEW_LOADING_STATUS } from '@/vendor/FPKG-40000-VuexStore/constants'
import { } from '@/vendor/FPKG-10000-Config/enum'

const mutations = {
  [GOT_REVIEW_LIST](state, result) {
    state.reviews = {
      deposit: result.deposit,
      withdraw: result.withdrawal,
      dispense: result.dispense,
      bank: result.bank,
      sms: result.message,
      online: result.online,
    }
  },
  [SWITCH_REVIEW_LOADING_STATUS](state, status) {
    state.isLoadingReviews = status
  },
}

export default mutations