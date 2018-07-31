import { 
  SET_THEME, 
  GET_USER_INFO, 
  SET_USER_INFO,
  CLEAR_USER_INFO,
  CHANGE_LOGIN_STATUS, 
  DO_LOGOUT, 
  DO_LOGIN, 
  CLEAR_SESSION,
  EDIT_USER_PASSWORD,
  SET_USER_AUTH,
  SET_MENU,

  GET_ACCOUNT_LIST, 
  GOT_ACCOUNT_LIST, 
  GET_ACCOUNT, 
  ADD_ACCOUNT, 
  GOT_ACCOUNT, 
  EDIT_ACCOUNT,
  DEL_ACCOUNT,
  SWITCH_ACCOUNT_DIALOG,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { Vcode } from '@/vendor/FPKG-120000-Util/customValidate';
import Router from '@/router'
import storage from 'store2'

const actions = {
  async [GET_USER_INFO]({ commit }) {
    let res = await apiHub("get", "api/v1/auth_user")
    if(res.code === 200001) {
      commit(CHANGE_LOGIN_STATUS, true)
      commit(SET_USER_INFO, res.result)
      commit(SET_MENU, res.result.permission)
    }
  },
  async [DO_LOGIN]({ commit, dispatch }, _d) {
    let data = {
      account: _d.account,
      password: _d.password,
      captcha: _d.captcha,
    }
    let res = await apiHub("post", `api/v1/user/login/${_d.captchaUuid}`, data)
    if(res.code === 200001) {
      storage.session("auth", res.result.token)
      commit(SET_USER_AUTH)
      await dispatch(GET_USER_INFO)
      console.log("登入成功")
      Router.push({name: 'Announce'})
    }else {
      console.log("登入失敗")
    }
  },
  async [DO_LOGOUT]({ commit }, data) {
    console.log(DO_LOGOUT)
    let res = await apiHub("post", "api/v1/user/logout", data)
    if(res.code === 200001) {
      commit(CLEAR_USER_INFO)
      commit(CLEAR_SESSION)
      Router.push({name: "Login"})
      console.log("登出成功")
    }
  },
  async [EDIT_USER_PASSWORD]({ commit }, _d) {
    let data = {
      old_password: _d.oldPassword,
      password: _d.newPassword,
      password_confirmation: _d.confirmPassword
    }
    let res = await apiHub("put", "api/v1/auth_user", data)
    // if(res.code === 200001) {
    // }
  },

  // 帳號列表
  async [GET_ACCOUNT_LIST]({commit}) {
    let res = await apiHub("get", "account/basic/lists")
    if(res.code === 0) {
      commit(GOT_ACCOUNT_LIST, res.response)
    }
  },
  async [ADD_ACCOUNT]({commit, dispatch}, _d) {
    let data = {
      p3_bch_code: _d.code,
      p3_bch_name: _d.name,
      p3_bch_status: _d.status ? '3' : '-2',
    }
    let res = await apiHub("post", "account/basic/create", data)
    if(res.code === 0) {
      commit(SWITCH_ACCOUNT_DIALOG, false)
      dispatch(GET_ACCOUNT_LIST)
    }
  },
  async [GET_ACCOUNT]({commit}, _d) {
    let params = {p3_bch_guid: _d.guid}
    let res = await apiHub("get", "account/basic/modify", null, params)
    if(res.code === 0) {
      commit(GOT_ACCOUNT, res.response)
      commit(SWITCH_ACCOUNT_DIALOG, true)
    }
  },
  async [DEL_ACCOUNT]({commit, dispatch}, _d) {
    let params = {p3_bch_guid: _d.guid}
    let res = await apiHub("delete", "account/basic/delete", null, params)
    if(res.code === 0) {
      // commit(SWITCH_ACCOUNT_DIALOG, false)
      dispatch(GET_ACCOUNT_LIST)
    }
  },
  async [EDIT_ACCOUNT]({commit, dispatch}, _d) {
    let data = {
      p3_bch_guid: _d.guid,
      p3_bch_code: _d.code,
      p3_bch_name: _d.name,
      p3_bch_status: _d.status ? '3' : '-2',
    }
    let res = await apiHub("put", "account/basic/doModify", data)
    if(res.code === 0) {
      commit(SWITCH_ACCOUNT_DIALOG, false)
      dispatch(GET_ACCOUNT_LIST)
    }
  },
}

export default actions