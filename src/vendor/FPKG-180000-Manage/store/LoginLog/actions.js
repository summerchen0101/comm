
import { 
  GET_LOGIN_LOG_LIST,
  GOT_LOGIN_LOG_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_LOGIN_LOG_LIST]({commit}, _d) {
    let params = {
      start_at: _d.startAt,
      end_at: _d.endAt,
      user_id: _d.users,
      func_key: _d.funcTargets,
      page: _d.page || 1
    }
    let res = await apiHub("get", "api/v1/user_login", null, params)
    if(res.code === 200001) {
      commit(GOT_LOGIN_LOG_LIST, res.result)
    }
  },

}

export default actions