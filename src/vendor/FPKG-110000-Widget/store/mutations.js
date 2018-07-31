

import { 
  SWITCH_LOADING_COVER, 
  GOT_CAPTCH, 
  CLEAR_CAPTCH, 
  SET_BREADCRUMB, 
  SWITCH_HISTORY_DIALOG 
} from '@/vendor/FPKG-40000-VuexStore/constants'

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

  [SET_BREADCRUMB](state, breadcrumb) {
    state.breadcrumb = breadcrumb
  },

  [SWITCH_HISTORY_DIALOG](state, status) {
    state.historyDialogVisible = status
  }
}

export default mutations