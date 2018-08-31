
import { 
  GET_OPERATING_OPTIONS,
  GOT_OPERATION_OPTIONS,
  GET_OPERATING_LOG_LIST,
  GOT_OPERATING_LOG_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time'


import Router from '@/router'

const actions = {
  async [GET_OPERATING_OPTIONS]({commit}) {
    let res = await apiHub("get", "api/v1/dropdown/operation")
    if(res.code === 200001) {
      commit(GOT_OPERATION_OPTIONS, res.result)
    }
  },
  async [GET_OPERATING_LOG_LIST]({commit}, _d) {
    let params = {
      start_at: toDateTime(_d.startAt),
      end_at: toDateTime(_d.endAt),
      user_id: _d.users,
      func_key: _d.funcTargets,
      page: _d.page || 1
    }
    let res = await apiHub("get", "api/v1/user_operation", null, params)
    if(res.code === 200001) {
      commit(GOT_OPERATING_LOG_LIST, res.result)
    }
  },

}

export default actions