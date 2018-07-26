

import { BRANCH_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'

const getters = {
  [BRANCH_INFO]: state => state.bchInfo
};

export default getters