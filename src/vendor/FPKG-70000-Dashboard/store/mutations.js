import { SWITCH_MOBILE_MENU, SWITCH_WEB_SYS_MENU, SET_THEME } from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [SET_THEME](state, newName) {
    state.themeName = newName || 'TME-100'
  },
  [SWITCH_MOBILE_MENU](state, payload) {
    state.isShowMobileMenu = payload
  },
  [SWITCH_WEB_SYS_MENU](state, payload) {
    state.isShowWebSysMenu = payload
  },
}

export default mutations