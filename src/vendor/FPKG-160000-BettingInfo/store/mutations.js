

import { GOT_BETTING_INFO, CLEAR_BETTING_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'
import { gameType, lotteryWagerStatus } from '@/vendor/FPKG-10000-Config/enum'
import Router from '@/router'

const mutations = {
  [GOT_BETTING_INFO](state, result) {
    let gameTypeIndex = gameType.findIndex(t => t.value == result.game_kind)
    let status = result.status ? result.status : 0
    // 整理注單要顯示的資訊
    let betTarget = null
    let betAmount = result.bet_amount
    if (gameTypeIndex > -1) {
      let tmpList = result.gameListOpts.list
      if (typeof tmpList.game_type === 'object') {
        betTarget = tmpList.game_type[tmpList.game_type.findIndex(t => t.id == result.game_type)].name
      } else {
        betTarget = tmpList[tmpList.findIndex(t => t.id == result.game_type)].name
      }
      switch (result.game_kind) {
        case '2':
          betAmount = result.bet_total
          betTarget += ' ' + result.schedule
          break;
        case '3':
          let gruopIndex = tmpList.play_type_group.findIndex(t => t.id == result.play_type_group)
          let playIndex = tmpList.play_type.findIndex(t => t.id == result.play_type)
          betTarget += ' ' + result.schedule + ' ' + tmpList.play_type_group[gruopIndex].name + ' ' + tmpList.play_type[playIndex].name
          break;
        default:
      }
    }
    state.bettingInfo = {
      number: result.wager_id,
      betTime: result.bet_time,
      ip: result.ip,
      account: result.account,
      nick: result.nickname,
      gameType: result.gameListOpts['name'],
      playType: result.platy_type,
      playTypeGroup: result.play_type_group,
      betTarget: betTarget,
      betAmount: betAmount,
      realAmount: result.effective_amount,
      winAmount: result.winnings,
      betResult: result.payoff,
      status: status,
      betStatus: lotteryWagerStatus[lotteryWagerStatus.findIndex(g => g.value == status)].label,
    }
  },
  [CLEAR_BETTING_INFO](state) {
    state.bettingInfo = null
  },
}

export default mutations