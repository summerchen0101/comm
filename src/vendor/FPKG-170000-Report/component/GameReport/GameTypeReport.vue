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
            <th width="12%">會員結果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{nowGame}}</td>
            <td>{{$root.toCurrency(info.count)}}</td>
            <td>{{$root.toCurrencyFloor(info.betAmount)}}</td>
            <td>{{$root.toCurrencyFloor(info.realAmount)}}</td>
            <td>{{$root.toCurrencyFloor(info.winAmount)}}</td>
            <td :class="$root.handleResultColor(info.result)">{{$root.toCurrencyFloor(info.result)}}</td>
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
        <tbody>
          <tr v-for="r,i in report" :key="i">
            <td>
              <router-link :to="{name: 'GamePlayReport', params: Object.assign({}, $route.params, {
                  gamePlayId: r.gamePlayId
                })}">
                {{showGame(r.gamePlayId)}}
              </router-link>
            </td>
            <td>{{$root.toCurrency(r.count)}}</td>
            <td>{{$root.toCurrencyFloor(r.betAmount)}}</td>
            <td>{{$root.toCurrencyFloor(r.realAmount)}}</td>
            <td>{{$root.toCurrencyFloor(r.winAmount)}}</td>
            <td :class="$root.handleResultColor(r.result)">{{$root.toCurrencyFloor(r.result)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_GAME_TYPE_REPORT, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'
import { mapState, mapGetters } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      nowGame: '',
      selList: {}
    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      info: state => state.Report.GameReport.gameTypeInfo,
      report: state => state.Report.GameReport.gameTypeReport,
    }),
    ...mapGetters({
      gameList: GAME_LIST
    }),
    breadcrumbPath() {
      let self = this
      let gameList = self.gameList[this.$route.params.gameTypeId - 1]
      self.selList = gameList.list.game_type
      self.nowGame = gameList.name;
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: "GameTotalReport", title: "遊戲報表", params: {...this.$route.params}},
        {name: null, title: self.nowGame},
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
    },
    showGame(betTarget) {
      return this.selList[betTarget - 1].name
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
