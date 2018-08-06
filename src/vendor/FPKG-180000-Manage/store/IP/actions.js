
import { 
  GET_IP_LIST,
  GOT_IP_LIST,
  ADD_IP,
  EDIT_IP,
  DEL_IP,
  SWITCH_IP_DIALOG,
  GET_PERMISSION_GROUP_OPTIONS,
  GOT_PERMISSION_GROUP_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { startAtDay, endAtDay } from '@/vendor/FPKG-120000-Util/time.js'


import Router from '@/router'

const actions = {
  async [GET_IP_LIST]({commit}, _d) {
    let params = null
    if(_d) {
      params = {
        page: _d.page
      }
    }
    
    let res = await apiHub('get', 'api/v1/whitelist', null, params)
    if(res.code === 200001) {
      commit(GOT_IP_LIST, res.result)
    }
  },
  async [ADD_IP]({commit, dispatch}, _d) {
    let data = {
      ip: _d.ipColumns.join('.'),
      description: _d.desc
    }
    let res = await apiHub('post', 'api/v1/whitelist', data)
    if(res.code === 200001) {
      dispatch(GET_IP_LIST)
      commit(SWITCH_IP_DIALOG, false)
      
    }
  },
  async [EDIT_IP]({commit, dispatch}, _d) {
    let data = {
      ip: _d.ipColumns.join('.'),
      description: _d.desc
    }
    let res = await apiHub('put', `api/v1/whitelist/${_d.id}`, data)
    if(res.code === 200001) {
      dispatch(GET_IP_LIST)
      commit(SWITCH_IP_DIALOG, false)
      
    }
  },
  async [DEL_IP]({commit, dispatch}, id) {
    let res = await apiHub('delete', `api/v1/whitelist/${id}`)
    if(res.code === 200001) {
      dispatch(GET_IP_LIST)
      
    }
  },
}

export default actions