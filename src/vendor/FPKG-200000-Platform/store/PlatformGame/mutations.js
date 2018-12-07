

import {
  GOT_GAME_MAINTENANCE_LIST
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { toDateTime } from '@/vendor/FPKG-120000-Util/time'
import Router from '@/router'

const mutations = {
  [GOT_GAME_MAINTENANCE_LIST](state, result) {
    state.gameMaintenanceList = result.map(t => ({
      ...t,
      open_at: t.open_at || Router.app.$moment(new Date()).add(1, 'hours')
    }))
  }
}

export default mutations