

import { 
  GOT_DEPOSIT_STATUS_LIST, 
  GOT_DEPOSIT_INFO,
  GOT_DEPOSIT_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_DEPOSIT_LIST](state, result) {
    state.depositList = result.data.map(t => ({
      number: t.no,
      account: t.account,
      nick: t.nickname,
      depositPoint: t.credit,
      depositAt: t.deposit_at,
      expireAt: t.expire_at,
    }))
    state.depositPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_DEPOSIT_STATUS_LIST](state, statusList) {
    state.depositStatusList = statusList
  },
  [GOT_DEPOSIT_INFO](state, info) {
    state.depositInfo = Object.assign({}, state.depositInfo,{
      count: info.credit_count,
      total: info.credit_total,
    })
  },
}

export default mutations