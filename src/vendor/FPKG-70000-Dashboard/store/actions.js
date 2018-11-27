import { GET_USER_INFO,
  GET_TODAY_LIST,
  GOT_TODAY_LIST,
  SWITCH_TODAY_LOADING_STATUS,
 } from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'

const actions = {
  async [GET_TODAY_LIST]({commit}) {
    commit(SWITCH_TODAY_LOADING_STATUS, true)
    let res = await apiHub("get", "api/v1/home/today")
    if(res.code === 200001) {
      commit(GOT_TODAY_LIST, res.result)
      commit(SWITCH_TODAY_LOADING_STATUS, false)
    }
  }
}

export default actions