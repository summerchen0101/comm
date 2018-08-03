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
            <td>{{info.count}}</td>
            <td>{{info.betAmount}}</td>
            <td>{{info.realAmount}}</td>
            <td>{{info.winAmount}}</td>
            <td class="text-danger">{{info.result}}</td>
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
            <td>{{r.number}}</td>
            <td>
              <span>{{r.betTime}}</span><br>
              <span class="text-info">{{r.ip}}</span>
            </td>
            <td>{{r.betTarget}}</td>
            <td>{{r.betAmount}}</td>
            <td>{{r.realAmount}}</td>
            <td>{{r.winAmount}}</td>
            <td class="text-danger">{{r.result}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_MEMBER_GAME_REPORT } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'
import { mapState } from 'vuex';
import { gameType } from '@/vendor/FPKG-10000-Config/enum'

export default {
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
    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      info: state => state.Report.MemberReport.Game.info,
      report: state => state.Report.MemberReport.Game.report
    }),
    breadcrumbPath() {
      let gameTypeIndex = gameType.findIndex(g => g.value == this.$route.params.gameTypeId)
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: null, title: "會員報表"},
        {name: "MemberReportInfo", title: this.$route.params.account, params: this.$route.params},
        {name: null, title: gameType[gameTypeIndex].label},
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
        gameTypeId: params.gameTypeId
      })
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
#MemberGameReport 
  table 
    th, td 
      font-size: 14px
      color: #555
    th 
      background-color: #eee 
</style>
