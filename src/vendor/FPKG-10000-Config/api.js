import axios from 'axios'
import Store from '@/store'
import { SWITCH_LOADING_COVER } from '@/vendor/FPKG-40000-VuexStore/constants'

export const branchDomain = psl.parse(location.hostname).domain || location.hostname

var apiPathByEnv = {
  local: '/api',
  dev: 'http://platformapi.thoth-dev.com',
  beta: 'http://platform-api.gebtest365.net'
}
var apiPathMap = [
  {path: '/api', domain: 'localhost'},
  {path: 'http://platformapi.thoth-dev.com', domain: 'thoth-dev.com'},
  {path: 'http://platform-api.gebtest365.net', domain: 'gebtest365.net'},
]
var apiIndex = apiPathMap.findIndex(t => branchDomain.search(t.domain) > -1)
export async function apiHub(method, url, data, params) {
  Store.commit(SWITCH_LOADING_COVER, true)
  try {
    var _response = await axios({
      baseURL: apiPathMap[apiIndex].path,
      // baseURL: apiPathByEnv[process.env.VUE_APP_API_ENV],
      method,
      url,
      data,
      params,
      headers: {
        Authorization: `Bearer ${Store.state.Account.auth}`
      },
      validateStatus: (status) => {
        if(status === 500) {
          alert(`API Error`)
        }
        // return (status >= 200 && status < 300) || status === 422
        return true
      },
    })
    Store.commit(SWITCH_LOADING_COVER, false)
    if(_response.status === 422) {
      alert(`系統忙碌中: ${_response.status}`)
      // alert(`API Error: ${_response.status}`)
    }
    return _response.data
  }catch(err) {
    console.log(err)
  }



  
}



function handleError() {
  
}