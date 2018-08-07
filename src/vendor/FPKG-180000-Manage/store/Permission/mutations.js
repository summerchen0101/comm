

import { 
  SET_FIXED_PERMISSION_MENU, 
  GOT_DEFAULT_PERMISSION_MENU,
  GOT_PERMISSION_GROUP_LIST,
  GOT_PERMISSION,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [SET_FIXED_PERMISSION_MENU](state, menu) {
    state.fixedPerMenu = menu
  },
  [GOT_DEFAULT_PERMISSION_MENU](state, menu) {
    state.defaultMenu = menu
  },
  [GOT_PERMISSION_GROUP_LIST](state, result) {
    state.perGroupList = result.data.map(t => ({
      id: t.id,
      name: t.name,
      count: t.user_count,
      createdAt: t.created_at,
      operation: t.operation,
    }))
    state.perGroupPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_PERMISSION](state, result) {
    state.permission = result
  },
}

export default mutations