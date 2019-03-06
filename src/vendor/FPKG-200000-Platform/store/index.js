
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import PlatformGame from './PlatformGame'
import PlatformAdult from './PlatformAdult'

const store = {
  modules: {
    PlatformGame,
    PlatformAdult,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


