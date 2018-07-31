
import { 
  GET_CAPTCH, 
  GOT_CAPTCH, 
  GET_HISTORY,
  SWITCH_HISTORY_DIALOG,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import Router from '@/router'

const actions = {
  async [GET_CAPTCH]({commit}) {
    let res = await apiHub('get', '/captchaInfo')
    commit(GOT_CAPTCH, res)
  },
  async [GET_HISTORY]({commit}) {
    // let res = await apiHub('get', '/captchaInfo')
    commit(SWITCH_HISTORY_DIALOG, true)
  }
}

export default actions