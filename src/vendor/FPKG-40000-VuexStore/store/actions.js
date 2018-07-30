
import { 
  GET_BANK_LIST,
  GOT_BANK_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_BANK_LIST]({commit}) {
    let res = await apiHub('get', 'api/v1/dropdown/bank')
    if(res.code === 200001) {
      commit(GOT_BANK_LIST, res.result)
    }
  },
}

export default actions