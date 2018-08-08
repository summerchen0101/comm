

import { 
  GOT_MEMBER_LIST, 
  GOT_VERIFY_INFO,
  CLOSE_VERIFY_DIALOG,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_MEMBER_LIST](state, result) {
    state.memberList = result.data.map(t => ({
      id: t.id,
      account: t.account,
      nick: t.nickname,
      phone: t.mobile,
      point: t.balance,
      status: t.active,
      isVerified: t.mobile_verify,
      createdAt: t.created_at,
      operation: t.operation,
    }))
    state.memberPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_VERIFY_INFO](state, result) {
    state.verifyInfo = {
      account: result.account,
      password: result.password
    }
    state.displayVerifyDialog = true
  },
  [CLOSE_VERIFY_DIALOG](state) {
    state.displayVerifyDialog = false
  }
}

export default mutations