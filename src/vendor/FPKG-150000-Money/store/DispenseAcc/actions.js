
import { 
  GET_DISPENSE_ACC_LIST,
  GOT_DISPENSE_ACC_LIST,
  ADD_DISPENSE_ACC,
  EDIT_DISPENSE_ACC,
  DEL_DISPENSE_ACC,
  SWITCH_DISPENSE_ACC_DIALOG,
  GET_BANK_LIST,
  GOT_BANK_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_DISPENSE_ACC_LIST]({commit}, _d) {
    let params = null
    if(_d) {
      params = {
        page: _d.page
      }
    }
    
    let res = await apiHub('get', 'api/v1/dispense_account', null, params)
    if(res.code === 200001) {
      commit(GOT_DISPENSE_ACC_LIST, res.result)
    }
  },
  async [ADD_DISPENSE_ACC]({commit, dispatch}, _d) {
    let data = {
      code: _d.bankCode,
      branch: _d.branchName,
      name: _d.accountName,
      account: _d.bankAccount,
    }
    let res = await apiHub('post', 'api/v1/dispense_account', data)
    if(res.code === 200001) {
      dispatch(GET_DISPENSE_ACC_LIST)
      commit(SWITCH_DISPENSE_ACC_DIALOG, false)
      
    }
  },
  async [EDIT_DISPENSE_ACC]({commit, dispatch}, _d) {
    let data = {
      code: _d.bankCode,
      branch: _d.branchName,
      name: _d.accountName,
      account: _d.bankAccount,
    }
    let res = await apiHub('put', `api/v1/dispense_account/${_d.id}`, data)
    if(res.code === 200001) {
      dispatch(GET_DISPENSE_ACC_LIST)
      commit(SWITCH_DISPENSE_ACC_DIALOG, false)
      
    }
  },
  async [DEL_DISPENSE_ACC]({commit, dispatch}, id) {
    let res = await apiHub('delete', `api/v1/dispense_account/${id}`)
    if(res.code === 200001) {
      dispatch(GET_DISPENSE_ACC_LIST)
      
    }
  },
}

export default actions