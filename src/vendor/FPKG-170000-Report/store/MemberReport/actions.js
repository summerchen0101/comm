
import { 
  GET_MEMBER_REPORT,
  GOT_MEMBER_REPORT,
  GET_MEMBER_GAME_REPORT,
  GET_MEMBER_GAME_REPORT_INFO,
  GOT_MEMBER_GAME_REPORT_INFO,
  GET_MEMBER_GAME_REPORT_DETAIL,
  GOT_MEMBER_GAME_REPORT_DETAIL,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { getDate } from '@/vendor/FPKG-120000-Util/time.js'


import Router from '@/router'

const actions = {
  async [GET_MEMBER_REPORT]({commit}, _d) {
    let params = {
      start_date: getDate(_d.startAt),
      end_date: getDate(_d.endAt),
      account: _d.account,
    }
    let res = await apiHub("get", "api/v1/statement/member", null, params)
    if(res.code === 200001) {
      commit(GOT_MEMBER_REPORT, res.result)
    }
  },
  async [GET_MEMBER_GAME_REPORT]({dispatch}, _d) {
    dispatch(GET_MEMBER_GAME_REPORT_INFO, _d)
    dispatch(GET_MEMBER_GAME_REPORT_DETAIL, _d)
  },
  async [GET_MEMBER_GAME_REPORT_INFO]({commit}, _d) {
    let params = {
      start_date: getDate(_d.startAt),
      end_date: getDate(_d.endAt),
      account: _d.account,
    }
    let res = await apiHub("get", `api/v1/statement/member/${_d.gameTypeId}/summary`, null, params)
    if(res.code === 200001) {
      commit(GOT_MEMBER_GAME_REPORT_INFO, res.result)
    }
  },
  async [GET_MEMBER_GAME_REPORT_DETAIL]({commit}, _d) {
    let params = {
      start_date: getDate(_d.startAt),
      end_date: getDate(_d.endAt),
      account: _d.account,
    }
    let res = await apiHub("get", `api/v1/statement/member/${_d.gameTypeId}/list`, null, params)
    if(res.code === 200001) {
      commit(GOT_MEMBER_GAME_REPORT_DETAIL, res.result)
    }
  },
}

export default actions