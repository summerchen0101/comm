
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import MemberReport from './MemberReport'
import GameReport from './GameReport'
import CommissionReport from './CommissionReport'

const store = {
  modules: {
    MemberReport,
    GameReport,
    CommissionReport
  },
  state,
  getters,
  mutations,
  actions
};

export default store


