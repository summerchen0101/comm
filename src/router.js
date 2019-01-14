import Vue from 'vue'
import Router from 'vue-router'
import PublicPages from '@/vendor/FPKG-10000-Config/publicPage'
import {
  GET_USER_INFO,
  SWITCH_WEB_SYS_MENU,
  BRANCH_INFO,
  GET_BRANCH_INFO,
  SET_USER_AUTH
} from '@/vendor/FPKG-40000-VuexStore/constants'
import Dashboard from '@/vendor/FPKG-70000-Dashboard/router'
import { Login, Logout } from '@/vendor/FPKG-90000-Account/router'
import { Maintenance } from '@/vendor/FPKG-110000-Widget/router'
import {
  MemberAllowCommission,
  MemberWithdrawnCommission,
  MemberAddedPoint,
  MemberSubtractedPoint,
  MemberDirectMembers,
  MemberUpperMembers,
  BankAcc
} from '@/vendor/FPKG-130000-Member/router'

import { Deposit, Withdraw, Dispense } from '@/vendor/FPKG-150000-Money/router'
import { NoService } from '@/vendor/FPKG-190000-Home/router'
import axios from 'axios'

Vue.use(Router)

const RouterSetting = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: { name: 'Home' }
    },
    Dashboard,
    Login,
    Logout,
    Maintenance,
    MemberAllowCommission,
    MemberWithdrawnCommission,
    MemberAddedPoint,
    MemberSubtractedPoint,
    MemberDirectMembers,
    MemberUpperMembers,
    BankAcc,
    Deposit,
    Withdraw,
    Dispense,
    NoService
  ]
})

let tw = null

RouterSetting.beforeEach(async (to, from, next) => {
  if (tw === null) {
    if (process.env.VUE_APP_API_ENV !== 'production') {
      tw = false
    }
    else {
      tw = true
      const res = await axios.get('https://ipapi.co/json/')
      if (res && res.data && res.data.country !== 'TW') {
        tw = false
      }
    }
  }

  const Store = RouterSetting.app.$store

  Store.commit(SWITCH_WEB_SYS_MENU, false)
  // 若無Auth
  if (!Store.state.Account.auth) {
    Store.commit(SET_USER_AUTH)
  }

  // 進入內頁時若未登入 Y-> 獲取使用者資訊
  if (to.name === 'NoService') {
    next()
  } else if (tw) {
    next({ name: 'NoService' })
  } else if (
    Store.getters.IS_LOGIN !== true &&
    PublicPages.indexOf(to.name) === -1
  ) {
    await Store.dispatch(GET_USER_INFO)
    // 能取得登入資訊 Y-> 開啟畫面 N-> 無則倒回登入頁
    if (Store.getters.IS_LOGIN) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default RouterSetting
