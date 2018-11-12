<template>
  <div v-if="summary" id="CommissionReportInfo">
    <div class="table-responsive mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="40%">總計</th>
            <th width="12%">總筆數</th>
            <th width="12%">總有效金額</th>
            <th width="12%">總最高給付</th>
            <th width="12%">總實際給付</th>
            <th width="12%">總差值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>{{$root.toCurrency(summary.brokerage_count)}}</td>
            <td>{{$root.toCurrencyFloor(summary.feat)}}</td>
            <td>{{$root.toCurrencyFloor(summary.surplus)}}</td>
            <td>{{$root.toCurrencyFloor(summary.brokerage)}}</td>
            <td :class="$root.handleResultColor(summary.deficit)">{{$root.toCurrencyFloor(summary.deficit)}}</td>
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
            <th width="12%">有效金額</th>
            <th width="12%">最高給付</th>
            <th width="12%">實際給付</th>
            <th width="12%">差值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in list" :key="i.game_kind">
            <td>{{showGame(i.game_kind)}}</td>
            <td>{{$root.toCurrency(i.brokerage_count)}}</td>
            <td>{{$root.toCurrencyFloor(i.feat)}}</td>
            <td>{{$root.toCurrencyFloor(i.surplus)}}</td>
            <td>{{$root.toCurrencyFloor(i.brokerage)}}</td>
            <td :class="$root.handleResultColor(i.deficit)">{{$root.toCurrencyFloor(i.deficit)}}</td>
          </tr>
          <tr v-if="list.length === 0">
            <td colspan="6" class="text-center">暫無資料</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_COMMISSION_TOTAL_REPORT, GET_GAME_TYPE_OPTIONS, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
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
        {name: null, title: "佣金報表"},
      ]
    }
  },
  watch: {
    $route: "getCommissionReport"
  },
  computed: {
    ...mapState({
      summary: state => state.Report.CommissionReport.summary,
      list: state => state.Report.CommissionReport.list,
    }),
    ...mapGetters({
      gameList: GAME_LIST
    })
  },
  methods: {
    async getCommissionReport() {
      let params = this.$route.params
      await this.$store.dispatch(GET_COMMISSION_TOTAL_REPORT, {
        startAt: params.startAt,
        endAt: params.endAt,
      })
      this.$forceUpdate()
    },
    showGame(gameTypeId) {
      return this.gameList[gameTypeId - 1].name
    }
  },
  created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  },
  async mounted() {
    await this.getCommissionReport()
  }
}
</script>

<style lang="stylus">
</style>
