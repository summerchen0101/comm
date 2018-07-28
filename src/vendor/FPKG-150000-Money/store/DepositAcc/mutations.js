

import { 
  GOT_DEPOSIT_ACC_LIST, 
  SWITCH_DEPOSIT_ACC_DIALOG 
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_DEPOSIT_ACC_LIST](state, result) {
    state.depositAccList = result.data.map(t => ({
      id: t.id,
      title: t.title,
      desc: t.description,
      startAt: t.start_at,
      endAt: t.end_at,
    }))
    state.depositAccPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },

  [SWITCH_DEPOSIT_ACC_DIALOG](state, status) {
    state.dialogVisible = status
    EventsHub.$emit("Announce:clearMarqueeForm")
  },
}

export default mutations