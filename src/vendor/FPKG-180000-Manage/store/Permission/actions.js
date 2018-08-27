
import { 
  CREATE_PERMISSION_GROUP,
  MODIFY_PERMISSION_GROUP,
  DEL_PERMISSION_GROUP,
  SET_FIXED_PERMISSION_MENU,
  GET_PERMISSION_GROUP_LIST,
  GOT_PERMISSION_GROUP_LIST,
  GET_DEFAULT_PERMISSION_MENU,
  GOT_DEFAULT_PERMISSION_MENU,
  GET_PERMISSION,
  GOT_PERMISSION,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_DEFAULT_PERMISSION_MENU]({commit}) {
    let res = await apiHub("get", "api/v1/group/permission")
    commit(GOT_DEFAULT_PERMISSION_MENU, res.result)
    commit(SET_FIXED_PERMISSION_MENU, res.result)
  },
  async [GET_PERMISSION_GROUP_LIST]({commit}, _d = {}) {
    let params = {
      page: _d.page,
      name: _d.name
    }
    let res = await apiHub("get", "api/v1/group", null, params)
    commit(GOT_PERMISSION_GROUP_LIST, res.result)
  },
  async [CREATE_PERMISSION_GROUP]({commit, rootState}, _d) {
    let data = {
      name: _d.name,
      permissions: _d.funcKeys.map(t => ({func_key: t})),
    }
    let res = await apiHub("post", "api/v1/group", data)
    if(res.code === 200001) {
      Router.push({name: 'Permission'})
    }
  },
  async [MODIFY_PERMISSION_GROUP]({commit, rootState}, _d) {
    let data = {
      name: _d.name,
      permissions: _d.funcKeys.map(t => ({func_key: t})),
    }
    let res = await apiHub("put", `api/v1/group/${_d.id}`, data)
    if(res.code === 200001) {
      Router.push({name: 'Permission'})
    }
  },
  async [GET_PERMISSION]({commit}, id) {
    let res = await apiHub("get", "api/v1/group")
    if(res.code === 200001) {
      let i = res.result.data.findIndex(t => t.id == id)
      if(i > -1) {
        commit(GOT_PERMISSION, res.result.data[i])
      }
      
    }
  },
  async [DEL_PERMISSION_GROUP]({commit, dispatch}, id) {
    let res = await apiHub('delete', `api/v1/group/${id}`)
    if(res.code === 200001) {
      dispatch(GET_PERMISSION_GROUP_LIST)
      
    }
  },
}

export default actions
