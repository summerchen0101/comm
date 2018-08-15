
import { 
  GET_SINGLE_MEMBER,
  GOT_SINGLE_MEMBER,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_SINGLE_MEMBER]({commit}, _d) {
    let params = {
      account: _d.type === 'account' ? _d.account : undefined,
      mobile: _d.type === 'phone' ? _d.phone : undefined,
    }
    let res = await apiHub("get", "api/v1/member_search", null, params)
    if(res.code === 200001) {
      commit(GOT_SINGLE_MEMBER, res.result)
    }
  },
}

export default actions