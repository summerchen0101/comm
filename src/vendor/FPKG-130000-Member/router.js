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
  title: "會員管理細項",
  props: {funcKey: 1101},
  component: () => import('./component/MemberManage/MemberDetail.vue')
}

export const MemberSearch = {
  path: '/member/search',
  name: 'MemberManage',
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
  redirect: "/member/manage",
  children: [
    MemberManage,
    MemberDetail,
    MemberSearch,
    BankAcc,
  ]
}