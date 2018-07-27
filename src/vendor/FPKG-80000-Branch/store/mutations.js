

import { 
  SET_BRANCH_INFO,
  GOT_BRANCH_LIST, 
  GOT_BRANCH, 
  SWITCH_BRANCH_DIALOG 
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'
import { branchDomain, fakeDomain } from '@/vendor/FPKG-10000-Config/branch'

const mutations = {
  [SET_BRANCH_INFO](state, bchInfo) {
    state.bchInfo = bchInfo
  },

  // 站台列表
  [GOT_BRANCH_LIST](state, data) {
    state.branchList = data.list.map(t => ({
      guid: t.p3_bch_guid,
      code: t.p3_bch_code,
      name: t.p3_bch_name,
      status: t.p3_bch_status,
    }))
    state.branchListPaginator = data.paginator
  },
  [GOT_BRANCH](state, _branch) {
    let files = _branch.p7_file
    // guid: "",
    // code: "",
    // name: "",
    // status: true,
    // allowRegister: "y", // 允許註冊 必填,{in:y,n}
    // subsidiaries: 0, // 分公司數量 0~200
    // yearType: 1, // 年份類型	必填,{in:1,2}
    // memo: "", // 不可超過200字	
    // logoFile: null, // fileGuid,
    // domains: [
    //   Object.assign({}, initDomain)
      // domain: "",
      // isHttps: "n",
      // memo: 
    // ],
    // primaryDoaminIndex: 0
    let f = _branch.p7_file
    state.branch = {
      guid: _branch.p3_bch_guid,
      code: _branch.p3_bch_code,
      name: _branch.p3_bch_name,
      status: _branch.p3_bch_status == 3,
      allowRegister: _branch.p3_bch_allow_register,
      subsidiaries: _branch.p3_bch_subsidiaries,
      yearType: _branch.p3_bch_year_type,
      memo: _branch.p3_bch_memo,
      logoFile: f ? {
        guid: f.p7_file_guid,
        name: f.p7_file_source_name,
        url: `http://${branchDomain}/${f.p7_file_folder}/${f.p7_file_name}`
      } : null,
      domains: _branch.p3_branch_domain.map(dm =>({
        domain: dm.p3_bdn_domain,
        isHttps: dm.p3_bdn_https,
        memo: dm.p3_bdn_memo
      }))
    }
  },
  [SWITCH_BRANCH_DIALOG](state, status) {
    state.dialogVisible = status
    EventsHub.$emit("branch:clearBranchForm")
  },
}

export default mutations