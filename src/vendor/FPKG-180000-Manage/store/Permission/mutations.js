import { 
  SET_FIXED_PERMISSION_MENU, 
  GOT_DEFAULT_PERMISSION_MENU,
  GOT_PERMISSION_GROUP_LIST,
  GOT_PERMISSION,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [SET_FIXED_PERMISSION_MENU](state, menu) {
    state.fixedPerMenu = menu.reduce((arr, obj) => {
      arr = arr.concat(obj)
      if(obj.menu.length > 0) {
        arr = arr.concat(obj.menu)
      }
      return arr
    }, [])
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
      updatedAt: t.updated_at,
      operation: t.operation,
      allowModify: t.act,
    }))
    state.perGroupPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_PERMISSION](state, result) {
    state.permission = {
      ...result,
      permissions: result.permissions.filter(t => t.func_key > 99) // 過濾掉母選單，已免element-ui的tree自動勾選母選單下所有子選單
    }
  },
}

export default mutations