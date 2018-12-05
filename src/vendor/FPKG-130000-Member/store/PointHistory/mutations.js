

import { 
  GOT_POINT_HISTORY_LIST,
  CLEAR_POINT_HISTORY_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_POINT_HISTORY_LIST](state, result) {
    state.pointHistoryList = result.data.map(t => ({
      id: t.id,
      createdAt: t.created_at,
      from: t.from,
      to: t.to,
      beforePoint: t.balance_before,
      transferPoint: t.balance,
      currentPoint: t.balance_after,
      type: t.type,
      operator: t.operator || '-',
      notes: t.reason,
      account: t.account,
      nick: t.nickname,
      phone: t.mobile,
    }))
    state.pointHistoryPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [CLEAR_POINT_HISTORY_LIST](state) {
    state.pointHistoryList  = []
    state.pointHistoryPager  = null
  }
}

export default mutations