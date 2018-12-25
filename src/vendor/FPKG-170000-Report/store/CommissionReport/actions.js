import {
  GET_COMMISSION_TOTAL_REPORT,
  GOT_COMMISSION_TOTAL_REPORT
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'

const actions = {
  async [GET_COMMISSION_TOTAL_REPORT] ({ commit }, _d) {
    let params = {
      brokerage_start: _d.startAt,
      brokerage_end: _d.endAt
    }
    let res = await apiHub('get', 'api/v1/statement/brokerage', null, params)
    if (res.code === 200001) {
      commit(GOT_COMMISSION_TOTAL_REPORT, res.result)
    }
  }
}

export default actions
