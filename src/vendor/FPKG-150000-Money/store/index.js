
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import Deposit from './Deposit'
import DepositAcc from './DepositAcc'
import Withdraw from './Withdraw'
import Dispense from './Dispense'
import DispenseAcc from './DispenseAcc'

const store = {
  modules: {
    Deposit,
    DepositAcc,
    Withdraw,
    Dispense,
    DispenseAcc,
  },
  state,
  getters,
  mutations,
  actions
};

export default store


