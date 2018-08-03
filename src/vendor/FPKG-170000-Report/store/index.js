
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import MemberReport from './MemberReport'

const store = {
  modules: {
    MemberReport
  },
  state,
  getters,
  mutations,
  actions
};

export default store


