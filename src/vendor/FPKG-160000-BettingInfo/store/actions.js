
import {
  GET_BETTING_INFO,
  GOT_BETTING_INFO,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_BETTING_INFO]({commit}, _d) {
    let params = {
      wager_id: _d.number
    }
    let res = await apiHub("get", `api/v1/wager/${_d.type}`, null, params)
    if(res.code === 200001) {
      commit(GOT_BETTING_INFO, res.result)
    }
  }
}

export default actions