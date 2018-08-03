export const MemberReport = {
  path: '/report/member',
  name: 'MemberReport',
  title: "會員報表",
  props: { funcKey: 1501 },
  component: () => import('./component/MemberReport/MemberReport.vue')
}
export const GameReport = {
  path: '/report/game',
  name: 'GameReport',
  title: "遊戲報表",
  props: { funcKey: 1502 },
  component: () => import('./component/GameReport/GameReport.vue')
}

export const Report = {
  path: '/report',
  name: 'Report',
  title: "報表查詢",
  redirect: "/report/member",
  props: { funcKey: 15 },
  component: () => import('./component/Report.vue'),
  children: [
    MemberReport,
    GameReport,
  ]
}

