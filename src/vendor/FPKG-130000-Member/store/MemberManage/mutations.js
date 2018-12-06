

import { 
  GOT_MEMBER_SEARCH_KEY,
  GOT_MEMBER_SEARCH_LIST,
  FINISH_MEMBER_SEARCH_LIST,
  GOT_MEMBER_LIST, 
  GOT_VERIFY_INFO,
  CLOSE_VERIFY_DIALOG,
  SWITCH_MEMBER_DIALOG,
  GOT_MEMBER,
  SWITCH_POINT_DIALOG,
  SET_MEMBER_POINT_MODIFY,
  CLEAR_MEMBER_POINT_MODIFY,
  GOT_MEMBER_GAME_SETTING,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import Router from '@/router'
import EventsHub from '@/vendor/FPKG-60000-EventsHub/EventsHub'

const mutations = {
  [GOT_MEMBER_SEARCH_KEY](state, key) {
    state.memberSearchKey = key
  },
  [GOT_MEMBER_SEARCH_LIST](state, result) {
    state.memberSearch = true
    if(Router.history.current.fullPath === "/member/manage"){
      state.memberSearch = false
    }
    state.memberList = result.data.map(t => ({
      id: t.id,
      account: t.account,
      nick: t.nickname,
      phone: t.mobile,
      point: t.balance,
      status: t.active,
      isVerified: t.mobile_verify,
      createdAt: t.created_at,
      operation: t.operation,
    }))
    state.memberPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [FINISH_MEMBER_SEARCH_LIST](state, result){
    state.memberSearch = false
  },
  [GOT_MEMBER_LIST](state, result) {
    state.memberSearch = false
    state.memberList = result.data.map(t => ({
      id: t.id,
      account: t.account,
      nick: t.nickname,
      phone: t.mobile,
      point: t.balance,
      status: t.active,
      isVerified: t.mobile_verify,
      createdAt: t.created_at,
      operation: t.operation,
    }))
    state.memberPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_VERIFY_INFO](state, result) {
    state.verifyInfo = {
      account: result.account,
      password: result.password
    }
    state.displayVerifyDialog = true
  },
  [CLOSE_VERIFY_DIALOG](state) {
    state.displayVerifyDialog = false
  },
  [SWITCH_MEMBER_DIALOG](state, status) {
    state.dialogVisible = status
  },
  [SWITCH_POINT_DIALOG](state, status) {
    state.pointDialogVisible = status
    if(!status) {
      // 延遲0.5秒 避免彈跳匡fadeOut前,裡面的顯示字從撥點變扣點
      setTimeout(() => {
        Router.push({...Router.app.$route, query: {}})
      }, 500)
    }
  },
  [GOT_MEMBER](state, result) {
    state.member = {
      account: result.account,
      nick: result.nickname,
      status: result.active,
      point: result.balance,
      phone: result.mobile,
      lineID: result.line_id,
      memberDepositLimit: result.member_deposit_limit_id,

      allowSettingLevel: result.brokerage_level_active_lock == "enable",
      isLevelActive: result.brokerage_level_active == 1,
      startLevel: result.brokerage_level_id,
      commisionStartAt: result.brokerage_start,
      commisionEndAt: result.brokerage_end,

      memo: result.remark,

      bankAccList: result.bank_account_info.map(t => ({
        bankCode: t.code,
        bankName: t.bank,
        branchName: t.branch,
        createdAt: t.created_at,
        accountName: t.name,
        bankAccount: t.account,
        status: t.status
      })),
    }
  },
  [GOT_MEMBER_GAME_SETTING](state, result) {
    state.gameSetting = result.map(g => ({
      gameType: g.game_kind,
      status: g.switch,
      template: g.model,
      maxWin: g.max_win,
      minBet: g.min_bet,
      result: g.payoff,
      allowSetting: g.act == 'true',
      hasMaxWin: typeof g.max_win === 'number',
      hasMinBet: typeof g.min_bet === 'number'
    }))
  },
  [SET_MEMBER_POINT_MODIFY](state, _d) {
    state.pointModify[_d.type] = Object.assign({}, state.pointModify[_d.type], {
      point: Router.app.$numeral(_d.point).value(),
      memo: _d.memo
    })
    EventsHub.$emit("Member:pointModifyChanged")
  },
  [CLEAR_MEMBER_POINT_MODIFY](state) {
    state.pointModify = {
      add: {
        point: "",
        memo: "",
      },
      subtract: {
        point: "",
        memo: "",
      }
    }
  },
}

export default mutations