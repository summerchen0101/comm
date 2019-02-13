

import { 
  GOT_SITE_ANNOUNCE_LIST, 
  SWITCH_SITE_ANNOUNCE_DIALOG 
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_SITE_ANNOUNCE_LIST](state, result) {
    state.siteAnnounceList = result.data.map(t => ({
      id: t.id,
      title: t.title,
      desc: t.description,
      lockTop: t.top == 1,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
    }))
    state.siteAnnouncePager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },

  [SWITCH_SITE_ANNOUNCE_DIALOG](state, status) {
    state.dialogVisible = status
    if(status) {
      EventsHub.$emit("Announce:clearSiteAnnounceForm")
    }
  },
}

export default mutations