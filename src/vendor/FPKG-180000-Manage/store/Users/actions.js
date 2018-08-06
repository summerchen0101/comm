
import { 
  GET_USER_LIST,
  GOT_USER_LIST,
  ADD_USER,
  EDIT_USER,
  DEL_USER,
  SWITCH_USER_DIALOG,
  GET_PERMISSION_GROUP_LIST,
  GOT_PERMISSION_GROUP_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { startAtDay, endAtDay } from '@/vendor/FPKG-120000-Util/time.js'


import Router from '@/router'

const actions = {
  async [GET_PERMISSION_GROUP_LIST]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/group')
    if(res.code === 200001) {
      commit(GOT_PERMISSION_GROUP_LIST, res.result)
    }
  },
  async [GET_USER_LIST]({commit}, _d) {
    let params = null
    if(_d) {
      params = {
        page: _d.page
      }
    }
    
    let res = await apiHub('get', 'api/v1/user', null, params)
    if(res.code === 200001) {
      commit(GOT_USER_LIST, res.result)
    }
  },
  async [ADD_USER]({commit, dispatch}, _d) {
    let data = {
      account: _d.account,
      name: _d.nick,
      group_id: _d.perGroup,
      ip: _d.ip,
      password: _d.pw,
      password_confirmation: _d.pw_confirm,
      token: "",
    }
    let res = await apiHub('post', 'api/v1/user', data)
    if(res.code === 200001) {
      dispatch(GET_USER_LIST)
      commit(SWITCH_USER_DIALOG, false)
      
    }
  },
  async [EDIT_USER]({commit, dispatch}, _d) {
    let data = {
      account: _d.account,
      name: _d.nick,
      group_id: _d.perGroup,
      ip: _d.ip,
      password: _d.pw,
      password_confirmation: _d.pw_confirm,
      token: "",
    }
    let res = await apiHub('put', `api/v1/user/${_d.id}`, data)
    if(res.code === 200001) {
      dispatch(GET_USER_LIST)
      commit(SWITCH_USER_DIALOG, false)
      
    }
  },
  async [DEL_USER]({commit, dispatch}, id) {
    let res = await apiHub('delete', `api/v1/user/${id}`)
    if(res.code === 200001) {
      dispatch(GET_USER_LIST)
      
    }
  },
}

export default actions