import {
  CLEAR_WINLOSE_REPORT,
  GOT_WINLOSE_REPORT,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [CLEAR_WINLOSE_REPORT](state) {
    state.isSearched = false
    state.report = []
    state.winlosePager = {
      currentPage: 1,
      total: 0,
      perPage: 25,
    }
  },

  [GOT_WINLOSE_REPORT](state, result) {
    state.isSearched = true
    if (result.length === 0) {
      return
    }
    state.winlosePager = {
      currentPage: result.current_page,
      total: result.total,
      perPage: parseInt(result.per_page),
    };
    state.report = result.data.map(r => {
      return {
        id: r.member_id, // 會員ID
        account: r.account, // 帳號
        nickname: r.nickname, // 暱稱
        amount: r.feat, // 有效金額
        memberResult: r.payoff, // 會員結果
        commission: r.brokerage, // 佣金結果
      }
    })
  },

}

export default mutations