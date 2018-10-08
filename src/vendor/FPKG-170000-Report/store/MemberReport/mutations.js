

import {
  CLEAR_MEMBER_REPORT,
  GOT_MEMBER_REPORT,
  GOT_MEMBER_GAME_REPORT_INFO,
  GOT_MEMBER_GAME_REPORT_DETAIL,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [CLEAR_MEMBER_REPORT](state) {
    state.isSearched = false
    state.Member = {
      info: null,
      report: [],
    }
  },
  [GOT_MEMBER_REPORT](state, result) {
    state.isSearched = true
    if(result.length === 0) {
      return
    }
    let s = result.summary
    state.Member.info = {
      account: s.account,
      count: s.wager_count,
      betAmount: s.bet_amount,
      realAmount: s.effective_amount,
      winAmount: s.winnings,
      result: s.payoff,
    }
    state.Member.report = result.list.map(r => {
      return {
        gameTypeId: r.game_kind,
        count: r.wager_count,
        betAmount: r.bet_amount,
        realAmount: r.effective_amount,
        winAmount: r.winnings,
        result: r.payoff,
      }
    })
  },
  [GOT_MEMBER_GAME_REPORT_INFO](state, result) {
    state.Game.info = {
      account: result.account,
      count: result.wager_count,
      betAmount: result.bet_amount,
      realAmount: result.effective_amount,
      winAmount: result.winnings,
      result: result.payoff,
    }
  },
  [GOT_MEMBER_GAME_REPORT_DETAIL](state, result) {
    const gameTypeId = result.gameTypeId;
    state.Game.report = result.data.map(r => {
      return {
        number: r.wager_id,
        betTime: r.bet_time,
        ip: r.ip,
        betTarget: r.game_type,
        schedule: r.schedule,
        betAmount: r.bet_total,
        realAmount: r.effective_amount,
        winAmount: r.winnings,
        result: r.payoff,
        status: (r.status) ? r.status : 0,
        cancel: r.cancel,
      }
    })
    state.Game.pager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },

}

export default mutations