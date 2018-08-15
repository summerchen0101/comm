<template>
  <div>
    <h5>點數資訊</h5>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>目前點數</th>
          <td>{{toCurrencyDecimal(pointInfo.point)}}</td>
        </tr>
        <tr>
          <th>已入帳存款</th>
          <td>{{toCurrencyDecimal(pointInfo.savedPoint)}}</td>
        </tr>
        <tr>
          <th>撥點</th>
          <td>{{toCurrencyDecimal(pointInfo.addedPoint)}}</td>
        </tr>
        <tr>
          <th>扣點</th>
          <td>{{toCurrencyDecimal(pointInfo.subtractedPoint)}}</td>
        </tr>
        <tr>
          <th>申請中提款</th>
          <td>{{toCurrencyDecimal(pointInfo.applyPoint)}}</td>
        </tr>
        <tr>
          <th>出款</th>
          <td>{{toCurrencyDecimal(pointInfo.dispensePoint)}}</td>
        </tr>
        <tr>
          <th>已提領佣金</th>
          <td>{{toCurrencyDecimal(pointInfo.withdrawPoint)}}</td>
        </tr>
        <tr>
          <th>會員結果</th>
          <td>{{toCurrencyDecimal(pointInfo.memberResult)}}</td>
        </tr>
        <tr>
          <th>未結帳投注</th>
          <td>{{toCurrencyDecimal(pointInfo.unCheckBetting)}}</td>
        </tr>
        <tr>
          <th>點數驗證</th>
          <td>{{toCurrencyDecimal(pointInfo.pointVerify)}}</td>
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
      pointInfo: state => state.Member.MemberSearch.pointInfo
    })
  },
  methods: {
  },

  async mounted() {
  }
}
</script>