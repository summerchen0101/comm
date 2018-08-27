

import { 
  GOT_SINGLE_MEMBER,
  GOT_ALLOW_COMMISSION_LIST,
  GOT_WITHDRAWN_COMMISSION_LIST,
  GOT_DIRECT_MEMBER_LIST,
  GOT_UPPER_MEMBER_LIST,
  GOT_ADDED_POINT_LIST,
  GOT_SUBTRACTED_POINT_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_SINGLE_MEMBER](state, result) {
    state.isSearched = true
    state.personalInfo = {
      id: result.info.id,
      account: result.info.account,
      nick: result.info.nickname,
      phone: result.info.mobile,
      isMobileVerified: result.info.mobile_verify,
      lineID: result.info.line_id,
      status: result.info.active,
      startLevel: result.info.level, // 會員起始級別
      directMembers: result.info.parent_member_count, // 直屬會員數量
      upperMembers: result.info.upper_member_count, // 代理會員數量
      dialyDepositLimit: result.info.member_deposit_limit_id, // 會員存款條件
      createdAt: result.info.created_at,
      loginAt: result.info.login_at,
      loginIP: result.info.login_ip,
      memo: result.info.remark,
    }
    state.pointInfo = {
      point: result.credit.balance, // 目前點數
      savedPoint: result.credit.deposit_credit, // 已入帳存款
      addedPoint: result.credit.earn_point, // 撥點
      subtractedPoint: result.credit.lost_point, // 扣點
      applyPoint: result.credit.withdrawal_credit_apply, // 申請中提款
      dispensePoint: result.credit.dispense_credit, // 出款
      withdrawnCommission: result.credit.withdrawal_brokerage, // 已提領佣金
      memberResult: result.credit.payoff, // 會員結果
      unCheckBetting: result.credit.bet_amount_pending, // 未結帳投注
      pointVerify: result.credit.balance_verify, // 點數驗證
    }
    state.commissionInfo = {
      totalValidityBetting: result.brokerage.total_feat, // 本週總有效投注額
      selfValidityBetting: result.brokerage.feat, // 本週個人有效投注額
      directValidityBetting: result.brokerage.downline_feat, // 本週直屬總有效投注額
      commisionUnit: {
        A: result.brokerage.feedback['1'],
        B: result.brokerage.feedback['2'],
      }, // 當前每萬元返還
      totalCommision: result.brokerage.total_brokerage, // 本週總佣金
      allowCommision: result.brokerage.brokerage, // 可提領佣金
    }
    state.bankAccInfo = result.bank_account_info.map(b => ({
      bankAccount: b.bank_account,
      status: b.status,
    }))
  },
  [GOT_ALLOW_COMMISSION_LIST](state, result) {
    state.allowCommissionList = result.data.map(t => ({
      startAt: t.start,
      endAt: t.end,
      selfValidityBetting: t.feat,
      totalValidityBetting: t.total_feat,
      allowCommision: t.brokerage,
      totalCommision: t.total_brokerage,
    }))
    state.allowCommissionPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_WITHDRAWN_COMMISSION_LIST](state, result) {
    state.withdrawnCommissionList = result.data.map(t => ({
      point: t.credit,
      createdAt: t.created_at,
    }))
    state.withdrawnCommissionPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_DIRECT_MEMBER_LIST](state, result) {
    state.directMemberList = result.data.map(t => ({
      id: t.id,
      account: t.account,
      nick: t.nickname,
      phone: t.mobile,
      status: t.active,
      createdAt: t.created_at,
      selfValidityBetting: t.feat,
      allowCommision: t.brokerage,
    }))
    state.directMemberPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_UPPER_MEMBER_LIST](state, result) {
    state.upperMemberList = result.data.map(t => ({
      id: t.id,
      account: t.account,
      nick: t.nickname,
      phone: t.mobile,
      status: t.active,
      createdAt: t.created_at,
      selfValidityBetting: t.feat,
      allowCommision: t.brokerage,
    }))
    state.upperMemberPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_ADDED_POINT_LIST](state, result) {
    state.addedPointList = result.data.map(t => ({
      point: t.balance,
      createdAt: t.created_at,
      memo: t.reason || "-",
      operator: t.review_user,
    }))
    state.addedPointPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
  [GOT_SUBTRACTED_POINT_LIST](state, result) {
    state.subtractedPointList = result.data.map(t => ({
      point: t.balance,
      createdAt: t.created_at,
      memo: t.reason || "-",
      operator: t.review_user,
    }))
    state.subtractedPointPager = {
      page: result.current_page,
      count: result.total,
      totalPages: result.last_page,
      perpage: result.per_page,
    }
  },
}

export default mutations