
import { IS_LOGIN, USER_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'

const getters = {
  [IS_LOGIN](state) {
    return state.isLogin
  },
  [USER_INFO](state) {
    return state.userInfo
  },
};

export default getters