
import { 
  GET_CAPTCH, 
  GOT_CAPTCH, 
  GET_HISTORY,
  GOT_HISTORY,
  EDIT_USER_PASSWD,
  SWITCH_HISTORY_DIALOG,
  SWITCH_PASSWD_DIALOG,
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
    if(res.code === 200001) {
      commit(GOT_HISTORY, {
        result: res.result, 
        lang: rootState.Global.lang, 
        title
      })
      commit(SWITCH_HISTORY_DIALOG, true)
    }
  },
  async [EDIT_USER_PASSWD]({commit, rootState}, _d) {
    let params = {
      old_password: _d.oldPw,
      password: _d.pw,
      password_confirmation: _d.pw_confirm,
    }
    let res = await apiHub('get', 'api/v1/auth_user', null, params)
    if(res.code === 200001) {
      Router.app.$alert("修改完成", "提示")
      commit(SWITCH_PASSWD_DIALOG, false)
    }
  }
}

export default actions