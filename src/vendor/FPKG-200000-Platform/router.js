import {getPath} from '@/vendor/FPKG-120000-Util/menu'

export const PlatformGame = {
  path: '/platform/game',
  name: 'PlatformGame',
  title: "遊戲管理",
  props: { funcKey: 1701 },
  component: () => import('./component/PlatformGame/PlatformGame.vue'),
}
export const PlatformAd = {
  path: '/platform/ad',
  name: 'PlatformAd',
  title: "廣告管理",
  props: { funcKey: 1702 },
  component: () => import('./component/PlatformAd/PlatformAd.vue'),
}
export const Platform = {
  path: '/platform',
  name: 'Platform',
  title: "平台管理",
  redirect:() => getPath(17),
  props: { funcKey: 17 },
  component: () => import('./component/Platform.vue'),
  children: [
    PlatformGame,
    PlatformAd,
  ]
}

