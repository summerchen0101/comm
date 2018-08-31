<template>
  <div v-if="info" id="GamePlayReport">
    <div class="table-responsive mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="50%">遊戲</th>
            <th width="10%">筆數</th>
            <th width="10%">投注金額</th>
            <th width="10%">有效金額</th>
            <th width="10%">中獎金額</th>
            <th width="10%">遊戲結果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{getGamePlayName(info.gamePlayId)}}</td>
            <td>{{$root.toCurrency(info.count)}}</td>
            <td>{{$root.toCurrencyDecimal(info.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(info.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(info.winAmount)}}</td>
            <td class="text-danger">{{$root.toCurrencyDecimal(info.result)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-responsive mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="18%">注單編號</th>
            <th width="20%">下注時間/IP</th>
            <th width="12%">帳號(暱稱)</th>
            <th width="10%">投注內容</th>
            <th width="10%">投注金額</th>
            <th width="10%">有效金額</th>
            <th width="10%">中獎金額</th>
            <th width="10%">遊戲結果</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r,i in report" :key="i">
            <td>{{r.number}}</td>
            <td>
              <span>{{toShortDateTime(r.betTime)}}</span><br>
              <span class="text-info">{{r.ip}}</span>
            </td>
            <td>
              <span v-if="r.account">{{r.account}}({{r.nick}})</span>
              <span v-else>-</span>
            </td>
            <td>{{r.betTarget}}</td>
            <td>{{$root.toCurrencyDecimal(r.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(r.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(r.winAmount)}}</td>
            <td class="text-danger">{{$root.toCurrencyDecimal(r.result)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginator v-if="pager"
              :on-page-changed="onPageChanged"
              :count="pager.count"
              :perpage="pager.perpage"></Paginator>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_GAME_PLAY_REPORT } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'
import { mapState } from 'vuex';
import { gameType } from '@/vendor/FPKG-10000-Config/enum'
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      gameTypeIndex: gameType.findIndex(g => g.value == this.$route.params.gameTypeId),
      page: 1
    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      info: state => state.Report.GameReport.gamePlayInfo,
      report: state => state.Report.GameReport.gamePlayReport,
      pager: state => state.Report.GameReport.gamePlayReportPager,
    }),
    breadcrumbPath() {
      let gamePlayIndex = gameType[this.gameTypeIndex].children.findIndex(g => g.value == this.$route.params.gamePlayId)
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: null, title: "遊戲報表"},
        {name: "GameTotalReport", title: "遊戲報表", params: {...this.$route.params}},
        {name: "GameTypeReport", title: gameType[this.gameTypeIndex].label, params: {...this.$route.params}},
        {name: null, title: gameType[this.gameTypeIndex].children[gamePlayIndex].label},
      ]
    }
  },
  methods: {
    getGamePlayReport() {
      this.$store.dispatch(GET_GAME_PLAY_REPORT, {
        ...this.$route.params,
        page: this.page
      })
    },
    getGamePlayName(gamePlayId) {
      var gamePlayIndex = gameType[this.gameTypeIndex].children.findIndex(g => g.value == gamePlayId)
      return gamePlayIndex > -1 ? gameType[this.gameTypeIndex].children[gamePlayIndex].label : gamePlayId
    },
    onPageChanged(page) {
      this.page = page
      this.getGamePlayReport()
    }
  },
  created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  },
  mounted() {
    this.getGamePlayReport()
  }
}
</script>

<style lang="stylus">
</style>
