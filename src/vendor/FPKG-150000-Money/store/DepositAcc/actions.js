
import { 
  GET_DEPOSIT_ACC_LIST,
  GOT_DEPOSIT_ACC_LIST,
  ADD_DEPOSIT_ACC,
  EDIT_DEPOSIT_ACC,
  DEL_DEPOSIT_ACC,
  SWITCH_DEPOSIT_ACC_DIALOG,
  GET_BANK_LIST,
  GOT_BANK_LIST,
  SET_PRIMARY_DEPOSIT_ACC,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { startAtDay, endAtDay } from '@/vendor/FPKG-120000-Util/time.js'


import Router from '@/router'

const actions = {
  async [GET_BANK_LIST]({commit}, _d) {
    let params = null
    if(_d) {
      params = {
        page: _d.page
      }
    }
    
    let res = await apiHub('get', 'api/v1/dropdown/bank', null, params)
    if(res.code === 200001) {
      commit(GOT_BANK_LIST, res.result)
    }
  },
  async [SET_PRIMARY_DEPOSIT_ACC]({commit, dispatch}, _d) {
    let res = await apiHub('put', `api/v1/deposit_account/active/${_d.id}`)
    if(res.code === 200001) {
      dispatch(GET_DEPOSIT_ACC_LIST)
    }
  },
  async [GET_DEPOSIT_ACC_LIST]({commit}, _d) {
    let params = null
    if(_d) {
      params = {
        page: _d.page
      }
    }
    
    let res = await apiHub('get', 'api/v1/deposit_account', null, params)
    if(res.code === 200001) {
      commit(GOT_DEPOSIT_ACC_LIST, res.result)
    }
  },
  async [ADD_DEPOSIT_ACC]({commit, dispatch}, _d) {
    let data = {
      code: _d.bankCode,
      branch: _d.branchName,
      name: _d.accountName,
      account: _d.bankAccount,
    }
    let res = await apiHub('post', 'api/v1/deposit_account', data)
    if(res.code === 200001) {
      dispatch(GET_DEPOSIT_ACC_LIST)
      commit(SWITCH_DEPOSIT_ACC_DIALOG, false)
      
    }
  },
  async [EDIT_DEPOSIT_ACC]({commit, dispatch}, _d) {
    let data = {
      code: _d.bankCode,
      branch: _d.branchName,
      name: _d.accountName,
      account: _d.bankAccount,
    }
    let res = await apiHub('put', `api/v1/deposit_account/${_d.id}`, data)
    if(res.code === 200001) {
      dispatch(GET_DEPOSIT_ACC_LIST)
      commit(SWITCH_DEPOSIT_ACC_DIALOG, false)
      
    }
  },
  async [DEL_DEPOSIT_ACC]({commit, dispatch}, id) {
    let res = await apiHub('delete', `api/v1/deposit_account/${id}`)
    if(res.code === 200001) {
      dispatch(GET_DEPOSIT_ACC_LIST)
      
    }
  },
}

export default actions