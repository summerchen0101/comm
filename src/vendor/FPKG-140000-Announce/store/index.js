
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import Marquee from './Marquee'

const store = {
  modules: {
    Marquee
  },
  state,
  getters,
  mutations,
  actions
};

export default store


