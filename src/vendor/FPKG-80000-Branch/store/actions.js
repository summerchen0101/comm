
import { 
  GET_BRANCH_INFO, 
  SET_BRANCH_INFO,
  GET_BRANCH_LIST, 
  GOT_BRANCH_LIST, 
  GET_BRANCH, 
  ADD_BRANCH, 
  GOT_BRANCH, 
  EDIT_BRANCH,
  DEL_BRANCH,
  SWITCH_BRANCH_DIALOG,
  UPLOAD_BRANCH_FILE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'
import { Vcode } from '@/vendor/FPKG-120000-Util/customValidate';
import Router from '@/router'

const actions = {

  // 站台資訊
  async [GET_BRANCH_INFO]({commit}) {
    let res = await apiHub("get", "branch/common/getBranch")
    if(res.code === 0) {
      commit(SET_BRANCH_INFO, res.response)
    }
  },

  // 站台列表
  async [GET_BRANCH_LIST]({commit}) {
    let res = await apiHub("get", "branch/setting/lists")
    if(res.code === 0) {
      commit(GOT_BRANCH_LIST, res.response)
    }
  },
  async [ADD_BRANCH]({commit, dispatch}, _d) {
    let data = {
      p3_bch_code: _d.code,
      p3_bch_name: _d.name,
      p3_bch_status: _d.status ? '3' : '-2',
      p3_bch_allow_register: _d.allowRegister,
      p3_bch_subsidiaries: _d.subsidiaries.toString(),
      p3_bch_year_type: _d.yearType,
      p3_bch_memo: _d.memo || undefined,
      p3_bch_logo: _d.logoFile ? _d.logoFile.guid : undefined,
      p3_branch_domain: _d.domains.map((dm ,i) => ({
        p3_bdn_domain: dm.domain,
        p3_bdn_https: dm.isHttps,
        p3_bdn_primary: _d.primaryDoaminIndex === i ? 'y' : 'n',
        p3_bdn_memo: dm.memo,
      }))
    }
    let res = await apiHub("post", "branch/setting/create", data)
    if(res.code === 0) {
      commit(SWITCH_BRANCH_DIALOG, false)
      dispatch(GET_BRANCH_LIST)
    }
  },
  async [GET_BRANCH]({commit}, _d) {
    let params = {p3_bch_guid: _d.guid}
    let res = await apiHub("get", "branch/setting/modify", null, params)
    if(res.code === 0) {
      commit(GOT_BRANCH, res.response)
      commit(SWITCH_BRANCH_DIALOG, true)
    }
  },
  async [DEL_BRANCH]({commit, dispatch}, _d) {
    let params = {p3_bch_guid: _d.guid}
    let res = await apiHub("delete", "branch/setting/delete", null, params)
    if(res.code === 0) {
      // commit(SWITCH_BRANCH_DIALOG, false)
      dispatch(GET_BRANCH_LIST)
    }
  },
  async [EDIT_BRANCH]({commit, dispatch}, _d) {
    let data = {
      p3_bch_guid: _d.guid,
      p3_bch_code: _d.code,
      p3_bch_name: _d.name,
      p3_bch_status: _d.status ? '3' : '-2',
      p3_bch_allow_register: _d.allowRegister,
      p3_bch_subsidiaries: _d.subsidiaries.toString(),
      p3_bch_year_type: _d.yearType,
      p3_bch_memo: _d.memo || undefined,
      p3_bch_logo: _d.logoFile ? _d.logoFile.guid : undefined,
      p3_branch_domain: _d.domains.map((dm ,i) => ({
        p3_bdn_domain: dm.domain,
        p3_bdn_https: dm.isHttps,
        p3_bdn_primary: _d.primaryDoaminIndex === i ? 'y' : 'n',
        p3_bdn_memo: dm.memo,
      }))
    }
    let res = await apiHub("put", "branch/setting/doModify", data)
    if(res.code === 0) {
      commit(SWITCH_BRANCH_DIALOG, false)
      dispatch(GET_BRANCH_LIST)
    }
  },

  async [UPLOAD_BRANCH_FILE]({commit, dispatch}, data) {
    let res = await apiHub("post", "branch/setting/uploadLogo", data)
    if(res.code === 0) {
      console.log("上傳成功")
    }
  },
}

export default actions