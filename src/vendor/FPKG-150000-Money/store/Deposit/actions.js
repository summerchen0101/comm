
import { 
  GET_DEPOSIT_INFO,
  GOT_DEPOSIT_INFO,
  GET_DEPOSIT_LIST,
  GOT_DEPOSIT_LIST,
  GET_DEPOSIT_STATUS_LIST,
  GOT_DEPOSIT_STATUS_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_DEPOSIT_STATUS_LIST]({commit}) {
    let params = {
      condition: 'deposit'
    }
    let res = await apiHub("get", "api/v1/dropdown/status", null, params)
    if(res.code === 200001) {
      commit(GOT_DEPOSIT_STATUS_LIST, res.result)
    }
  },
  async [GET_DEPOSIT_INFO]({commit}, _d) {
    let params = {
      // start_time: _d.startTime,
      // end_time: _d.endTime,
      no: _d.number,
      account: _d.account,
    }
    let res = await apiHub("get", `api/v1/deposit/${_d.status}/summary`, null, params)
    if(res.code === 200001) {
      commit(GOT_DEPOSIT_INFO, res.result)
    }
  },
  async [GET_DEPOSIT_LIST]({commit}, _d) {
    let params = {
      // start_time: _d.startTime,
      // end_time: _d.endTime,
      no: _d.number,
      account: _d.account,
      page: _d.page
    }
    let res = await apiHub("get", `api/v1/deposit/${_d.status}/list`, null, params)
    if(res.code === 200001) {
      commit(GOT_DEPOSIT_LIST, res.result)
    }
  },
}

export default actions