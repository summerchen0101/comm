<template>
  <div v-if="info" id="MemberGameReport">
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
        <tbody>
          <tr>
            <td>{{info.account}}</td>
            <td>{{$root.toCurrency(info.count)}}</td>
            <td>{{$root.toCurrencyDecimal(info.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(info.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(info.winAmount)}}</td>
            <td>
              <span :class="$root.handleResultColor(info.result)">{{$root.toCurrencyDecimal(info.result)}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-responsive mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="20%">注單編號</th>
            <th width="20%">下注時間/IP</th>
            <th width="12%">投注內容</th>
            <th width="12%">投注金額</th>
            <th width="12%">有效金額</th>
            <th width="12%">中獎金額</th>
            <th width="12%">會員結果</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r,i in report" :key="i">
            <td>
              <div>{{r.number}}</div>
              <div v-if="r.betStatus != ''" class="el-tag el-tag--danger">{{r.betStatus}}</div>
            </td>
            <td>
              <span>{{toShortDateTime(r.betTime)}}</span><br>
              <span class="text-info">{{r.ip}}</span>
            </td>
            <td>
              <div>{{showGame(r.betTarget)}}</div>
              <div v-if="r.schedule">{{r.schedule}}</div>
            </td>
            <td>{{$root.toCurrencyDecimal(r.betAmount)}}</td>
            <template v-if="r.status != 2 && r.status != 3">
              <td>{{$root.toCurrencyDecimal(r.realAmount)}}</td>
              <td>{{$root.toCurrencyDecimal(r.winAmount)}}</td>
              <td :class="$root.handleResultColor(r.result)">{{$root.toCurrencyDecimal(r.result)}}</td>
            </template>
            <template v-else>
              <td><span>-</span></td>
              <td><span>-</span></td>
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
import { SET_BREADCRUMB, GET_MEMBER_GAME_REPORT, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'
import { mapState, mapGetters } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    // let gameTypeIndex = gameType.findIndex(g => g.value == this.$route.params.gameTypeId)
    return {
      // breadcrumbPath: [
      //   {name: "Home", title: "首頁"},
      //   {name: null, title: "報表查詢"},
      //   {name: null, title: "會員報表"},
      //   {name: null, title: this.$route.params.account},
      //   {name: null, title: gameType[gameTypeIndex].label},
      // ],
      page: 1,
      selList: {}
    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      info: state => state.Report.MemberReport.Game.info,
      report: state => state.Report.MemberReport.Game.report,
      pager: state => state.Report.MemberReport.Game.pager,
    }),
    ...mapGetters({
      gameList: GAME_LIST
    }),
    breadcrumbPath() {
      let self = this
      let tmp = self.gameList[this.$route.params.gameTypeId - 1]
      self.selList = tmp.list
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: null, title: "會員報表"},
        {name: "MemberReportInfo", title: this.$route.params.account, params: this.$route.params},
        {name: null, title: tmp.name},
      ]
    }
  },
  methods: {
    getGameReport() {
      let params = this.$route.params
      this.$store.dispatch(GET_MEMBER_GAME_REPORT, {
        startAt: params.startAt,
        endAt: params.endAt,
        account: params.account,
        gameTypeId: params.gameTypeId,
        page: this.page
      })
    },
    onPageChanged(page) {
      this.page = page
      this.getGameReport()
    },
    showGame(betTarget) {
      return this.selList.game_type[betTarget - 1].name;
    }
  },
  async created() {
    await this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  },
  async mounted() {
    await this.getGameReport()
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
