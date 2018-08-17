import Vue from 'vue'
import Router from 'vue-router'
import { 
  GET_USER_INFO, 
  SWITCH_WEB_SYS_MENU, 
  BRANCH_INFO,
  GET_BRANCH_INFO,
  SET_USER_AUTH,
 } from '@/vendor/FPKG-40000-VuexStore/constants'
import Dashboard from '@/vendor/FPKG-70000-Dashboard/router'
import { Login, Logout } from '@/vendor/FPKG-90000-Account/router'
import { 
  MemberAllowCommission,
  MemberWithdrawnCommission,
  MemberAddedPoint,
  MemberSubtractedPoint,
  MemberDirectMembers,
  MemberUpperMembers,
} from '@/vendor/FPKG-130000-Member/router'

Vue.use(Router)

const RouterSetting = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: {name: 'Home'},
    },
    Dashboard,
    Login,
    Logout,
    MemberAllowCommission,
    MemberWithdrawnCommission,
    MemberAddedPoint,
    MemberSubtractedPoint,
    MemberDirectMembers,
    MemberUpperMembers,
  ]
})

RouterSetting.beforeEach(async (to, from, next) => {

  const Store = RouterSetting.app.$store

  Store.commit(SWITCH_WEB_SYS_MENU, false)
  
  // 若無Auth 
  if(!Store.state.Account.auth) {
    Store.commit(SET_USER_AUTH)
  }

  // 進入內頁時若未登入 Y-> 獲取使用者資訊
  if(Store.getters.IS_LOGIN !== true && to.name !== 'Login') {
    await Store.dispatch(GET_USER_INFO)
    
    // 能取得登入資訊 Y-> 開啟畫面 N-> 無則倒回登入頁
    if(Store.getters.IS_LOGIN) {
      next()
    }else {
      next({name: "Login"})
    }
    
  }
  else {
    next()
  }
  
  
})

export default RouterSetting



