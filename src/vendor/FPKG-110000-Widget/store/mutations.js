

import { 
  SWITCH_LOADING_COVER, 
  GOT_CAPTCH, 
  CLEAR_CAPTCH, 
  SET_BREADCRUMB, 
  SWITCH_HISTORY_DIALOG ,
  GOT_HISTORY ,
  SWITCH_PASSWD_DIALOG ,
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

  [SWITCH_PASSWD_DIALOG](state, status) {
    state.passwdDialogVisible = status
  },
  [SWITCH_HISTORY_DIALOG](state, status) {
    state.historyDialogVisible = status
  },
  [GOT_HISTORY](state, {result, lang, title}) {
    state.historyTitle = title
    state.historyList = result.data.map(t => ({
      id: t.id,
      time: t.updated_at,
      operatorAcc: t.user_account,
      operatorName: t.user_name,
      ip: t.ip,
      content: t.content[lang],
    }))
    state.historyPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  }
}

export default mutations