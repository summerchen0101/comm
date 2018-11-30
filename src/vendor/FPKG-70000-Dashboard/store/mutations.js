import {
  SWITCH_MOBILE_MENU,
  SWITCH_WEB_SYS_MENU,
  SET_THEME,
  SET_MENU,
  CLEAR_MENU,
  GOT_TODAY_LIST,
  SWITCH_TODAY_LOADING_STATUS
} from '@/vendor/FPKG-40000-VuexStore/constants'
import defaultMenu from '@/vendor/FPKG-10000-Config/menu.js'
import { filterMenu } from '@/vendor/FPKG-120000-Util/other'
import Router from '@/router'

const mutations = {
  [SET_THEME](state, newName) {
    state.themeName = newName || 'TME-100'
  },
  [SET_MENU](state, perMenu) {
    let flattenPerMenu = perMenu.reduce((arr, obj) => {
      arr = arr.concat(obj)
      if(obj.menu.length > 0) {
        arr = arr.concat(obj.menu)
      }
      return arr
    }, [])
    state.funcKeyCount = flattenPerMenu.length
    state.menu = filterMenu(Router.app.$lodash.cloneDeep(defaultMenu), flattenPerMenu)
  },
  [CLEAR_MENU](state) {
    state.funcKeyCount = 0
    state.menu = []
  },
  [SWITCH_MOBILE_MENU](state, payload) {
    state.isShowMobileMenu = payload
  },
  [SWITCH_WEB_SYS_MENU](state, payload) {
    state.isShowWebSysMenu = payload
  },
  [GOT_TODAY_LIST](state, result) {
    state.today = {
      deposit: result.deposit,
      withdrawal: result.withdrawal,
      register: result.register
    }
  },
  [SWITCH_TODAY_LOADING_STATUS](state, status) {
    state.isLoadingToday = status
  },
}

export default mutations
