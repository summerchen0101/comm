
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import Users from './Users'
import IP from './IP'

const store = {
  modules: {
    Users,
    IP,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


