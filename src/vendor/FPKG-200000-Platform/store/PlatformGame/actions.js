import {
  GET_GAME_MAINTENANCE_LIST,
  GOT_GAME_MAINTENANCE_LIST,
  SET_GAME_MAINTENANCE_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time'

import Router from '@/router'

const actions = {
  async [GET_GAME_MAINTENANCE_LIST]({commit}) {
    let res = await apiHub("get", "api/v1/game/maintenance")
    if(res.code === 200001) {
      commit(GOT_GAME_MAINTENANCE_LIST, res.result)
    }
  },
  async [SET_GAME_MAINTENANCE_LIST]({commit}, setting) {
    let data = {
      game_setting: setting.map(t => ({
        ...t,
        open_at: t.active === 2 ? toDateTime(t.open_at) : ""
      }))
    }
    let res = await apiHub("put", "api/v1/game/maintenance", data)
    if(res.code === 200001) {
      Router.app.$message({
        message: '資料更新成功',
        duration: 2000,
      });
    }
  },
}

export default actions
