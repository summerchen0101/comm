

import { GOT_USER_OPTIONS } from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_USER_OPTIONS](state, result) {
    state.userOpts = result
  },
}

export default mutations