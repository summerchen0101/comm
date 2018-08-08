
import { 
  GET_MEMBER_LIST,
  GOT_MEMBER_LIST,
  VERIFY_MEMBER,
  GOT_VERIFY_INFO,
  SWITCH_MEMBER_DIALOG,
  ADD_MEMBER,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_MEMBER_LIST]({commit}, _d = {}) {
    let params = {
      account: _d.account,
      mobile: _d.phone,
      active: _d.status,
      page: _d.page,
    }
    let res = await apiHub("get", "api/v1/member", null, params)
    if(res.code === 200001) {
      commit(GOT_MEMBER_LIST, res.result)
    }
  },
  async [VERIFY_MEMBER]({commit, dispatch}, id) {
    let res = await apiHub("put", `api/v1/member/${id}/verify`)
    if(res.code === 200001) {
      await dispatch(GET_MEMBER_LIST)
      commit(GOT_VERIFY_INFO, res.result)
    }
  },
  async [ADD_MEMBER]({commit, dispatch}, _d) {
    let data = {
      mobile: _d.phone,
      password: _d.pw,
      password_confirmation: _d.pw_confirm,
    }
    let res = await apiHub("post", "api/v1/member", data)
    if(res.code === 200001) {
      commit(SWITCH_MEMBER_DIALOG, false)
      Router.push({name: "MemberDetail", params: {id: res.result.id, acc: res.result.account}})
    }
  },
}

export default actions