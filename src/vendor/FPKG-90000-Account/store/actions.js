import { 
  SET_THEME, 
  GET_USER_INFO, 
  SET_USER_INFO,
  CLEAR_USER_INFO,
  CHANGE_LOGIN_STATUS, 
  DO_LOGOUT, 
  DO_LOGIN, 
  CLEAR_SESSION,

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
import { Vcode } from '@/vendor/FPKG-10000-Config/customValidate';
import Router from '@/router'

const actions = {
  async [GET_USER_INFO]({ commit }) {
    let res = await apiHub("get", "account/polling-basic/info")
    if(res.code === 0) {
      commit(CHANGE_LOGIN_STATUS, true)
      commit(SET_USER_INFO, res.response)
      commit(SET_THEME, res.response.theme)
    }
  },
  async [DO_LOGIN]({ commit, dispatch }, data) {
    let res = await apiHub("put", "account/common/login", data)
    if(res.code === 0) {
      await dispatch(GET_USER_INFO)
      console.log("登入成功")
      Router.push({name: 'Branch'})
    }else {
      console.log("登入失敗")
    }
  },
  async [DO_LOGOUT]({ commit }, data) {
    console.log(DO_LOGOUT)
    let res = await apiHub("put", "account/common/logout", data)
    if(res.code === 0) {
      commit(CLEAR_USER_INFO)
      commit(CLEAR_SESSION)
      Router.push({name: "Login"})
      console.log("登出成功")
    }
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