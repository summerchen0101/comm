<template>
  <div id="BettingSearch">
    <SearchBar>
      <el-form :inline="true"
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="類型">
          <el-select v-model="searchForm.type" prop="type">
            <el-option v-for="t in gameTypeOpts" :key="t.id" :label="t.name" :value="t.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注單編號" prop="number">
          <el-input v-model="searchForm.number" placeholder="搜尋注單編號"></el-input>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <div class="table-responsive mt-3" v-if="bettingInfo">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>注單編號</th>
            <td>
              {{bettingInfo.number || "暫無資料"}}
              <span v-if="bettingInfo.betStatus != ''" class="el-tag el-tag--danger">{{bettingInfo.betStatus}}</span>
            </td>
          </tr>
          <tr>
            <th>下注時間</th>
            <td>{{bettingInfo.betTime ? toShortDateTime(bettingInfo.betTime) : "暫無資料"}}</td>
          </tr>
          <tr>
            <th>IP</th>
            <td>{{bettingInfo.ip || "暫無資料"}}</td>
          </tr>
          <tr>
            <th>帳號(暱稱)</th>
            <td v-if="bettingInfo.account">
              {{bettingInfo.account}}
              ({{bettingInfo.nick}})
            </td>
            <td v-else>暫無資料</td>
          </tr>
          <tr>
            <th>遊戲</th>
            <td>{{bettingInfo.gameType || "暫無資料"}}</td>
          </tr>
          <tr>
            <th>投注內容</th>
            <td>{{bettingInfo.betTarget || "暫無資料"}}</td>
          </tr>
          <tr>
            <th>投注金額</th>
            <td>
              {{typeof bettingInfo.betAmount === 'number' ?  toCurrencyDecimal(bettingInfo.betAmount) : "暫無資料"}}
            </td>
          </tr>
          <template v-if="bettingInfo.status != 2 && bettingInfo.status != 3">
            <tr>
              <th>有效金額</th>
              <td>
                {{typeof bettingInfo.realAmount === 'number' ?  toCurrencyDecimal(bettingInfo.realAmount) : "暫無資料"}}
              </td>
            </tr>
            <tr>
              <th>中獎金額</th>
              <td>
                {{typeof bettingInfo.winAmount === 'number' ?  toCurrencyDecimal(bettingInfo.winAmount) : "暫無資料"}}
              </td>
            </tr>
            <tr>
              <th>會員結果</th>
              <td>
                <span v-if="typeof bettingInfo.betResult === 'number'" :class="$root.handleResultColor(bettingInfo.betResult)">
                  {{ toCurrencyDecimal(bettingInfo.betResult) }}
                </span>
                <span v-else>暫無資料</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <th>有效金額</th>
              <td>-</td>
            </tr>
            <tr>
              <th>中獎金額</th>
              <td>-</td>
            </tr>
            <tr>
              <th>會員結果</th>
              <td>-</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_BETTING_INFO, CLEAR_BETTING_INFO, GET_GAME_TYPE_OPTIONS, GET_GAME_LIST_OPTIONS } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'


export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "注單資訊"},
        {name: null, title: "注單查詢"},
      ],
      searchForm: {
        type: 2,
        number: ""
      },
      searchFormRules: {
        type: [
          { required: true, message: '類型為必填', trigger: 'blur' },
        ],
        number: [
          { required: true, message: '注單編號為必填', trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    ...mapState({
      bettingInfo: state => state.BettingInfo.bettingInfo,
      gameTypeOpts: state => state.Global.gameTypeOpts,
      gameListOpts: state => state.Global.gameListOpts
    })
  },

  methods: {
    onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.searchForm.gameListOpts = _.find(this.gameListOpts, ['id', this.searchForm.type])
          this.$store.dispatch(GET_BETTING_INFO, this.searchForm)
        }
      });
    }
  },
  created() {
    this.searchForm = {
      type: 2,
      number: ""
    };
    this.$store.commit(CLEAR_BETTING_INFO)
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_GAME_TYPE_OPTIONS)
    await this.$store.dispatch(GET_GAME_LIST_OPTIONS)
  }
}
</script>

<style lang="stylus">
@import '../style/component/BettingSearch'
.el-tag {
  padding: 0 5px;
  height: 24px;
  line-height: 22px;
}
</style>
