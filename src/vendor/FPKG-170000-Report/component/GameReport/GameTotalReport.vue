<template>
  <div v-if="totalInfo" id="GameReportInfo">
    <div class="table-responsive mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="40%">總計</th>
            <th width="12%">筆數</th>
            <th width="12%">投注金額</th>
            <th width="12%">有效金額</th>
            <th width="12%">中獎金額</th>
            <th width="12%">會員結果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>{{$root.toCurrency(totalInfo.count)}}</td>
            <td>{{$root.toCurrencyDecimal(totalInfo.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(totalInfo.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(totalInfo.winAmount)}}</td>
            <td :class="$root.handleResultColor(totalInfo.result)">{{$root.toCurrencyDecimal(totalInfo.result)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-responsive mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="40%">類別</th>
            <th width="12%">筆數</th>
            <th width="12%">投注金額</th>
            <th width="12%">有效金額</th>
            <th width="12%">中獎金額</th>
            <th width="12%">會員結果</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r,i in totalReport" :key="i">
            <td>
              <router-link :to="{name: 'GameTypeReport', params: Object.assign({}, $route.params, {gameTypeId: r.gameTypeId})}">
                {{showGame(r.gameTypeId)}}
              </router-link>
            </td>
            <td>{{$root.toCurrency(r.count)}}</td>
            <td>{{$root.toCurrencyDecimal(r.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(r.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(r.winAmount)}}</td>
            <td :class="$root.handleResultColor(r.result)">{{$root.toCurrencyDecimal(r.result)}}</td>
          </tr>
          <tr v-if="totalReport.length === 0">
            <td colspan="6" class="text-center">暫無資料</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_GAME_TOTAL_REPORT, GET_GAME_TYPE_OPTIONS, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
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
        {name: null, title: "遊戲報表"},
      ],
    }
  },
  watch: {
    $route: "getGameReport"
  },
  computed: {
    ...mapState({
      totalInfo: state => state.Report.GameReport.totalInfo,
      totalReport: state => state.Report.GameReport.totalReport,
    }),
    ...mapGetters({
      gameList: GAME_LIST
    })
  },
  methods: {
    getGameReport() {
      let params = this.$route.params
      this.$store.dispatch(GET_GAME_TOTAL_REPORT, {
        startAt: params.startAt,
        endAt: params.endAt,
      })
    },
    showGame(gameTypeId) {
      return this.gameList[gameTypeId - 1].name
    }
  },
  created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  },
  mounted() {
    this.getGameReport()
  }
}
</script>

<style lang="stylus">
</style>
