
import { 
  GET_USER_OPTIONS,
  GOT_USER_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_USER_OPTIONS]({commit}) {
    let res = await apiHub("get", "api/v1/dropdown/user")
    if(res.code === 200001) {
      commit(GOT_USER_OPTIONS, res.result)
    }
  },

}

export default actions