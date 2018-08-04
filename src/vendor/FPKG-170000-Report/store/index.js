
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import MemberReport from './MemberReport'
import GameReport from './GameReport'

const store = {
  modules: {
    MemberReport,
    GameReport,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


