

import { GOT_BETTING_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'
import { gameType, lotteryWagerStatus } from '@/vendor/FPKG-10000-Config/enum'




const mutations = {
  [GOT_BETTING_INFO](state, result) {
    let gameTypeIndex = gameType.findIndex(t => t.value == result.game_kind)
    let betTargetIndex = gameTypeIndex > -1 ? gameType[gameTypeIndex].children.findIndex(t => t.value == result.game_type) : -1
    let status = result.status ? result.status : 0
    state.bettingInfo = {
      number: result.wager_id,
      betTime: result.bet_time,
      ip: result.ip,
      account: result.account,
      nick: result.nickname,
      gameType: gameTypeIndex > -1 ? gameType[gameTypeIndex].label : null,
      betTarget: betTargetIndex > -1 ? gameType[gameTypeIndex].children[betTargetIndex].label: null,
      betAmount: result.bet_amount,
      realAmount: result.effective_amount,
      winAmount: result.winnings,
      betResult: result.payoff,
      status: status,
      betStatus: lotteryWagerStatus[lotteryWagerStatus.findIndex(g => g.value == status)].label,
    }
  }
}

export default mutations