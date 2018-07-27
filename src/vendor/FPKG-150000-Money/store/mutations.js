

import { GOT_DEPOSIT_STATUS_LIST, GOT_DEPOSIT_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_DEPOSIT_STATUS_LIST](state, statusList) {
    state.depositStatusList = statusList
  },
  [GOT_DEPOSIT_INFO](state, info) {
    state.depositInfo = Object.assign({}, state.depositInfo,{
      count: info.credit_count,
      total: info.credit_total,
    })
  },
}

export default mutations