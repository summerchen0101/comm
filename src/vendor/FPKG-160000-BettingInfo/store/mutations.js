

import { GOT_BETTING_INFO, CLEAR_BETTING_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'
import Router from '@/router'

const mutations = {
  [GOT_BETTING_INFO](state, result) {
    const gameTypeId = Number(result.game_kind);
    // 整理注單要顯示的資訊
    let betTarget = null
    let betAmount = ''
    let betStatus = ''
    if (gameTypeId) {
      let tmpList = result.gameList.list
      betAmount = result.bet_amount
      betTarget = tmpList.game_type[result.game_type - 1].name
      switch (gameTypeId) {
        case 2: {
          betAmount = result.bet_total
          betTarget += ' ' + result.schedule
          break;
        }
        case 3: {
          betTarget += ' ' + result.schedule
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
      status: (result.status) ? result.status : 0,
      cancel: result.cancel,
    }
  },
  [CLEAR_BETTING_INFO](state) {
    state.bettingInfo = null
  },
}

export default mutations