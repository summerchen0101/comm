import Vue from 'vue'
import Vuex from 'vuex'
import Dashboard from './vendor/FPKG-70000-Dashboard/store'
import Branch from './vendor/FPKG-80000-Branch/store'
import Account from './vendor/FPKG-90000-Account/store'
import Theme from './vendor/FPKG-100000-Theme/store'
import Widget from './vendor/FPKG-110000-Widget/store'
import Config from './vendor/FPKG-10000-Config/store'

Vue.use(Vuex)

const store = {
  modules: {
    Config,
    Widget,
    Dashboard,
    Branch,
    Account,
    Theme,
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

