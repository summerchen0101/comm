export const Home = {
  path: '/home',
  name: 'Home',
  title: "首頁",
  component: () => import('./component/Home.vue'),
}

export const NoService = {
  path: '/noservice',
  name: 'NoService',
  title: "無服務",
  component: () => import('./component/NoService.vue'),
}