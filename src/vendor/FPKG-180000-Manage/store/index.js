
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import Users from './Users'

const store = {
  modules: {
    Users,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


