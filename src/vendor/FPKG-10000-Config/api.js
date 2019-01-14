import axios from 'axios'
import Store from '@/store'
import Router from '@/router'
import { 
  SWITCH_LOADING_COVER, 
  CLEAR_USER_INFO, 
  CLEAR_SESSION, 
  CLEAR_MENU 
} from '@/vendor/FPKG-40000-VuexStore/constants'

// export const branchDomain = psl.parse(location.hostname).domain || location.hostname

console.log(process.env.VUE_APP_API_ENV)
export async function apiHub(method, url, data, params) {
  Store.commit(SWITCH_LOADING_COVER, true)
  try {
    var _response = await axios({
      baseURL: process.env.VUE_APP_API_PATH,
      method,
      url,
      data,
      params,
      headers: {
        Authorization: `Bearer ${Store.state.Account.auth}`
      },
      validateStatus: status => {
        if (status === 500) {
          alert(`API Error`);
        } 
        else if (status === 503) {
          Router.push({name: "Maintenance"})
          Store.commit(CLEAR_USER_INFO)
          Store.commit(CLEAR_SESSION)
          Store.commit(CLEAR_MENU)
        }
        else if (status === 401) {
          Router.push({ name: "Login" });
        }
        // return (status >= 200 && status < 300) || status === 422
        return true;
      }
    });
    Store.commit(SWITCH_LOADING_COVER, false)
    // if(_response.status === 422) {
    //   alert(`系統忙碌中: ${_response.status}`)
    //   // alert(`API Error: ${_response.status}`)
    // }
    if(_response.data.code) {
      Router.app.handleErrCode(_response.data.code, url)
    }
    return _response.data
  }catch(err) {
    console.log(err)
  }
}

