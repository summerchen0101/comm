

import {
  CLEAR_AGENT_REPORT,
  GOT_AGENT_REPORT,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [CLEAR_AGENT_REPORT](state) {
    state.isSearched = false
    state.info = null
    state.report = []
  },
  [GOT_AGENT_REPORT](state, result) {
    state.isSearched = true
    if(result.length === 0) {
      return
    }
    let s = result.summary
    state.info = {
      amount: s.feat, // 有效金額
      memberResult: s.downline_payoff, // 會員結果
      agentResult: s.downline_payoff_agent, // 代理結果
      commission: s.downline_brokerage, // 佣金給付
      agentCommission: s.downline_brokerage_agent, // 代理給付
      total: s.proceeds, // 總負擔
    }
    state.report = result.list.data.map(r => {
      return {
        account: r.account, // 帳號
        nick: r.nickname, // 暱稱
        amount: r.feat, // 有效金額
        memberResult: r.downline_payoff, // 會員結果
        agentResult: r.downline_payoff_agent, // 代理結果
        commission: r.downline_brokerage, // 佣金給付
        agentCommission: r.downline_brokerage_agent, // 代理給付
        total: r.proceeds, // 總負擔
      }
    })
  },

}

export default mutations