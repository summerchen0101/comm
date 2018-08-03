

import { 
  GOT_MEMBER_REPORT,
  GOT_MEMBER_GAME_REPORT_INFO,
  GOT_MEMBER_GAME_REPORT_DETAIL,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { gameType } from '@/vendor/FPKG-10000-Config/enum'

const mutations = {
  [GOT_MEMBER_REPORT](state, result) {
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
      let gameTypeIndex = gameType.findIndex(g => g.value == r.game_kind)
      return {
        gameType: gameTypeIndex > -1 ? gameType[gameTypeIndex].label : r.game_kind,
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
    state.Game.report = result.data.map(r => {
      let gameTypeIndex = gameType.findIndex(g => g.value == r.game_kind)
      return {
        number: r.wager_id,
        betTime: r.bet_time,
        ip: r.ip,
        betTarget: r.game_type,

        betAmount: r.bet_amount,
        realAmount: r.effective_amount,
        winAmount: r.winnings,
        result: r.payoff,
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