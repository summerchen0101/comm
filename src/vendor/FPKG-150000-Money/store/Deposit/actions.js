
import { 
  GET_DEPOSIT_INFO,
  GOT_DEPOSIT_INFO,
  GET_DEPOSIT_LIST,
  GOT_DEPOSIT_LIST,
  SET_DEPOSIT_STATUS,
  SWITCH_DEPOSIT_DIALOG,
  CHANGED_DEPOSIT_LIST_TYPE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time.js'



import Router from '@/router'

const actions = {
  async [GET_DEPOSIT_INFO]({commit}, _d) {
    let params = {
      start_time: _d.status != 1 ? toDateTime(_d.startAt): undefined,
      end_time: _d.status != 1 ? toDateTime(_d.endAt): undefined,
      no: _d.number || undefined,
      account: _d.account || undefined,
      payway_id: _d.payType,
    }
    let res = await apiHub("get", `api/v1/deposit/${_d.status}/summary`, null, params)
    if(res.code === 200001) {
      commit(GOT_DEPOSIT_INFO, res.result)
    }
  },
  async [GET_DEPOSIT_LIST]({commit}, _d) {
    let params
    if(_d) {
      params = {
        start_time: _d.status != 1 ? toDateTime(_d.startAt): undefined,
        end_time: _d.status != 1 ? toDateTime(_d.endAt): undefined,
        no: _d.number || undefined,
        account: _d.account || undefined,
        page: _d.page || undefined,
        payway_id: _d.payType,
      }

    }
    
    let res = await apiHub("get", `api/v1/deposit/${_d.status}/list`, null, params)
    if(res.code === 200001) {
      commit(CHANGED_DEPOSIT_LIST_TYPE, _d.status)
      commit(GOT_DEPOSIT_LIST, res.result)
    }
  },
  async [SET_DEPOSIT_STATUS]({dispatch, commit}, _d) {
    let data = {
      review_user_id: _d.operatorId,
      action: _d.action === 'confirm' ? 1 : 2,
      reason: _d.action === 'cancel' ?  _d.reason : undefined
    }
    let res = await apiHub("put", `api/v1/deposit/${_d.id}`, data)
    if(res.code === 200001) {
      commit(SWITCH_DEPOSIT_DIALOG, false)
      EventsHub.$emit("deposit:UpdateList")
    }
  }
}

export default actions