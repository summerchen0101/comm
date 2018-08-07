
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import Users from './Users'
import IP from './IP'
import OperatingLog from './OperatingLog'
import LoginLog from './LoginLog'

const store = {
  modules: {
    Users,
    IP,
    OperatingLog,
    LoginLog,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


