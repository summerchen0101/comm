import { THEME_NAME } from '@/vendor/FPKG-40000-VuexStore/constants'

const getters = {
  [THEME_NAME]: state => state.themeName
};

export default getters