<template>
  <div>
    <h5>點數資訊</h5>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>目前點數</th>
          <td>{{$root.toCurrencyDecimal(pointInfo.point)}}</td>
        </tr>
        <tr>
          <th>已入帳存款</th>
          <td>{{$root.toCurrencyDecimal(pointInfo.savedPoint)}}</td>
        </tr>
        <tr>
          <th>撥點</th>
          <td>
            <router-link :to="{name: 'MemberAddedPoint', params: {
                id: personalInfo.id,
                acc: personalInfo.account,
                nick: personalInfo.nick,
              }}" target="_blank">
              {{$root.toCurrencyDecimal(pointInfo.addedPoint)}}
            </router-link>
          </td>
        </tr>
        <tr>
          <th>扣點</th>
          <td>
            <router-link :to="{name: 'MemberSubtractedPoint', params: {
                id: personalInfo.id,
                acc: personalInfo.account,
                nick: personalInfo.nick,
              }}" target="_blank">
              {{$root.toCurrencyDecimal(pointInfo.subtractedPoint)}}
            </router-link>
          </td>
        </tr>
        <tr>
          <th>申請中提款</th>
          <td>{{$root.toCurrencyDecimal(pointInfo.applyPoint)}}</td>
        </tr>
        <tr>
          <th>出款</th>
          <td>{{$root.toCurrencyDecimal(pointInfo.dispensePoint)}}</td>
        </tr>
        <tr>
          <th>已提領佣金</th>
          <td>
            <router-link :to="{name: 'MemberWithdrawnCommission', params: {
                id: personalInfo.id,
                acc: personalInfo.account,
                nick: personalInfo.nick,
              }}" target="_blank">
              {{$root.toCurrencyDecimal(pointInfo.withdrawnCommission)}}
            </router-link>
          </td>
        </tr>
        <tr>
          <th>會員結果</th>
          <td :class="$root.handleResultColor(pointInfo.memberResult)">{{$root.toCurrencyDecimal(pointInfo.memberResult)}}</td>
        </tr>
        <tr>
          <th>未結帳投注</th>
          <td>{{$root.toCurrencyDecimal(pointInfo.unCheckBetting)}}</td>
        </tr>
        <tr>
          <th>點數驗證</th>
          <td>{{$root.toCurrencyDecimal(pointInfo.pointVerify)}}</td>
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
      pointInfo: state => state.Member.MemberSearch.pointInfo
    })
  },
  methods: {
  },

  async mounted() {
  }
}
</script>