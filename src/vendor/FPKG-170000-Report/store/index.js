
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import MemberReport from './MemberReport'
import AgentReport from './AgentReport'
import GameReport from './GameReport'
import CommissionReport from './CommissionReport'
import Winlose from './Winlose'

const store = {
  modules: {
    MemberReport,
    GameReport,
    CommissionReport,
    AgentReport,
    Winlose,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


