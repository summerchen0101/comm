
import { 
  GET_SITE_ANNOUNCE_LIST,
  GOT_SITE_ANNOUNCE_LIST,
  ADD_SITE_ANNOUNCE,
  EDIT_SITE_ANNOUNCE,
  DEL_SITE_ANNOUNCE,
  SWITCH_SITE_ANNOUNCE_DIALOG,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time.js'


import Router from '@/router'

const actions = {
  async [GET_SITE_ANNOUNCE_LIST]({commit}, _d) {
    let params = null
    if(_d) {
      params = {
        page: _d.page
      }
    }
    
    let res = await apiHub('get', 'api/v1/inward_bulletin', null, params)
    if(res.code === 200001) {
      commit(GOT_SITE_ANNOUNCE_LIST, res.result)
    }
  },
  async [ADD_SITE_ANNOUNCE]({commit, dispatch}, _d) {
    let data = {
      title: _d.title,
      description: _d.desc,
      top: _d.lockTop ? 1 : 2,
    }
    let res = await apiHub('post', 'api/v1/inward_bulletin', data)
    if(res.code === 200001) {
      dispatch(GET_SITE_ANNOUNCE_LIST)
      commit(SWITCH_SITE_ANNOUNCE_DIALOG, false)
      
    }
  },
  async [EDIT_SITE_ANNOUNCE]({commit, dispatch}, _d) {
    let data = {
      title: _d.title,
      description: _d.desc,
      top: _d.lockTop ? 1 : 2,
    }
    let res = await apiHub('put', `api/v1/inward_bulletin/${_d.id}`, data)
    if(res.code === 200001) {
      dispatch(GET_SITE_ANNOUNCE_LIST)
      commit(SWITCH_SITE_ANNOUNCE_DIALOG, false)
      
    }
  },
  async [DEL_SITE_ANNOUNCE]({commit, dispatch}, id) {
    let res = await apiHub('delete', `api/v1/inward_bulletin/${id}`)
    if(res.code === 200001) {
      dispatch(GET_SITE_ANNOUNCE_LIST)
      
    }
  },
}

export default actions