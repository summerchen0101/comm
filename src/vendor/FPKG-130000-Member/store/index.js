
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import MemberManage from './MemberManage'

const store = {
  modules: {
    MemberManage
  },
  state,
  getters,
  mutations,
  actions
};

export default store


