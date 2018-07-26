

import { SWITCH_LOADING_COVER } from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [SWITCH_LOADING_COVER](state, status) {
    state.displayLoadingCover = status
  }
}

export default mutations