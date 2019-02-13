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
export const CommissionReport = {
  path: '/report/commission',
  name: 'CommissionReport',
  title: "佣金報表",
  props: { funcKey: 1503 },
  component: () => import('./component/CommissionReport/CommissionReport.vue'),
  children: [
    {
      path: '/report/commission/search/:startAt/:endAt',
      name: 'CommissionTotalReport',
      component: () => import('./component/CommissionReport/CommissionTotalReport.vue'),
    },
  ]
}
export const AgentReport = {
  path: '/report/agent',
  name: 'AgentReport',
  title: "代理報表",
  props: { funcKey: 1504 },
  component: () => import('./component/AgentReport/AgentReport.vue'),
  children: [
    {
      path: '/report/agent/search/:startAt/:endAt/:account?',
      name: 'AgentReportInfo',
      component: () => import('./component/AgentReport/AgentReportInfo.vue'),
    },
    // {
    //   path: '/report/agent/search/:startAt/:endAt/:account/:gameTypeId',
    //   name: 'AgentGameReport',
    //   component: () => import('./component/AgentReport/AgentGameReport.vue'),
    // },
  ]
}
export const Winlose = {
  path: '/report/winlose',
  name: 'Winlose',
  title: "輸贏分析",
  props: { funcKey: 1505 },
  component: () => import('./component/Winlose/Winlose.vue'),
  children: [
    {
      path: '/report/winlose/search/:startAt/:endAt/:game_kind/:per_page/:sort/:page?',
      name: 'WinloseInfo',
      component: () => import('./component/Winlose/WinloseInfo.vue'),
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
    AgentReport,
    GameReport,
    CommissionReport,
    Winlose,
  ]
}

