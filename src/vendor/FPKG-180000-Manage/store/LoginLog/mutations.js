

import {
  GOT_LOGIN_LOG_LIST,
  CLEAR_LOGIN_LOG_LIST
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { loginStatus } from '@/vendor/FPKG-10000-Config/enum.js'

const mutations = {
  [GOT_LOGIN_LOG_LIST](state, result) {
    state.loginList = result.data.map(t => {
      let statusIndex = loginStatus.findIndex(opt=> opt.value == t.status)
      return {
        id: t.id,
        account: t.user_account,
        nick: t.user_name,
        time: t.updated_at,
        ip: t.login_ip || '-',
        area: t.area || '-',
        status: t.status,
        statusName: statusIndex > -1 ? loginStatus[statusIndex].label : '?',
      }
    })
    state.loginPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [CLEAR_LOGIN_LOG_LIST](state) {
    state.loginList = null
    state.loginPager = null
  }
}

export default mutations