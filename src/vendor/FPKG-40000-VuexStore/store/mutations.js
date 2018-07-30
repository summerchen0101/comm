

import {
  GOT_BANK_LIST
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_BANK_LIST](state, list) {
    state.bankList = list
  },
}

export default mutations