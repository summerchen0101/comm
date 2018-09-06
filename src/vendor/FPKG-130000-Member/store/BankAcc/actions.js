
import {
  GET_BANK_ACC_LIST,
  GOT_BANK_ACC_LIST,
  EDIT_BANK_ACC,
  SWITCH_BANK_ACC_DIALOG,
  CHANGE_BANK_ACC_LIST_TYPE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'


import Router from '@/router'

const actions = {
  async [GET_BANK_ACC_LIST]({commit}, _d = {}) {
    let params = {
      account: _d.account || undefined,
      bank_account: _d.bankAccount || undefined,
      page: _d.page || 1,
    }
    let res = await apiHub("get", `api/v1/bank_account/${_d.status}/list`, null, params)
    if(res.code === 200001) {
      commit(CHANGE_BANK_ACC_LIST_TYPE, _d.status)
      commit(GOT_BANK_ACC_LIST, res.result)
    }
  },
  async [EDIT_BANK_ACC]({commit, dispatch, rootState}, _d = {}) {
    let confirm = {
      code: _d.bankCode,
      branch: _d.branchName,
      account: _d.bankAccount,
      name: _d.accountName,
    }
    let data = {
      review_user_id: rootState.Account.userInfo.id,
      action: _d.action === 'confirm' ? 1 : 2,
      reason: _d.action === 'cancel' ?  _d.reason : undefined,
      ..._d.action === 'confirm' ? confirm : {}
    }
    let res = await apiHub("put", `api/v1/bank_account/${_d.id}`, data)
    if(res.code === 200001) {
     commit(SWITCH_BANK_ACC_DIALOG, false)
     EventsHub.$emit("Member:BankAcc:updateList")
    }
  },

}

export default actions