import {getPath} from '@/vendor/FPKG-120000-Util/menu'

export const MemberManage = {
  path: '/member/manage',
  name: 'MemberManage',
  title: "會員管理",
  props: {funcKey: 1101},
  component: () => import('./component/MemberManage/MemberManage.vue')
}
export const MemberDetail = {
  path: '/member/manage/:id/:acc',
  name: 'MemberDetail',
  title: "會員編輯",
  props: {funcKey: 1101},
  component: () => import('./component/MemberManage/MemberDetail.vue')
}
export const MemberGame = {
  path: '/member/manage/:id/:acc/game',
  name: 'MemberGame',
  title: "會員遊戲設定",
  props: {funcKey: 1101},
  component: () => import('./component/MemberManage/MemberGame.vue'),
}

export const MemberSearch = {
  path: '/member/search',
  name: 'MemberSearch',
  title: "會員搜尋",
  props: {funcKey: 1102},
  component: () => import('./component/MemberSearch/MemberSearch.vue')
}

export const BankAcc = {
  path: '/member/bank',
  name: 'BankAcc',
  title: "銀行帳戶管理",
  props: {funcKey: 1103},
  component: () => import('./component/BankAcc/BankAcc.vue')
}

export const Member = {
  path: '/member',
  name: 'Member',
  title: "會員資訊",
  props: {funcKey: 11},
  component: () => import('./component/Member.vue'),
  redirect: () => getPath(11),
  children: [
    MemberManage,
    MemberDetail,
    MemberGame,
    MemberSearch,
    BankAcc,
  ]
}

// opens
export const MemberAllowCommission = {
  path: '/member/allow-commission/:id/:acc/:nick',
  name: 'MemberAllowCommission',
  title: "會員搜尋:可提領佣金列表",
  props: {funcKey: 1102},
  component: () => import('./component/MemberSearch/opens/AllowCommission.vue')
}
export const MemberWithdrawnCommission = {
  path: '/member/withdrawn-commission/:id/:acc/:nick',
  name: 'MemberWithdrawnCommission',
  title: "會員搜尋:已提領佣金列表",
  props: {funcKey: 1102},
  component: () => import('./component/MemberSearch/opens/WithdrawnCommission.vue')
}
export const MemberAddedPoint = {
  path: '/member/added-point/:id/:acc/:nick',
  name: 'MemberAddedPoint',
  title: "會員搜尋:撥點列表",
  props: {funcKey: 1102},
  component: () => import('./component/MemberSearch/opens/AddedPoint.vue')
}
export const MemberSubtractedPoint = {
  path: '/member/subtracted-point/:id/:acc/:nick',
  name: 'MemberSubtractedPoint',
  title: "會員搜尋:扣點列表",
  props: {funcKey: 1102},
  component: () => import('./component/MemberSearch/opens/SubtractedPoint.vue')
}
export const MemberDirectMembers = {
  path: '/member/direct-member/:id/:acc/:nick/:count',
  name: 'MemberDirectMembers',
  title: "會員搜尋:直屬會員列表",
  props: {funcKey: 1102},
  component: () => import('./component/MemberSearch/opens/DirectMembers.vue')
}
export const MemberUpperMembers = {
  path: '/member/upper-member/:id/:acc/:nick/:count',
  name: 'MemberUpperMembers',
  title: "會員搜尋:代理會員列表",
  props: {funcKey: 1102},
  component: () => import('./component/MemberSearch/opens/UpperMembers.vue')
}
