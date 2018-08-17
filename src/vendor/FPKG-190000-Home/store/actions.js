
import { 
  GET_REVIEW_LIST,
  GOT_REVIEW_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_REVIEW_LIST]({commit}) {
    let res = await apiHub("get", "api/v1/home")
    if(res.code === 200001) {
      commit(GOT_REVIEW_LIST, res.result)
    }
  }
}

export default actions