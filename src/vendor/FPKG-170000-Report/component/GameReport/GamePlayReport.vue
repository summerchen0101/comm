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
            <th v-if="fix" width="10%">中獎金額</th>
            <th width="10%">會員結果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{nowGame}}</td>
            <td>{{$root.toCurrency(info.count)}}</td>
            <td>{{$root.toCurrencyFloor(info.betAmount)}}</td>
            <td>{{$root.toCurrencyFloor(info.realAmount)}}</td>
            <td v-if="fix">{{$root.toCurrencyFloor(info.winAmount)}}</td>
            <td>
              <span :class="$root.handleResultColor(info.result)">{{$root.toCurrencyFloor(info.result)}}</span>
            </td>
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
            <th v-if="fix" width="10%">中獎金額</th>
            <th width="10%">會員結果</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r,i in report" :key="i">
            <td>
              <div>{{r.number}}</div>
              <WagerCancel :cancel="r.cancel"></WagerCancel>
            </td>
            <td>
              <span>{{toShortDateTime(r.betTime)}}</span><br>
              <span class="text-info">{{r.ip}}</span>
            </td>
            <td>
              <span v-if="r.account">{{r.account}}({{r.nick}})</span>
              <span v-else>-</span>
            </td>
            <td>
              <div>{{getGamePlayName(r.betTarget)}}</div>
              <div v-if="r.schedule">{{r.schedule}}</div>
            </td>
            <td>{{$root.toCurrencyFloor(r.betAmount)}}</td>
            <template v-if="r.status != 2 && r.status != 3">
              <td>{{$root.toCurrencyFloor(r.realAmount)}}</td>
              <td v-if="fix">{{$root.toCurrencyFloor(r.winAmount)}}</td>
              <td :class="$root.handleResultColor(r.result)">{{$root.toCurrencyFloor(r.result)}}</td>
            </template>
            <template v-else>
              <td><span>-</span></td>
              <td v-if="fix"><span>-</span></td>
              <td><span>-</span></td>
            </template>
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
import { SET_BREADCRUMB, GET_GAME_PLAY_REPORT, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'
import { mapState, mapGetters } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'
import WagerCancel from '@/vendor/FPKG-110000-Widget/component/WagerCancel.vue'

export default {
  mixins: [commonTool],
  components: {
    WagerCancel
  },
  data() {
    return {
      nowGame: '',
      page: 1,
      selList: {},
      fix: false
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
    ...mapGetters({
      gameList: GAME_LIST
    }),
    breadcrumbPath() {
      let self = this
      let gameList = self.gameList[this.$route.params.gameTypeId - 1]
      self.selList = gameList.list.game_type
      self.nowGame = self.selList[this.$route.params.gamePlayId - 1].name
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: null, title: "遊戲報表"},
        {name: "GameTotalReport", title: "遊戲報表", params: {...this.$route.params}},
        {name: "GameTypeReport", title: gameList.name, params: {...this.$route.params}},
        {name: null, title: self.nowGame},
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
    onPageChanged(page) {
      this.page = page
      this.getGamePlayReport()
    },
    getGamePlayName(gamePlayId) {
      return this.selList[gamePlayId - 1].name
    },
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
.el-tag {
  padding: 0 5px;
  height: 24px;
  line-height: 22px;
}
</style>
