
import {
  GET_BANK_LIST,
  GOT_BANK_LIST,
  GET_FEE_LIST,
  GOT_FEE_LIST,
  GET_STATUS_OPTIONS,
  GOT_STATUS_OPTIONS,
  GET_DISPENSE_ACC_OPTIONS,
  GOT_DISPENSE_ACC_OPTIONS,
  GET_USER_STATUS_OPTIONS,
  GOT_USER_STATUS_OPTIONS,
  GET_MEMBER_STATUS_OPTIONS,
  GOT_MEMBER_STATUS_OPTIONS,
  GET_MEMBER_DEPOSIT_LIMIT_OPTIONS,
  GOT_MEMBER_DEPOSIT_LIMIT_OPTIONS,
  GET_GAME_TYPE_OPTIONS,
  GOT_GAME_TYPE_OPTIONS,
  GET_GAME_TEMPLATE_OPTIONS,
  GOT_GAME_TEMPLATE_OPTIONS,
  SET_GAME_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import storage from 'store2'

import Router from '@/router'

const actions = {
  async [GET_STATUS_OPTIONS]({commit}) {
    let params = {
      condition: 'deposit'
    }
    let res = await apiHub("get", "api/v1/dropdown/status", null, params)
    if(res.code === 200001) {
      commit(GOT_STATUS_OPTIONS, res.result)
    }
  },
  async [GET_BANK_LIST]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/bank')
    if(res.code === 200001) {
      commit(GOT_BANK_LIST, res.result)
    }
  },
  async [GET_FEE_LIST]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/fee')
    if(res.code === 200001) {
      commit(GOT_FEE_LIST, res.result)
    }
  },
  async [GET_USER_STATUS_OPTIONS]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/active', null, {type: "user"})
    if(res.code === 200001) {
      commit(GOT_USER_STATUS_OPTIONS, res.result)
    }
  },
  async [GET_MEMBER_STATUS_OPTIONS]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/active', null, {type: "member"})
    if(res.code === 200001) {
      commit(GOT_MEMBER_STATUS_OPTIONS, res.result)
    }
  },
  async [GET_DISPENSE_ACC_OPTIONS]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/dispense_account')
    if(res.code === 200001) {
      commit(GOT_DISPENSE_ACC_OPTIONS, res.result)
    }
  },
  async [GET_MEMBER_DEPOSIT_LIMIT_OPTIONS]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/member_deposit_limit')
    if(res.code === 200001) {
      commit(GOT_MEMBER_DEPOSIT_LIMIT_OPTIONS, res.result)
    }
  },
  async [GET_GAME_TYPE_OPTIONS]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/gamekind')
    if(res.code === 200001) {
      commit(GOT_GAME_TYPE_OPTIONS, res.result)
    }
  },
  async [GET_GAME_TEMPLATE_OPTIONS]({commit}, id) {
    let res = await apiHub('get', 'api/v1/dropdown/model', null, {game_kind: id})
    if(res.code === 200001) {
      commit(GOT_GAME_TEMPLATE_OPTIONS, {
        gameType: id,
        options: res.result
      })
    }
  },
  async [SET_GAME_LIST]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/game_list')
    if(res.code === 200001) {
      storage.session("gameList", res.result)
    }
  },
}

export default actions