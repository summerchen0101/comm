
import state from './state'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import MemberManage from './MemberManage'
import MemberSearch from './MemberSearch'
import PointHistory from './PointHistory'
import BankAcc from './BankAcc'

const store = {
  modules: {
    MemberManage,
    MemberSearch,
    PointHistory,
    BankAcc,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


