import {
  GET_ADULT_MANAGE,
  GOT_ADULT_MANAGE,
  SET_ADULT_MANAGE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time'

import Router from '@/router'

const actions = {
  async [GET_ADULT_MANAGE]({commit}) {
    let res = await apiHub("get", "api/v1/social/adult")
    if(res.code === 200001) {
      commit(GOT_ADULT_MANAGE, res.result)
    }
  },
  async [SET_ADULT_MANAGE]({commit}, _d) {
    let data ={
      active: _d.status,
      open_at: toDateTime(_d.openAt),
      webcast_url: _d.urlOnOpen,
      redirect_url: _d.urlOnClose,
    }
    let res = await apiHub("put", "api/v1/social/adult", data)
    if(res.code === 200001) {
      Router.app.$message({
        message: '資料更新成功',
        duration: 2000,
      });
    }
  }
}

export default actions
