import {
  CLEAR_WINLOSE_REPORT,
  GET_WINLOSE_REPORT,
  GOT_WINLOSE_REPORT,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDate, toDateTime } from '@/vendor/FPKG-120000-Util/time.js'

const actions = {
  async [GET_WINLOSE_REPORT]({ commit }, _d) {
    commit(CLEAR_WINLOSE_REPORT)
    let params = {
      start_date: toDate(_d.startAt),
      end_date: toDate(_d.endAt),
      game_kind: _d.game_kind,
      per_page: _d.per_page,
      sort: _d.sort,
      page: _d.page || 1,
    }
    let res = await apiHub('get', 'api/v1/statement/winlose', null, params)
    if (res.code === 200001) {
      commit(GOT_WINLOSE_REPORT, res.result)
    }
  },
}

export default actions
