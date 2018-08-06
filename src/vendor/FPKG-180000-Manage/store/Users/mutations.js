

import { 
  GOT_USER_LIST, 
  GOT_IP_OPTIONS, 
  SWITCH_USER_DIALOG,
  GOT_PERMISSION_GROUP_OPTIONS,
  GOT_USER_STATUS_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_PERMISSION_GROUP_OPTIONS](state, list) {
    state.perGroupOpts = list
  },
  [GOT_IP_OPTIONS](state, list) {
    state.ipOpts = list
  },
  [GOT_USER_STATUS_OPTIONS](state, list) {
    state.statusOpts = list
  },
  [GOT_USER_LIST](state, result) {
    state.userList = result.data.map(t => ({
      id: t.id,
      account: t.account,
      nick: t.name,
      group: t.group,
      permission: t.group.name,
      loginAt: t.login_at || "-",
      createdAt: t.created_at,
      status: t.active,
      operation: t.operation,
    }))
    state.userPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },

  [SWITCH_USER_DIALOG](state, status) {
    state.dialogVisible = status
    EventsHub.$emit("Manage:clearUserForm")
  },
}

export default mutations