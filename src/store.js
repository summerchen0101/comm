import Vue from 'vue'
import Vuex from 'vuex'
import Dashboard from './vendor/FPKG-70000-Dashboard/store'
import Account from './vendor/FPKG-90000-Account/store'
import Widget from './vendor/FPKG-110000-Widget/store'
import Config from './vendor/FPKG-10000-Config/store'
import Announce from './vendor/FPKG-140000-Announce/store'
import Money from './vendor/FPKG-150000-Money/store'

Vue.use(Vuex)

const store = {
  modules: {
    Config,
    Widget,
    Dashboard,
    Account,
    Announce,
    Money,
  },
  state: {
    version: '1.0.0'
  },
  mutations: {

  },
  actions: {

  }
};

export default new Vuex.Store(store);

