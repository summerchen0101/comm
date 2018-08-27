import { 
  SWITCH_MOBILE_MENU, 
  SWITCH_WEB_SYS_MENU, 
  SET_THEME, 
  SET_MENU 
} from '@/vendor/FPKG-40000-VuexStore/constants'
import defaultMenu from '@/vendor/FPKG-10000-Config/menu.js'
import { filterMenu } from '@/vendor/FPKG-120000-Util/other'
import _ from 'lodash'

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
    state.menu = filterMenu(defaultMenu, flattenPerMenu)
  },
  [SWITCH_MOBILE_MENU](state, payload) {
    state.isShowMobileMenu = payload
  },
  [SWITCH_WEB_SYS_MENU](state, payload) {
    state.isShowWebSysMenu = payload
  },
}

export default mutations
