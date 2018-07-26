
import { 
  CHANGE_LOGIN_STATUS, 
  SET_USER_INFO, 
  CLEAR_SESSION, 
  CLEAR_USER_INFO,
  GOT_ACCOUNT_LIST, 
  GOT_ACCOUNT, 
  SWITCH_ACCOUNT_DIALOG 
} from '@/vendor/FPKG-40000-VuexStore/constants'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [CHANGE_LOGIN_STATUS](state, status) {
    state.isLogin = status
  },
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [CLEAR_USER_INFO](state, userInfo) {
    state.userInfo = {}
  },
  [CLEAR_SESSION](state) {
    // CLEAR_SESSION
  },

  // 帳號列表
  [GOT_ACCOUNT_LIST](state, data) {
    if(data.list === null) {
      state.accountList = []
    } 
    else {
      state.accountList = data.list.map(t => ({
        guid: t.p5_ant_guid,
        code: t.p5_ant_code,
        name: t.p5_ant_name,
        status: t.p5_ant_status,
      }))
    }
    state.accountListPaginator = data.paginator
  },
  [GOT_ACCOUNT](state, _account) {
    let files = _account.p7_file
    state.account = {
      guid: _account.p5_ant_guid,
      code: _account.p5_ant_code,
      name: _account.p5_ant_name,
      status: _account.p5_ant_status == 3,
    }
  },
  [SWITCH_ACCOUNT_DIALOG](state, status) {
    state.createDialogVisible = status
    EventsHub.$emit("account:clearAccountForm")
  },
}

export default mutations