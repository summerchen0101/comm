export const BettingSearch = {
  path: '/betting/search',
  name: 'BettingSearch',
  title: "注單查詢",
  props: { funcKey: 1401 },
  component: () => import('./component/BettingSearch.vue')
}


export const BettingInfo = {
  path: '/betting',
  name: 'BettingInfo',
  title: "注單資訊",
  props: { funcKey: 14 },
  redirect: '/betting/search',
  component: () => import('./component/BettingInfo.vue'),
  children: [
    BettingSearch
  ]
}
