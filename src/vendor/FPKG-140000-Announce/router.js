export const Announce = {
  path: '/announce',
  name: 'Announce',
  title: "公告管理",
  redirect: '/announce/marquee',
  component: () => import('./component/Announce.vue')
}

export const Marquee = {
  path: '/announce/marquee',
  name: 'Marquee',
  title: "跑馬燈管理",
  component: () => import('./component/Marquee.vue')
}