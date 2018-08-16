<template>
  <div>
    <h5>個人資訊</h5>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>帳號(暱稱)</th>
          <td>
            <router-link :to="{name: 'MemberDetail', params: {
                id: personalInfo.id, 
                acc: personalInfo.account
              }}" target="_blank">{{personalInfo.account}}({{personalInfo.nick}})</router-link>
          </td>
        </tr>
        <tr>
          <th>手機號碼</th>
          <td>{{personalInfo.phone}}
            <el-checkbox class="float-right" style="margin-bottom: 0" disabled
                          :value="personalInfo.isMobileVerified">
                          驗證通過
            </el-checkbox>
          </td>
        </tr>
        <tr>
          <th>Line ID</th>
          <td>{{personalInfo.lineID || '-'}}</td>
        </tr>
        <tr>
          <th>狀態</th>
          <td :class="{'text-success': personalInfo.status == 1, 'text-danger': personalInfo.status == 2}">{{toOption(statusOpts, personalInfo.status)}}</td>
        </tr>
        <tr>
          <th>會員起始級別</th>
          <td>{{personalInfo.startLevel}}</td>
        </tr>
        <tr>
          <th>直屬會員數量</th>
          <td>
            <router-link :to="{name: 'MemberDirectMembers', params: {
                id: personalInfo.id,
                acc: personalInfo.account,
                nick: personalInfo.nick,
              }}" target="_blank">
              {{toCurrencyDecimal(personalInfo.directMembers)}}
            </router-link>
          </td>
        </tr>
        <tr>
          <th>代理會員數量</th>
          <td>
            <router-link :to="{name: 'MemberUpperMembers', params: {
                id: personalInfo.id,
                acc: personalInfo.account,
                nick: personalInfo.nick,
              }}" target="_blank">
              {{toCurrencyDecimal(personalInfo.upperMembers)}}
            </router-link>
          </td>
        </tr>
        <tr>
          <th>單日存款限額</th>
          <td>{{toCurrency(personalInfo.dialyDepositLimit)}}</td>
        </tr>
        <tr>
          <th>建立時間</th>
          <td>{{personalInfo.createdAt}}</td>
        </tr>
        <tr>
          <th>最後登入</th>
          <td>{{personalInfo.loginAt}}</td>
        </tr>
        <tr>
          <th>最後登入IP</th>
          <td>{{personalInfo.loginIP}}</td>
        </tr>
        <tr>
          <th>備註</th>
          <td>{{personalInfo.memo}}</td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import { GET_MEMBER_STATUS_OPTIONS } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      statusOpts: state => state.Global.memberStatusOpts,
      personalInfo: state => state.Member.MemberSearch.personalInfo
    })
  },
  methods: {
  },

  async mounted() {
    await this.$store.dispatch(GET_MEMBER_STATUS_OPTIONS)
  }
}
</script>