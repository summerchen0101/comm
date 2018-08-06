

import { 
  GOT_IP_LIST, 
  SWITCH_IP_DIALOG,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_IP_LIST](state, result) {
    state.ipList = result.data.map(t => ({
      id: t.id,
      ip: t.ip,
      ipColumns: t.ip.split('.'),
      desc: t.description || '-',
      count: t.user_count,
      createdAt: t.created_at,
      operation: t.operation
    }))
    state.ipPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },

  [SWITCH_IP_DIALOG](state, status) {
    state.dialogVisible = status
    EventsHub.$emit("Manage:clearIPForm")
  },
}

export default mutations