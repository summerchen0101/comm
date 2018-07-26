import axios from 'axios'
import Store from '@/store'
import { SWITCH_LOADING_COVER } from '@/vendor/FPKG-40000-VuexStore/constants'
import { branchSource } from './branch'
export async function apiHub(method, url, data, params) {
  Store.commit(SWITCH_LOADING_COVER, true)
  try {
    var _response = await axios({
      baseURL: process.env.NODE_ENV === 'production' ? 'http://118.232.237.16:33199' : '/api',
      // timeout: 1000,
      withCredentials: true,
      headers: {'x-branch-source': branchSource},
      method,
      url,
      data,
      params,
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