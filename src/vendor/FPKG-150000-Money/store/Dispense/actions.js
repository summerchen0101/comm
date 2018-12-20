
import { 
  GET_DISPENSE_INFO,
  GOT_DISPENSE_INFO,
  GET_DISPENSE_LIST,
  GOT_DISPENSE_LIST,
  CHANGED_DISPENSE_LIST_TYPE,
  SWITCH_DISPENSE_DIALOG,
  SET_DISPENSE_STATUS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time'
import { reviewAction } from '@/vendor/FPKG-10000-Config/enum'

import Router from '@/router'

const actions = {
  async [GET_DISPENSE_INFO]({commit}, _d) {
    let params = {
      start_time: _d.status !== 1 ? toDateTime(_d.startAt) : undefined,
      end_time: _d.status !== 1 ? toDateTime(_d.endAt) : undefined,
      no: _d.number || undefined,
      account: _d.account || undefined,
      member_withdrawal_limit_id: _d.withdrawType || 0,
    }
    let res = await apiHub("get", `api/v1/dispense/${_d.status}/summary`, null, params)
    if(res.code === 200001) {
      commit(GOT_DISPENSE_INFO, res.result)
    }
  },
  async [GET_DISPENSE_LIST]({commit}, _d) {
    let params = {
      start_time: _d.status !== 1 ? toDateTime(_d.startAt) : undefined,
      end_time: _d.status !== 1 ? toDateTime(_d.endAt) : undefined,
      no: _d.number || undefined,
      account: _d.account || undefined,
      page: _d.page || undefined,
      member_withdrawal_limit_id: _d.withdrawType || 0,
    }
    let res = await apiHub("get", `api/v1/dispense/${_d.status}/list`, null, params)
    if(res.code === 200001) {
      
      commit(CHANGED_DISPENSE_LIST_TYPE, _d.status)
      commit(GOT_DISPENSE_LIST, res.result)
    }
  },
  async [SET_DISPENSE_STATUS]({dispatch, commit}, _d) {
    let i = reviewAction.findIndex(t => t.code === _d.action)
    let data = {
      review_user_id: _d.operatorId,
      action: reviewAction[i].value,
      reason: _d.reason || undefined,
      remark: _d.notes || undefined,
      dispense_account_id: _d.dispenseAcc || undefined,
      member_withdrawal_limit_id: _d.withdrawType || 0
    }
    let res = await apiHub("put", `api/v1/dispense/${_d.id}`, data)
    if(res.code === 200001) {
      commit(SWITCH_DISPENSE_DIALOG, false)
      EventsHub.$emit("dispense:UpdateList")
    }
  }
}

export default actions