
import { 
  GET_WITHDRAW_INFO,
  GOT_WITHDRAW_INFO,
  GET_WITHDRAW_LIST,
  GOT_WITHDRAW_LIST,
  GET_WITHDRAW_STATUS_LIST,
  GOT_WITHDRAW_STATUS_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_WITHDRAW_STATUS_LIST]({commit}) {
    let params = {
      condition: 'withdrawal'
    }
    let res = await apiHub("get", "api/v1/dropdown/status", null, params)
    if(res.code === 200001) {
      commit(GOT_WITHDRAW_STATUS_LIST, res.result)
    }
  },
  async [GET_WITHDRAW_INFO]({commit}, _d) {
    let params = {
      // start_time: _d.startTime,
      // end_time: _d.endTime,
      no: _d.number || undefined,
      account: _d.account || undefined,
    }
    let res = await apiHub("get", `api/v1/withdrawal/${_d.status}/summary`, null, params)
    if(res.code === 200001) {
      commit(GOT_WITHDRAW_INFO, res.result)
    }
  },
  async [GET_WITHDRAW_LIST]({commit}, _d) {
    let params = {
      // start_time: _d.startTime,
      // end_time: _d.endTime,
      no: _d.number || undefined,
      account: _d.account || undefined,
      page: _d.page || undefined
    }
    let res = await apiHub("get", `api/v1/withdrawal/${_d.status}/list`, null, params)
    if(res.code === 200001) {
      commit(GOT_WITHDRAW_LIST, res.result)
    }
  },
}

export default actions