import VueStore from '@/store'
import { DO_LOGOUT } from '@/vendor/FPKG-40000-VuexStore/constants'

export const Account = {
  path: '/account',
  name: 'Account',
  title: "帳號管理",
  component: () => import('./component/Account.vue')
}
export const PersonalProfile = {
  path: '/profile',
  name: 'PersonalProfile',
  title: "個人資料",
  component: () => import('./component/PersonalProfile.vue')
}


export const Login = {
  path: '/',
  name: 'Login',
  component: () => import('@/vendor/FPKG-90000-Account/component/Login.vue'),
  beforeEnter(to, from, next) {
    next()
  }
}

export const Logout = {
  path: '/',
  name: 'Logout',
  async beforeEnter(to, from, next) {
    await VueStore.dispatch(DO_LOGOUT)
    next({name: "Login"})
    // window.location.reload()
  }
}