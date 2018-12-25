import {
  CLEAR_AGENT_REPORT,
  GET_AGENT_REPORT,
  GOT_AGENT_REPORT,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDate, toDateTime } from '@/vendor/FPKG-120000-Util/time.js'

import Router from '@/router'

const actions = {
  async [GET_AGENT_REPORT] ({ commit }, _d) {
    commit(CLEAR_AGENT_REPORT)
    let params = {
      start_date: toDateTime(_d.startAt).substr(0, 16),
      end_date: toDateTime(_d.endAt).substr(0, 16),
      account: _d.account
    }
    let res = await apiHub('get', 'api/v1/statement/agent', null, params)
    if (res.code === 200001) {
      commit(GOT_AGENT_REPORT, res.result)
    }
  },
}

export default actions
