
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import MemberManage from './MemberManage'
import BankAcc from './BankAcc'

const store = {
  modules: {
    MemberManage,
    BankAcc,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


