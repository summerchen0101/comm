<template>
  <div>
    <h5>佣金資訊</h5>
    <!-- totalValidityBetting: result.brokerage.total_feat, // 本週總有效投注額
    selfValidityBetting: result.brokerage.feat, // 本週個人有效投注額
    directValidityBetting: result.brokerage.downline_feat, // 本週直屬總有效投注額
    commisionUnit: result.brokerage.feedback, // 當前每萬元返還
    totalCommision: result.brokerage.total_brokerage, // 本週總佣金
    allowCommision: result.brokerage.brokerage, // 可提領佣金 -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>本週總有效投注額</th>
          <td>{{toCurrencyDecimal(commissionInfo.totalValidityBetting)}}</td>
        </tr>
        <tr>
          <th>本週個人有效投注額</th>
          <td>{{toCurrencyDecimal(commissionInfo.selfValidityBetting)}}</td>
        </tr>
        <tr>
          <th>本週直屬總有效投注額</th>
          <td>{{toCurrencyDecimal(commissionInfo.directValidityBetting)}}</td>
        </tr>
        <tr>
          <th>當前每萬元返還</th>
          <td>
            <span v-for="v, k in commissionInfo.commisionUnit" class="mr-3">
              <b>{{k}}:</b> {{toCurrency(v)}}
            </span>
          </td>
        </tr>
        <tr>
          <th>本週總佣金</th>
          <td>{{toCurrencyDecimal(commissionInfo.totalCommision)}}</td>
        </tr>
        <tr>
          <th>可提領佣金</th>
          <td>{{toCurrencyDecimal(commissionInfo.allowCommision)}}</td>
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
      commissionInfo: state => state.Member.MemberSearch.commissionInfo
    })
  },
  methods: {
  },

  async mounted() {
  }
}
</script>