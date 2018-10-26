<template>
  <div>
    <h5>佣金資訊</h5>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>本週總有效投注額</th>
          <td>{{$root.toCurrencyDecimal(commissionInfo.totalValidityBetting)}}</td>
        </tr>
        <tr>
          <th>本週個人有效投注額</th>
          <td>{{$root.toCurrencyDecimal(commissionInfo.selfValidityBetting)}}</td>
        </tr>
        <tr>
          <th>本週直屬總有效投注額</th>
          <td>{{$root.toCurrencyDecimal(commissionInfo.directValidityBetting)}}</td>
        </tr>
        <tr>
          <th>當前每萬元返還</th>
          <td>
            <span class="mr-3" v-for="item in commissionInfo.commisionUnit" :key="item.id">
              <b>{{item.group}}</b>: {{$root.toCurrency(item.amount) || '-'}}
            </span>
          </td>
        </tr>
        <tr>
          <th>本週總佣金</th>
          <td>{{$root.toCurrencyDecimal(commissionInfo.totalCommision)}}</td>
        </tr>
        <tr>
          <th>本週我的佣金</th>
          <td>{{$root.toCurrencyDecimal(commissionInfo.self_brokerage)}}</td>
        </tr>
        <tr>
          <th>可提領佣金</th>
          <td>
            <router-link :to="{name: 'MemberAllowCommission', params: {
                id: personalInfo.id,
                acc: personalInfo.account,
                nick: personalInfo.nick,
              }}" target="_blank">
              {{$root.toCurrencyDecimal(commissionInfo.allowCommision)}}
            </router-link>
          </td>
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
      personalInfo: state => state.Member.MemberSearch.personalInfo,
      commissionInfo: state => state.Member.MemberSearch.commissionInfo
    })
  },
  methods: {
  },

  async mounted() {
  }
}
</script>