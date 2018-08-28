
import { 
  CLEAR_MEMBER_SEARCHED_DATA,
  GET_SINGLE_MEMBER,
  GOT_SINGLE_MEMBER,

  // opens
  GET_ALLOW_COMMISSION_LIST,
  GOT_ALLOW_COMMISSION_LIST,

  GET_WITHDRAWN_COMMISSION_LIST,
  GOT_WITHDRAWN_COMMISSION_LIST,

  GET_DIRECT_MEMBER_LIST,
  GOT_DIRECT_MEMBER_LIST,

  GET_UPPER_MEMBER_LIST,
  GOT_UPPER_MEMBER_LIST,

  GET_ADDED_POINT_LIST,
  GOT_ADDED_POINT_LIST,

  GET_SUBTRACTED_POINT_LIST,
  GOT_SUBTRACTED_POINT_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time'


import Router from '@/router'

const actions = {
  async [GET_SINGLE_MEMBER]({commit}, _d) {
    commit(CLEAR_MEMBER_SEARCHED_DATA)
    let params = {
      account: _d.type === 'account' ? _d.account : undefined,
      mobile: _d.type === 'phone' ? _d.phone : undefined,
    }
    let res = await apiHub("get", "api/v1/member_search", null, params)
    if(res.code === 200001) {
      commit(GOT_SINGLE_MEMBER, res.result)
    }
  },

  // opens
  async [GET_ALLOW_COMMISSION_LIST]({commit}, _d = {}) {
    let params = {
      page: _d.page
    }
    let res = await apiHub("get", `api/v1/member_search/${_d.id}/brokerage/report`, null, params)
    if(res.code === 200001) {
      commit(GOT_ALLOW_COMMISSION_LIST, res.result)
    }
  },
  async [GET_WITHDRAWN_COMMISSION_LIST]({commit}, _d = {}) {
    let params = {
      page: _d.page
    }
    let res = await apiHub("get", `api/v1/member_search/${_d.id}/brokerage`, null, params)
    if(res.code === 200001) {
      commit(GOT_WITHDRAWN_COMMISSION_LIST, res.result)
    }
  },
  async [GET_DIRECT_MEMBER_LIST]({commit}, _d = {}) {
    let params = {
      account: _d.account,
      mobile: _d.phone,
      active: _d.status,
      page: _d.page,
    }
    let res = await apiHub("get", `api/v1/member_search/${_d.id}/below/parent`, null, params)
    if(res.code === 200001) {
      commit(GOT_DIRECT_MEMBER_LIST, res.result)
    }
  },
  async [GET_UPPER_MEMBER_LIST]({commit}, _d = {}) {
    let params = {
      account: _d.account,
      mobile: _d.phone,
      active: _d.status,
      page: _d.page,
    }
    let res = await apiHub("get", `api/v1/member_search/${_d.id}/below/upper`, null, params)
    if(res.code === 200001) {
      commit(GOT_UPPER_MEMBER_LIST, res.result)
    }
  },
  async [GET_ADDED_POINT_LIST]({commit}, _d = {}) {
    let params = {
      start_time: _d.startAt ? toDateTime(_d.startAt) : undefined,
      end_time: _d.endAt ? toDateTime(_d.endAt) : undefined,
      page: _d.page,
    }
    let res = await apiHub("get", `api/v1/member_search/${_d.id}/balance/5`, null, params) // 5:撥點 6:扣點
    if(res.code === 200001) {
      commit(GOT_ADDED_POINT_LIST, res.result)
    }
  },
  async [GET_SUBTRACTED_POINT_LIST]({commit}, _d = {}) {
    let params = {
      start_time: _d.startAt ? toDateTime(_d.startAt) : undefined,
      end_time: _d.endAt ? toDateTime(_d.endAt) : undefined,
      page: _d.page,
    }
    let res = await apiHub("get", `api/v1/member_search/${_d.id}/balance/6`, null, params) // 5:撥點 6:扣點
    if(res.code === 200001) {
      commit(GOT_SUBTRACTED_POINT_LIST, res.result)
    }
  },
}

export default actions