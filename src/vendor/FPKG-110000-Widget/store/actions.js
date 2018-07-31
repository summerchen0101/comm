
import { 
  GET_CAPTCH, 
  GOT_CAPTCH, 
  GET_HISTORY,
  GOT_HISTORY,
  SWITCH_HISTORY_DIALOG,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import Router from '@/router'

const actions = {
  async [GET_CAPTCH]({commit}) {
    let res = await apiHub('get', 'captchaInfo')
    commit(GOT_CAPTCH, res)
  },
  async [GET_HISTORY]({commit, rootState}, {funcKey, id, title}) {
    let params = {
      func_key: funcKey,
      func_id: id
    }
    let res = await apiHub('get', 'api/v1/user_operation/detail', null, params)
    commit(GOT_HISTORY, {
      result: res.result, 
      lang: rootState.Global.lang, 
      title
    })
    commit(SWITCH_HISTORY_DIALOG, true)
  }
}

export default actions