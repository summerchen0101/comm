export const Marquee = {
  path: '/announce/marquee',
  name: 'Marquee',
  title: "跑馬燈管理",
  props: { funcKey: 1201 },
  component: () => import('./component/Marquee.vue')
}

export const Mail = {
  path: '/announce/mail',
  name: 'Mail',
  title: "站內訊息管理",
  props: { funcKey: 1202 },
  component: () => import('./component/Mail.vue')
}

export const SiteAnnounce = {
  path: '/announce/site-announce',
  name: 'SiteAnnounce',
  title: "平台公告管理",
  props: { funcKey: 1203 },
  component: () => import('./component/SiteAnnounce.vue')
}

export const Announce = {
  path: '/announce',
  name: 'Announce',
  title: "公告管理",
  props: { funcKey: 12 },
  redirect: '/announce/marquee',
  component: () => import('./component/Announce.vue'),
  children: [
    Marquee,
    Mail,
    SiteAnnounce,
  ]
}

