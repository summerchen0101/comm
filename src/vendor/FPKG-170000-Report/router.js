import {getPath} from '@/vendor/FPKG-120000-Util/menu'

export const MemberReport = {
  path: '/report/member',
  name: 'MemberReport',
  title: "會員報表",
  props: { funcKey: 1501 },
  component: () => import('./component/MemberReport/MemberReport.vue'),
  children: [
    {
      path: '/report/member/search/:startAt/:endAt/:account',
      name: 'MemberReportInfo',
      component: () => import('./component/MemberReport/MemberReportInfo.vue'),
    },
    {
      path: '/report/member/search/:startAt/:endAt/:account/:gameTypeId',
      name: 'MemberGameReport',
      component: () => import('./component/MemberReport/MemberGameReport.vue'),
    },
  ]
}
export const GameReport = {
  path: '/report/game',
  name: 'GameReport',
  title: "遊戲報表",
  props: { funcKey: 1502 },
  component: () => import('./component/GameReport/GameReport.vue'),
  children: [
    {
      path: '/report/game/search/:startAt/:endAt',
      name: 'GameTotalReport',
      component: () => import('./component/GameReport/GameTotalReport.vue'),
    },
    {
      path: '/report/game/search/:startAt/:endAt/:gameTypeId',
      name: 'GameTypeReport',
      component: () => import('./component/GameReport/GameTypeReport.vue'),
    },
    {
      path: '/report/game/search/:startAt/:endAt/:gameTypeId/:gamePlayId',
      name: 'GamePlayReport',
      component: () => import('./component/GameReport/GamePlayReport.vue'),
    },
  ]
}

export const Report = {
  path: '/report',
  name: 'Report',
  title: "報表查詢",
  redirect:() => getPath(15),
  props: { funcKey: 15 },
  component: () => import('./component/Report.vue'),
  children: [
    MemberReport,
    GameReport,
  ]
}

