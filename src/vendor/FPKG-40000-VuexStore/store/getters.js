

import { GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import storage from 'store2'

const getters = {
  [GAME_LIST](state) {
    return storage.local("gameList")
  },
};

export default getters