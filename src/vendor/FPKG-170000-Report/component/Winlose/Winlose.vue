<template>
  <div id="Winlose">
    <SearchBar>
      <el-form :inline="true"
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="結帳日期">
          <el-select v-model="searchForm.startAt" @change="onWeekChanged">
            <el-option v-for="i in weekOpts" :label="i.option" :value="i.value" :key="i.value"></el-option>
          </el-select>
          ~
          <el-select v-model="searchForm.endAt" @change="onWeekChanged">
            <el-option v-for="i in weekOpts" :label="i.option" :value="i.value" :key="i.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="遊戲" prop="game">
          <el-select v-model="searchForm.game">
            <el-option v-for="game in gameTypeOpts" :value="game.id" :label="game.name" :key="game.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每頁筆數" prop="perPage">
          <el-select v-model="searchForm.perPage">
            <el-option v-for="n in perPageOpts" :value="n.num" :label="n.num" :key="n.num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序依據" prop="sort">
          <el-select v-model="searchForm.sort">
            <el-option v-for="t in sortOpts" :key="t.id" :value="t.id" :label="t.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <p class="help-text">＊一次可查的時間範圍為2個月</p>

    <router-view></router-view>
  </div>
</template>

<script>
import {
  SET_BREADCRUMB,
  GET_COMMISSION_WEEKS_OPTIONS,
  GET_GAME_TYPE_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {

  },
  data() {
    return {
      breadcrumbPath: [
        { name: "Home", title: "首頁" },
        { name: null, title: "報表查詢" },
        { name: null, title: "輸贏分析" },
      ],
      searchForm: {
        startAt: "",
        endAt: "",
        game: 0,
        perPage: 25,
        sort: "payoff",
        page: 1,
      },
      perPageOpts: [
        { num: 25, },
        { num: 50, },
        { num: 100, },
      ],
      sortOpts: [
        { id: 'payoff', name: '會員結果', },
        { id: 'brokerage', name: '佣金結果', },
        { id: 'feat', name: '有效金額', },
      ],
      searchFormRules: {
      },
    }
  },
  computed: {
    ...mapState({
      gameTypeOpts: state => state.Global.gameTypeOpts,
      weekOpts: state => state.Global.commissionWeeksOpts,
    }),
  },
  methods: {
    onWeekChanged() {
      if (this.searchForm.startAt > this.searchForm.endAt ) {
        this.searchForm.endAt = this.searchForm.startAt
      }
    },
    setSearchForm() {
      this.searchForm = Object.assign({}, this.searchForm, {
        startAt: this.$route.params.startAt || this.weekOpts[this.weekOpts.length-1].value,
        endAt: this.$route.params.endAt || this.weekOpts[this.weekOpts.length-1].value,
        game: this.$route.params.game || 0,
        per_page: this.$route.params.per_page || 25,
        sort: this.$route.params.sort || "payoff",
        page: this.$route.params.page || 1,
      })
    },
    onSearchSubmit() {
      const { searchForm } = this;
      this.$router.push(
        {
          name: "WinloseInfo",
          params: {
            startAt: searchForm.startAt,
            endAt: searchForm.endAt,
            game_kind: searchForm.game,
            per_page: searchForm.perPage,
            sort: searchForm.sort,
            page: searchForm.page,
          }
        }
      )
    },
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_GAME_TYPE_OPTIONS, { all: "show" })
    await this.$store.dispatch(GET_COMMISSION_WEEKS_OPTIONS)
    this.setSearchForm();
  },
}
</script>

<style lang="stylus">
#Winlose {
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 180px;
  }

  table {
    th, td {
      font-size: 13px;
      color: #555;
    }

    th {
      background-color: #eee;
    }
  }
}
</style>

