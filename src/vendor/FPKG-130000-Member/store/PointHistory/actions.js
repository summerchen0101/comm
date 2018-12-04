
import {
  GET_POINT_HISTORY_LIST,
  GOT_POINT_HISTORY_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'


import Router from '@/router'

const actions = {
  async [GET_POINT_HISTORY_LIST]({commit}, _d = {}) {
    let params = {
      type: _d.type.join(','),
      account: _d.account,
      start_time: _d.startAt ? toDateTime(_d.startAt) : undefined,
      end_time: _d.endAt ? toDateTime(_d.endAt) : undefined,
      page: _d.page,
    }
    let res = await apiHub("get", `api/v1/member_balance_transfer`, null, params)
    if(res.code === 200001) {
      commit(GOT_POINT_HISTORY_LIST, res.result)
    }
  },
}

export default actions