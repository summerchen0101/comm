

import { 
  GOT_DEPOSIT_STATUS_LIST, 
  GOT_DEPOSIT_INFO,
  GOT_DEPOSIT_LIST,
  SWITCH_DEPOSIT_DIALOG,
  SET_DEPOSIT,
  CHANGED_LIST_TYPE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { payType } from '@/vendor/FPKG-10000-Config/enum'

const mutations = {
  [GOT_DEPOSIT_LIST](state, result) {
    state.depositList = result.data.map(t => {
      let bankInfo = t.operation_bank_info
      let payTypeIndex = payType.findIndex(opt => opt.value == t.payway_id)
      return {
        id: t.id,
        number: t.no,
        account: t.account,
        nick: t.nickname,
        payType: payTypeIndex > -1 ? payType[payTypeIndex].label : '-',
        depositPoint: t.credit,
        reason: t.reason,
        operator: t.review_user,
        depositAt: t.deposit_at,
        expireAt: t.expire_at,
        bankInfo: {
          bankCode: `${bankInfo.code}-${bankInfo.bank}`,
          branchName: bankInfo.branch,
          accountName: bankInfo.name,
          bankAccount: bankInfo.account,
        }
      }
    })
    state.depositPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [SET_DEPOSIT](state, deposit) {
    state.deposit = Object.assign({}, state.deposit, deposit)
  },
  [GOT_DEPOSIT_STATUS_LIST](state, statusList) {
    state.depositStatusList = statusList
  },
  [GOT_DEPOSIT_INFO](state, info) {
    state.depositInfo = Object.assign({}, state.depositInfo,{
      count: info.credit_count,
      total: info.credit_total,
    })
  },
  [SWITCH_DEPOSIT_DIALOG](state, status) {
    state.depositDialogVisible = status
  },
  [CHANGED_LIST_TYPE](state, status) {
    state.listType = status
  },
}

export default mutations