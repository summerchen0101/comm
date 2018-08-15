

import { 
  GOT_SINGLE_MEMBER
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_SINGLE_MEMBER](state, result) {
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
      dialyDepositLimit: result.info.daily_deposit_limit, // 單日存款限額
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
      withdrawPoint: result.credit.withdrawal_brokerage, // 已提領佣金
      memberResult: result.credit.payoff, // 會員結果
      unCheckBetting: result.credit.bet_amount_pending, // 未結帳投注
      pointVerify: result.credit.balance_verify, // 點數驗證
    }
    state.commissionInfo = {
      totalValidityBetting: result.brokerage.total_feat, // 本週總有效投注額
      selfValidityBetting: result.brokerage.feat, // 本週個人有效投注額
      directValidityBetting: result.brokerage.downline_feat, // 本週直屬總有效投注額
      commisionUnit: {
        "1": "700.0000",
        "2": "600.0000"
    }
, // 當前每萬元返還
      totalCommision: result.brokerage.total_brokerage, // 本週總佣金
      allowCommision: result.brokerage.brokerage, // 可提領佣金
    }
    state.bankAccInfo = result.bank_account_info.map(b => ({
      bankAccount: b.bank_account,
      status: b.status,
    }))
  }
}

export default mutations