
import { 
  GET_MARQUEE_LIST,
  GOT_MARQUEE_LIST,
  ADD_MARQUEE,
  EDIT_MARQUEE,
  DEL_MARQUEE,
  SWITCH_MARQUEE_DIALOG,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time.js'


import Router from '@/router'

const actions = {
  async [GET_MARQUEE_LIST]({commit}, _d) {
    let params = null
    if(_d) {
      params = {
        page: _d.page
      }
    }
    
    let res = await apiHub('get', 'api/v1/marquee', null, params)
    if(res.code === 200001) {
      commit(GOT_MARQUEE_LIST, res.result)
    }
  },
  async [ADD_MARQUEE]({commit, dispatch}, _d) {
    let data = {
      title: _d.title,
      description: _d.desc,
      forever: _d.forever ? 1 : 2,
      start_at: toDateTime(_d.startAt),
      end_at: toDateTime(_d.endAt),
    }
    let res = await apiHub('post', 'api/v1/marquee', data)
    if(res.code === 200001) {
      dispatch(GET_MARQUEE_LIST)
      commit(SWITCH_MARQUEE_DIALOG, false)
      
    }
  },
  async [EDIT_MARQUEE]({commit, dispatch}, _d) {
    let data = {
      title: _d.title,
      description: _d.desc,
      forever: _d.forever ? 1 : 2,
      start_at: toDateTime(_d.startAt),
      end_at: toDateTime(_d.endAt),
    }
    let res = await apiHub('put', `api/v1/marquee/${_d.id}`, data)
    if(res.code === 200001) {
      dispatch(GET_MARQUEE_LIST)
      commit(SWITCH_MARQUEE_DIALOG, false)
      
    }
  },
  async [DEL_MARQUEE]({commit, dispatch}, id) {
    let res = await apiHub('delete', `api/v1/marquee/${id}`)
    if(res.code === 200001) {
      dispatch(GET_MARQUEE_LIST)
      
    }
  },
}

export default actions