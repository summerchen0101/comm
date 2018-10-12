
import {
  GET_GAME_TOTAL_REPORT,
  GOT_GAME_TOTAL_REPORT,
  GET_GAME_TYPE_REPORT,
  GOT_GAME_TYPE_REPORT,
  GET_GAME_PLAY_REPORT,
  GET_GAME_PLAY_REPORT_INFO,
  GOT_GAME_PLAY_REPORT_INFO,
  GET_GAME_PLAY_REPORT_DETAIL,
  GOT_GAME_PLAY_REPORT_DETAIL,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDate, toDateTime } from '@/vendor/FPKG-120000-Util/time.js'


import Router from '@/router'

const actions = {
  async [GET_GAME_TOTAL_REPORT]({commit}, _d) {
    let params = {
      start_date: toDateTime(_d.startAt).substr(0, 16),
      end_date: toDateTime(_d.endAt).substr(0, 16),
    }
    let res = await apiHub("get", "api/v1/statement/game", null, params)
    if(res.code === 200001) {
      commit(GOT_GAME_TOTAL_REPORT, res.result)
    }
  },
  async [GET_GAME_TYPE_REPORT]({commit}, _d) {
    let params = {
      start_date: toDateTime(_d.startAt).substr(0, 16),
      end_date: toDateTime(_d.endAt).substr(0, 16),
    }
    let res = await apiHub("get", `api/v1/statement/game/${_d.gameTypeId}/gametype`, null, params)
    if(res.code === 200001) {
      commit(GOT_GAME_TYPE_REPORT, res.result)
    }
  },
  async [GET_GAME_PLAY_REPORT]({dispatch}, _d) {
    dispatch(GET_GAME_PLAY_REPORT_INFO, _d)
    dispatch(GET_GAME_PLAY_REPORT_DETAIL, _d)
  },
  async [GET_GAME_PLAY_REPORT_INFO]({commit}, _d) {
    let params = {
      start_date: toDateTime(_d.startAt).substr(0, 16),
      end_date: toDateTime(_d.endAt).substr(0, 16),
    }
    let res = await apiHub("get", `api/v1/statement/game/${_d.gameTypeId}/${_d.gamePlayId}/summary`, null, params)
    if(res.code === 200001) {
      commit(GOT_GAME_PLAY_REPORT_INFO, res.result)
    }
  },
  async [GET_GAME_PLAY_REPORT_DETAIL]({commit}, _d) {
    let params = {
      start_date: toDateTime(_d.startAt).substr(0, 16),
      end_date: toDateTime(_d.endAt).substr(0, 16),
      page: _d.page
    }
    let res = await apiHub("get", `api/v1/statement/game/${_d.gameTypeId}/${_d.gamePlayId}/list`, null, params)
    if(res.code === 200001) {
      res.result.gameTypeId = _d.gameTypeId
      commit(GOT_GAME_PLAY_REPORT_DETAIL, res.result)
    }
  },
}

export default actions