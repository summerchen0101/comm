
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import PlatformGame from './PlatformGame'
import PlatformAd from './PlatformAd'

const store = {
  modules: {
    PlatformGame,
    PlatformAd,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


