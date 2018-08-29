

import { 
  GOT_MARQUEE_LIST, 
  SWITCH_MARQUEE_DIALOG 
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_MARQUEE_LIST](state, result) {
    state.marqueeList = result.data.map(t => ({
      id: t.id,
      title: t.title,
      desc: t.description,
      forever: t.forever == 1,
      startAt: t.start_at,
      endAt: t.end_at,
      operation: t.operation,
    }))
    state.marqueePager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },

  [SWITCH_MARQUEE_DIALOG](state, status) {
    state.dialogVisible = status
    if(status) {
      EventsHub.$emit("Announce:clearMarqueeForm")
    }
  },
}

export default mutations