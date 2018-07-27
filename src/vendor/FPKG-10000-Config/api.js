import axios from 'axios'
import Store from '@/store'
import { SWITCH_LOADING_COVER } from '@/vendor/FPKG-40000-VuexStore/constants'
// import {  } from './branch'
export async function apiHub(method, url, data, params) {
  Store.commit(SWITCH_LOADING_COVER, true)
  try {
    var _response = await axios({
      baseURL: process.env.NODE_ENV === 'production' ? 'http://platformapi.thoth-dev.com' : '/api',
      // timeout: 1000,
      withCredentials: true,
      method,
      url,
      data,
      params,
      headers: {
        Authorization: `Bearer ${Store.state.Account.auth}`
      }
    })
    Store.commit(SWITCH_LOADING_COVER, false)
    if(!(_response.status >= 200 && _response.status < 300)) {
      alert(`API Error: ${_response.status}`)
    }
    return _response.data
  }catch(err) {
    console.log(err)
  }



  
}



function handleError() {
  
}