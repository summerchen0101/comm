
import state from './state'


import depositActions from './depositActions'
import withdrawActions from './withdrawActions'
import depositMutations from './depositMutations'
import withdrawMutations from './withdrawMutations'
import getters from './getters'

const account = {
  state,
  getters,
  mutations: {
    ...depositMutations,
    ...withdrawMutations,
  },
  actions: {
    ...depositActions,
    ...withdrawActions,
  }
};

export default account


