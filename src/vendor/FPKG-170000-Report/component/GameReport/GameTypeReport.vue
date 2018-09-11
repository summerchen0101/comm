<template>
  <div v-if="info" id="GameTypeReport">
    <div class="table-responsive mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="40%">類別</th>
            <th width="12%">筆數</th>
            <th width="12%">投注金額</th>
            <th width="12%">有效金額</th>
            <th width="12%">中獎金額</th>
            <th width="12%">遊戲結果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{info.gameType}}</td>
            <td>{{$root.toCurrency(info.count)}}</td>
            <td>{{$root.toCurrencyDecimal(info.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(info.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(info.winAmount)}}</td>
            <td :class="$root.handleResultColor(info.result)">{{$root.toCurrencyDecimal(info.result)}}</td>
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
            <th width="12%">遊戲結果</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r,i in report" :key="i">
            <td>
              <router-link :to="{name: 'GamePlayReport', params: Object.assign({}, $route.params, {
                  gamePlayId: r.gamePlayId
                })}">
                {{r.gamePlay}}
              </router-link>
            </td>
            <td>{{$root.toCurrency(r.count)}}</td>
            <td>{{$root.toCurrencyDecimal(r.betAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(r.realAmount)}}</td>
            <td>{{$root.toCurrencyDecimal(r.winAmount)}}</td>
            <td :class="$root.handleResultColor(r.result)">{{$root.toCurrencyDecimal(r.result)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_GAME_TYPE_REPORT } from '@/vendor/FPKG-40000-VuexStore/constants'
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
      gameTypeIndex: gameType.findIndex(g => g.value == this.$route.params.gameTypeId)
    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      info: state => state.Report.GameReport.gameTypeInfo,
      report: state => state.Report.GameReport.gameTypeReport
    }),
    breadcrumbPath() {
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: "GameTotalReport", title: "遊戲報表", params: {...this.$route.params}},
        {name: null, title: gameType[this.gameTypeIndex].label},
      ]
    }
  },
  methods: {
    getGameTypeReport() {
      let params = this.$route.params
      this.$store.dispatch(GET_GAME_TYPE_REPORT, {
        startAt: params.startAt,
        endAt: params.endAt,
        gameTypeId: params.gameTypeId
      })
    }
  },
  created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  },
  mounted() {
    this.getGameTypeReport()
  }
}
</script>

<style lang="stylus">
</style>
