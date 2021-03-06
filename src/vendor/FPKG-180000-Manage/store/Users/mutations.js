

import { 
  GOT_USER_LIST, 
  GOT_IP_OPTIONS, 
  SWITCH_USER_DIALOG,
  GOT_PERMISSION_GROUP_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'
import { status as statusOpts } from '@/vendor/FPKG-10000-Config/enum'

const mutations = {
  [GOT_PERMISSION_GROUP_OPTIONS](state, list) {
    state.perGroupOpts = list
  },
  [GOT_IP_OPTIONS](state, list) {
    state.ipOpts = list
  },
  [GOT_USER_LIST](state, result) {
    state.userList = result.data.map(t => {
      let statusIndex = statusOpts.findIndex(opt => opt.value == t.active)
      return {
        id: t.id,
        account: t.account,
        nick: t.name,
        group: t.group,
        permission: t.group,
        loginAt: t.login_at,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
        status: t.active,
        statusName: statusIndex > -1 ? statusOpts[statusIndex].label : '?',
        ip: t.ip.map(t => t.id),
        operation: t.operation,
      }
    })
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