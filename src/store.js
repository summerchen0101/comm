import Vue from 'vue'
import Vuex from 'vuex'
import Global from './vendor/FPKG-40000-VuexStore/store'
import Dashboard from './vendor/FPKG-70000-Dashboard/store'
import Account from './vendor/FPKG-90000-Account/store'
import Widget from './vendor/FPKG-110000-Widget/store'

import Member from './vendor/FPKG-130000-Member/store'
import Announce from './vendor/FPKG-140000-Announce/store'
import Money from './vendor/FPKG-150000-Money/store'
import BettingInfo from './vendor/FPKG-160000-BettingInfo/store'
import Report from './vendor/FPKG-170000-Report/store'
import Manage from './vendor/FPKG-180000-Manage/store'
import Home from './vendor/FPKG-190000-Home/store'

Vue.use(Vuex)

const store = {
  modules: {
    Global,
    Widget,
    Dashboard,
    Account,
    Announce,
    Money,
    BettingInfo,
    Report,
    Manage,
    Member,
    Home,
  },
};

export default new Vuex.Store(store);

