
import { 
  GET_THEME_LIST, 
  GOT_THEME_LIST, 
  GET_THEME, 
  ADD_THEME, 
  GOT_THEME, 
  EDIT_THEME,
  DEL_THEME,
  SWITCH_THEME_DIALOG,
  UPLOAD_THEME_FILE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { Vcode } from '@/vendor/FPKG-120000-Util/customValidate';


import Router from '@/router'

const actions = {
  async [GET_THEME_LIST]({commit}) {
    let res = await apiHub("get", "theme/basic/lists")
    if(res.code === 0) {
      commit(GOT_THEME_LIST, res.response)
    }
  },
  async [ADD_THEME]({commit, dispatch}, _d) {
    let data = {
      p8_tme_code: _d.code,
      p8_tme_name: _d.name,
      p8_tme_status: _d.status ? '3' : '-2',
      p7_file_guid: _d.files.map(f => f.guid)
    }
    let res = await apiHub("post", "theme/basic/create", data)
    if(res.code === 0) {
      commit(SWITCH_THEME_DIALOG, false)
      dispatch(GET_THEME_LIST)
    }
  },
  async [GET_THEME]({commit}, _d) {
    let params = {p8_tme_guid: _d.guid}
    let res = await apiHub("get", "theme/basic/modify", null, params)
    if(res.code === 0) {
      commit(GOT_THEME, res.response)
      commit(SWITCH_THEME_DIALOG, true)
    }
  },
  async [DEL_THEME]({commit, dispatch}, _d) {
    let params = {p8_tme_guid: _d.guid}
    let res = await apiHub("delete", "theme/basic/delete", null, params)
    if(res.code === 0) {
      // commit(SWITCH_THEME_DIALOG, false)
      dispatch(GET_THEME_LIST)
    }
  },
  async [EDIT_THEME]({commit, dispatch}, _d) {
    let data = {
      p8_tme_guid: _d.guid,
      p8_tme_code: _d.code,
      p8_tme_name: _d.name,
      p8_tme_status: _d.status ? '3' : '-2',
      p7_file_guid: _d.files.map(f => f.guid)
    }
    let res = await apiHub("put", "theme/basic/doModify", data)
    if(res.code === 0) {
      commit(SWITCH_THEME_DIALOG, false)
      dispatch(GET_THEME_LIST)
    }
  },
  async [UPLOAD_THEME_FILE]({commit, dispatch}, data) {
    let res = await apiHub("post", "theme/basic/uploadPreview", data)
    if(res.code === 0) {
      console.log("上傳成功")
    }
  },
}

export default actions