
import { 
  GET_WITHDRAW_INFO,
  GOT_WITHDRAW_INFO,
  GET_WITHDRAW_LIST,
  GOT_WITHDRAW_LIST,
  CHANGED_WITHDRAW_LIST_TYPE,
  SWITCH_WITHDRAW_DIALOG,
  SET_WITHDRAW_STATUS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time'
import { reviewAction } from '@/vendor/FPKG-10000-Config/enum'


import Router from '@/router'

const actions = {
  async [GET_WITHDRAW_INFO]({commit}, _d) {
    let params = {
      start_time: _d.status !== 1 ? toDateTime(_d.startAt) : undefined,
      end_time: _d.status !== 1 ? toDateTime(_d.endAt) : undefined,
      no: _d.number || undefined,
      account: _d.account || undefined,
      member_withdrawal_limit_id: _d.withdrawType || 0,
    }
    let res = await apiHub("get", `api/v1/withdrawal/${_d.status}/summary`, null, params)
    if(res.code === 200001) {
      commit(GOT_WITHDRAW_INFO, res.result)
    }
  },
  async [GET_WITHDRAW_LIST]({commit}, _d) {
    let params = {
      start_time: _d.status !== 1 ? toDateTime(_d.startAt) : undefined,
      end_time: _d.status !== 1 ? toDateTime(_d.endAt) : undefined,
      no: _d.number || undefined,
      account: _d.account || undefined,
      page: _d.page || undefined,
      member_withdrawal_limit_id: _d.withdrawType || 0,
    }
    let res = await apiHub("get", `api/v1/withdrawal/${_d.status}/list`, null, params)
    if(res.code === 200001) {
      
      commit(CHANGED_WITHDRAW_LIST_TYPE, _d.status)
      commit(GOT_WITHDRAW_LIST, res.result)
    }
  },
  async [SET_WITHDRAW_STATUS]({dispatch, commit}, _d) {
    let i = reviewAction.findIndex(t => t.code === _d.action)
    let data = {
      review_user_id: _d.operatorId,
      action: reviewAction[i].value,
      reason: _d.action == 'cancel' ? _d.reason : undefined,
      fee: _d.action == 'confirm' ? _d.fee : undefined,
      below_norm_fee: _d.action == 'confirm' ? _d.disallowWithdrawFee : undefined,
    }
    let res = await apiHub("put", `api/v1/withdrawal/${_d.id}`, data)
    if(res.code === 200001) {
      commit(SWITCH_WITHDRAW_DIALOG, false)
      EventsHub.$emit("withdraw:UpdateList")
    }
  }
}

export default actions