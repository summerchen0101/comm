

import { GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'


const getters = {
  [GAME_LIST](state) {
    return state.gameListOpts
  },
};

export default getters