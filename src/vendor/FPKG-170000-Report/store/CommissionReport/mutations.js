import {
  GOT_COMMISSION_TOTAL_REPORT
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_COMMISSION_TOTAL_REPORT] (state, result) {
    state.summary = result.summary
    state.list = result.list
  }
}

export default mutations
