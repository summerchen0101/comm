<template>
  <div id="WinloseInfo">
    <div class="table-responsive mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>帳號</th>
            <th width="15%">有效金額</th>
            <th width="15%">會員結果</th>
            <th width="15%">佣金結果</th>
          </tr>
        </thead>
        <tbody v-if="report.length > 0">
          <tr v-for="(r, i) in report" :key="i">
            <td>{{r.account}}({{r.nickname}})</td>
            <td>{{toCurrencyFloor(r.amount)}}</td>
            <td :class="handleResultColor(r.memberResult)">{{toCurrencyFloor(r.memberResult)}}</td>
            <td>{{toCurrencyFloor(r.commission)}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4" class="text-center">暫無資料</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginator
      :count="winlosePager.total"
      :on-page-changed="onPageChanged"
      :perpage="winlosePager.perPage" />
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_WINLOSE_REPORT, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  data() {
    return {
      searchForm: {
        startAt: "",
        endAt: "",
        game_kind: 0,
        per_page: 25,
        sort: "payoff",
      },
    }
  },
  watch: {
    $route: "getWinloseReport",
  },
  computed: {
    ...mapState({
      report: state => state.Report.Winlose.report,
      winlosePager: state => state.Report.Winlose.winlosePager,
    })
  },
  methods: {
    setSearchForm() {
      const { params } = this.$route;
      this.searchForm = {
        startAt: params.startAt,
        endAt: params.endAt,
        game_kind: params.game_kind,
        per_page: params.per_page,
        sort: params.sort,
      };
    },
    getWinloseReport() {
      this.setSearchForm();
      this.$store.dispatch(GET_WINLOSE_REPORT, this.searchForm);
    },
    onPageChanged(page) {
      this.setSearchForm();
      this.$store.dispatch(GET_WINLOSE_REPORT, { ...this.searchForm, page });
    }
  },
  mounted() {
    this.getWinloseReport();
  },
}
</script>

<style lang="stylus">
</style>
