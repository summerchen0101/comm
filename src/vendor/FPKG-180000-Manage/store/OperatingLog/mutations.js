

import {
  GOT_OPERATION_OPTIONS,
  GOT_OPERATING_LOG_LIST,
  CLEAR_OPERATING_LOG_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_OPERATION_OPTIONS](state, result) {
    state.operatingOpts = result
  },
  [GOT_OPERATING_LOG_LIST](state, result) {
    state.operatingList = result.data.map(t => ({
      id: t.id,
      account: t.user_account,
      nick: t.user_name,
      target: t.targets['zh-TW'],
      content: t.content['zh-TW'],
      time: t.updated_at,
      ip: t.ip,
    }))
    state.operatingPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [CLEAR_OPERATING_LOG_LIST](state) {
    state.operatingList = null
    state.operatingPager = null
  }
}

export default mutations