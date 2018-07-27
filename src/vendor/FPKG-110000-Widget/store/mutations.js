

import { SWITCH_LOADING_COVER, GOT_CAPTCH, CLEAR_CAPTCH } from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [SWITCH_LOADING_COVER](state, status) {
    state.displayLoadingCover = status
  },
  [GOT_CAPTCH](state, captcha) {
    state.captcha = captcha
  },
  [CLEAR_CAPTCH](state, captcha) {
    state.captcha = null
  },
}

export default mutations