

import { GOT_BETTING_INFO, CLEAR_BETTING_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'
import { lotteryWagerStatus, ifaloLotteryWagerStatus } from '@/vendor/FPKG-10000-Config/enum'
import Router from '@/router'

const mutations = {
  [GOT_BETTING_INFO](state, result) {
    let status = result.status ? result.status : 0
    // 整理注單要顯示的資訊
    let betTarget = null
    let betAmount = ''
    let betStatus = ''
    if (result.game_kind) {
      let tmpList = result.gameList.list
      betAmount = result.bet_amount
      betTarget = tmpList.game_type[result.game_type - 1].name
      switch (result.game_kind) {
        case '2': {
          betAmount = result.bet_total
          betTarget += ' ' + result.schedule
          betStatus = lotteryWagerStatus[status - 1].label
          break;
        }
        case '3': {
          betTarget += ' ' + result.schedule
          betStatus = ifaloLotteryWagerStatus[status - 1].label
          break;
        }
      }
    }
    state.bettingInfo = {
      number: result.wager_id,
      betTime: result.bet_time,
      ip: result.ip,
      account: result.account,
      nick: result.nickname,
      gameType: result.wager_id ? result.gameList['name'] : '',
      playType: result.platy_type,
      playTypeGroup: result.play_type_group,
      betTarget: betTarget,
      betAmount: betAmount,
      realAmount: result.effective_amount,
      winAmount: result.winnings,
      betResult: result.payoff,
      status: status,
      betStatus: betStatus,
    }
  },
  [CLEAR_BETTING_INFO](state) {
    state.bettingInfo = null
  },
}

export default mutations