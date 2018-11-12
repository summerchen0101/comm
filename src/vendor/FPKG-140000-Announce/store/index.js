
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import Marquee from './Marquee'
import Mail from './Mail'

const store = {
  modules: {
    Marquee,
    Mail
  },
  state,
  getters,
  mutations,
  actions
};

export default store


