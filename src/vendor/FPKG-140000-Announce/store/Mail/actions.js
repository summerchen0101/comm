import {
  GET_MAIL_LIST,
  GOT_MAIL_LIST,
  GET_MAIL,
  ADD_MAIL,
  EDIT_MAIL,
  SEND_MAIL,
  DELETE_MAIL,
  SET_MAIL_DIALOG_VISIBLE
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'

const actions = {
  async [GET_MAIL_LIST] ({ commit }, page = 1) {
    const res = await apiHub('get', 'api/v1/inward', null, { page })
    if (res.code === 200001) {
      commit(GOT_MAIL_LIST, res.result)
    }
  },
  async [GET_MAIL] ({ commit }, id) {
    const res = await apiHub('get', `api/v1/inward/${id}`)
    if (res.code === 200001) {
      return res.result
    }
    return false
  },
  async [ADD_MAIL] ({ commit, dispatch }, data) {
    const res = await apiHub('post', 'api/v1/inward', data)
    if (res.code === 200001) {
      dispatch(GET_MAIL_LIST)
      commit(SET_MAIL_DIALOG_VISIBLE, false)
    }
  },
  async [EDIT_MAIL] ({ commit, dispatch }, data) {
    const res = await apiHub('put', `api/v1/inward/${data.id}`, data.data)
    if (res.code === 200001) {
      dispatch(GET_MAIL_LIST)
      commit(SET_MAIL_DIALOG_VISIBLE, false)
    }
  },
  async [SEND_MAIL] ({ commit, dispatch }, id) {
    const res = await apiHub('put', `api/v1/inward/${id}/send`)
    if (res.code === 200001) {
      dispatch(GET_MAIL_LIST)
    }
  },
  async [DELETE_MAIL] ({ commit, dispatch }, id) {
    const res = await apiHub('delete', `api/v1/inward/${id}`)
    if (res.code === 200001) {
      dispatch(GET_MAIL_LIST)
    }
  }
}

export default actions
