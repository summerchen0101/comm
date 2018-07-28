
import { 
  GET_DEPOSIT_INFO,
  GOT_DEPOSIT_INFO,
  GET_DEPOSIT_LIST,
  GOT_DEPOSIT_LIST,
  GET_DEPOSIT_STATUS_LIST,
  GOT_DEPOSIT_STATUS_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { apiHub } from '@/vendor/FPKG-10000-Config/api'


import Router from '@/router'

const actions = {
  async [GET_DEPOSIT_STATUS_LIST]({commit}) {
    let params = {
      condition: 'deposit'
    }
    let res = await apiHub("get", "api/v1/dropdown/status", null, params)
    if(res.code === 200001) {
      commit(GOT_DEPOSIT_STATUS_LIST, res.result)
    }
  },
  async [GET_DEPOSIT_INFO]({commit}, _d) {
    let params = {
      // start_time: _d.startTime,
      // end_time: _d.endTime,
      no: _d.number,
      account: _d.account,
    }
    let res = await apiHub("get", `api/v1/deposit/${_d.status}/summary`, null, params)
    if(res.code === 200001) {
      commit(GOT_DEPOSIT_INFO, res.result)
    }
  },
  async [GET_DEPOSIT_LIST]({commit}, _d) {
    let params = {
      // start_time: _d.startTime,
      // end_time: _d.endTime,
      no: _d.number,
      account: _d.account,
      page: _d.page
    }
    let res = await apiHub("get", `api/v1/deposit/${_d.status}/list`, null, params)
    if(res.code === 200001) {
      let _res = {
          "result": {
              "current_page": 1,
              "data": [
                  {
                      "id": 1,
                      "no": "123234345",
                      "member_id": 1,
                      "payway_id": 1,
                      "deposit_account_id": 0,
                      "credit": "500.0000",
                      "payway_status": 2,
                      "status": 2,
                      "review_user_id": 0,
                      "review_at": null,
                      "reason": "",
                      "deposit_at": "2018-07-15",
                      "ip": "",
                      "created_at": null,
                      "updated_at": null,
                      "account": "PH000001",
                      "nickname": "thothapi",
                      "mobile": "0987",
                      "operation_bank_info": {
                          "member": "PH000001",
                          "from": null,
                          "payNo": null,
                          "no": null,
                          "credit": "500.0000"
                      },
                      "expire_at": null
                  }
              ],
              "first_page_url": "http://platform-comm-api.test/api/v1/deposit/1/list?page=1",
              "from": 1,
              "last_page": 1,
              "last_page_url": "http://platform-comm-api.test/api/v1/deposit/1/list?page=1",
              "next_page_url": null,
              "path": "http://platform-comm-api.test/api/v1/deposit/1/list",
              "per_page": 50,
              "prev_page_url": null,
              "to": 1,
              "total": 1
          },
          "code": 200001
      }
    
      commit(GOT_DEPOSIT_LIST, _res.result)
    }
  },
}

export default actions