import {
  GOT_MAIL_LIST,
  SET_MAIL_DIALOG_VISIBLE
} from '@/vendor/FPKG-40000-VuexStore/constants'

const mutations = {
  [GOT_MAIL_LIST] (state, result) {
    state.result = result
  },
  [SET_MAIL_DIALOG_VISIBLE] (state, status) {
    state.dialogVisible = status
  }
}

export default mutations
