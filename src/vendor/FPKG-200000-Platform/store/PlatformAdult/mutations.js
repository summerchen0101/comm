

import {
  GOT_ADULT_MANAGE
} from '@/vendor/FPKG-40000-VuexStore/constants'
import Router from '@/router'

const mutations = {
  [GOT_ADULT_MANAGE](state, result) {
    state.adultSetting = {
      status: result.active,
      urlOnOpen: result.webcast_url,
      urlOnClose: result.redirect_url,
      openAt: result.openAt || Router.app.$moment(new Date()).add(1, 'hours')
    }
  }
}

export default mutations