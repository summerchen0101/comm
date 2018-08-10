
import { 
  GET_BANK_LIST,
  GOT_BANK_LIST,
  GET_FEE_LIST,
  GOT_FEE_LIST,
  GET_DISPENSE_ACC_OPTIONS,
  GOT_DISPENSE_ACC_OPTIONS,
  GET_USER_STATUS_OPTIONS,
  GOT_USER_STATUS_OPTIONS,
  GET_DAILY_DEPOSIT_LIMIT_OPTIONS,
  GOT_DAILY_DEPOSIT_LIMIT_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
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
  async [GET_USER_STATUS_OPTIONS]({commit}, roleType) {
    let res = await apiHub('get', 'api/v1/dropdown/active', null, {type: roleType})
    if(res.code === 200001) {
      commit(GOT_USER_STATUS_OPTIONS, res.result)
    }
  },
  async [GET_DISPENSE_ACC_OPTIONS]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/dispense_account')
    if(res.code === 200001) {
      commit(GOT_DISPENSE_ACC_OPTIONS, res.result)
    }
  },
  async [GET_DAILY_DEPOSIT_LIMIT_OPTIONS]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/daily_deposit_limit')
    if(res.code === 200001) {
      commit(GOT_DAILY_DEPOSIT_LIMIT_OPTIONS, res.result)
    }
  },
}

export default actions