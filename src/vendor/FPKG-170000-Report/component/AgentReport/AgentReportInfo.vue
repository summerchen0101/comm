<template>
  <div id="AgentReportInfo">
    <div class="table-responsive mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="20%">總計</th>
            <th width="10%">有效金額</th>
            <th width="10%">會員結果</th>
            <th width="10%">代理結果</th>
            <th width="10%">佣金給付</th>
            <th width="10%">代理給付</th>
            <th width="10%">總負擔</th>
          </tr>
        </thead>
        <tbody v-if="info">
          <tr>
            <td>-</td>
            <td>{{$root.toCurrency(info.amount)}}</td>
            <td :class="$root.handleResultColor(info.memberResult)">{{$root.toCurrencyFloor(info.memberResult)}}</td>
            <td :class="$root.handleResultColor(info.agentResult)">{{$root.toCurrencyFloor(info.agentResult)}}</td>
            <td :class="$root.handleResultColor(info.commission)">{{$root.toCurrencyFloor(info.commission)}}</td>
            <td :class="$root.handleResultColor(info.agentCommission)">{{$root.toCurrencyFloor(info.agentCommission)}}</td>
            <td :class="$root.handleResultColor(info.total)">{{$root.toCurrencyFloor(info.total)}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="7" class="text-center">暫無資料</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-responsive mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="20%">帳號</th>
            <th width="10%">有效金額</th>
            <th width="10%">會員結果</th>
            <th width="10%">代理結果</th>
            <th width="10%">佣金給付</th>
            <th width="10%">代理給付</th>
            <th width="10%">總負擔</th>
          </tr>
        </thead>
        <tbody v-if="report.length > 0">
          <tr v-for="r,i in report" :key="i">
            <td v-if="r.account">{{r.account}}({{r.nick}})</td>
            <td v-else>-</td>
            <td>{{$root.toCurrency(r.amount)}}</td>
            <td :class="$root.handleResultColor(r.memberResult)">{{$root.toCurrencyFloor(r.memberResult)}}</td>
            <td :class="$root.handleResultColor(r.agentResult)">{{$root.toCurrencyFloor(r.agentResult)}}</td>
            <td :class="$root.handleResultColor(r.commission)">{{$root.toCurrencyFloor(r.commission)}}</td>
            <td :class="$root.handleResultColor(r.agentCommission)">{{$root.toCurrencyFloor(r.agentCommission)}}</td>
            <td :class="$root.handleResultColor(r.total)">{{$root.toCurrencyFloor(r.total)}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="7" class="text-center">暫無資料</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import { SET_BREADCRUMB, GET_AGENT_REPORT, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'
import { mapState, mapGetters } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: null, title: "代理報表"},
        {name: null, title: this.$route.params.account},
      ],
    }
  },
  watch: {
    $route: "getAgentReport"
  },
  computed: {
    ...mapState({
      isSearched: state => state.Report.AgentReport.isSearched,
      info: state => state.Report.AgentReport.info,
      report: state => state.Report.AgentReport.report,
    }),
    ...mapGetters({
      gameList: GAME_LIST
    })
  },
  methods: {
    getAgentReport() {
      let params = this.$route.params
      this.$store.dispatch(GET_AGENT_REPORT, {
        startAt: params.startAt,
        endAt: params.endAt,
        account: params.account,
      })
    },
  },
  created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  },
  mounted() {
    this.getAgentReport()
  }
}
</script>

<style lang="stylus">
</style>
