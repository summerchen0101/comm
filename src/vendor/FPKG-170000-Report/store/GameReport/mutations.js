

import {
  GOT_GAME_TOTAL_REPORT,
  GOT_GAME_TYPE_REPORT,
  GOT_GAME_PLAY_REPORT_INFO,
  GOT_GAME_PLAY_REPORT_DETAIL,
  GAME_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { showCancelLabel } from '@/vendor/FPKG-120000-Util/other'

const mutations = {
  [GOT_GAME_TOTAL_REPORT](state, result) {
    let s = result.summary
    state.totalInfo = {
      count: s.wager_count,
      betAmount: s.bet_amount,
      realAmount: s.effective_amount,
      winAmount: s.winnings,
      result: s.payoff,
    }
    state.totalReport = result.list.map(r => {
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
  [GOT_GAME_TYPE_REPORT](state, result) {
    let s = result.summary
    state.gameTypeInfo = {
      gameType: s.game_kind,
      count: s.wager_count,
      betAmount: s.bet_amount,
      realAmount: s.effective_amount,
      winAmount: s.winnings,
      result: s.payoff,
    }
    state.gameTypeReport = result.list.map(r => {
      return {
        gamePlayId: r.game_type,
        gamePlay: r.game_type,
        count: r.wager_count,
        betAmount: r.bet_amount,
        realAmount: r.effective_amount,
        winAmount: r.winnings,
        result: r.payoff,
      }
    })
  },
  [GOT_GAME_PLAY_REPORT_INFO](state, result) {
    state.gamePlayInfo = {
      gamePlayId: result.game_type,
      count: result.wager_count,
      betAmount: result.bet_amount,
      realAmount: result.effective_amount,
      winAmount: result.winnings,
      result: result.payoff,
    }
  },
  [GOT_GAME_PLAY_REPORT_DETAIL](state, result) {
    const gameTypeId = result.gameTypeId;
    state.gamePlayReport = result.data.map(r => {
      let status = (r.status) ? r.status : 0
      return {
        number: r.wager_id,
        betTime: r.bet_time,
        ip: r.ip,
        betTarget: r.game_type,
        schedule: r.schedule,
        account: r.account,
        nick: r.nickname,
        betAmount: r.bet_total,
        realAmount: r.effective_amount,
        winAmount: r.winnings,
        result: r.payoff,
        status: status,
        betStatus: showCancelLabel(gameTypeId, status),
      }
    })
    state.gamePlayReportPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },


}

export default mutations