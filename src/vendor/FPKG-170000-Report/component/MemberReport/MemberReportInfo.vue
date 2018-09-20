<template>
  <div id="MemberReportInfo">
    <div class="table-responsive mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="40%">帳號(暱稱)</th>
            <th width="12%">筆數</th>
            <th width="12%">投注金額</th>
            <th width="12%">有效金額</th>
            <th width="12%">中獎金額</th>
            <th width="12%">會員結果</th>
          </tr>
        </thead>
        <tbody v-if="info">
          <tr>
            <td>{{info.account}}</td>
            <td>{{$root.toCurrency(info.count)}}</td>
            <td>{{$root.toCurrencyDecimal(info.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(info.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(info.winAmount)}}</td>
            <td :class="$root.handleResultColor(info.result)">{{$root.toCurrencyDecimal(info.result)}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6" class="text-center">暫無資料</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-responsive mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="40%">遊戲</th>
            <th width="12%">筆數</th>
            <th width="12%">投注金額</th>
            <th width="12%">有效金額</th>
            <th width="12%">中獎金額</th>
            <th width="12%">會員結果</th>
          </tr>
        </thead>
        <tbody v-if="report.length > 0">
          <tr v-for="r,i in report" :key="i">
            <td>
              <router-link :to="{name: 'MemberGameReport', params: Object.assign({}, $route.params, {gameTypeId: r.gameTypeId})}">
                {{gameList[r.gameTypeId - 1].name}}
              </router-link>
            </td>
            <td>{{$root.toCurrency(r.count)}}</td>
            <td>{{$root.toCurrencyDecimal(r.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(r.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(r.winAmount)}}</td>
            <td :class="$root.handleResultColor(r.result)">{{$root.toCurrencyDecimal(r.result)}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6" class="text-center">暫無資料</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import { SET_BREADCRUMB, GET_MEMBER_REPORT, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
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
        {name: null, title: "會員報表"},
        {name: null, title: this.$route.params.account},
      ],
    }
  },
  watch: {
    $route: "getMemberReport"
  },
  computed: {
    ...mapState({
      isSearched: state => state.Report.MemberReport.isSearched,
      info: state => state.Report.MemberReport.Member.info,
      report: state => state.Report.MemberReport.Member.report,
    }),
    ...mapGetters({
      gameList: GAME_LIST
    })
  },
  methods: {
    getMemberReport() {
      let params = this.$route.params
      this.$store.dispatch(GET_MEMBER_REPORT, {
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
    this.getMemberReport()
  }
}
</script>

<style lang="stylus">
</style>
