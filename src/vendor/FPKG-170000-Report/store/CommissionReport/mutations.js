import {
  GOT_COMMISSION_WEEKS,
  GOT_COMMISSION_TOTAL_REPORT
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_COMMISSION_WEEKS] (state, result) {
    state.weeks = result
  },
  [GOT_COMMISSION_TOTAL_REPORT] (state, result) {
    state.totalInfo = result.summary
    state.totalReport = result.list
  }
}

export default mutations
