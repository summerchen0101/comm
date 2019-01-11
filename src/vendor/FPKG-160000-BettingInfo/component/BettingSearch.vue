<template>
  <div id="BettingSearch">
    <SearchBar>
      <el-form :inline="true"
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="類型">
          <el-select v-model="searchForm.type" prop="type">
            <el-option v-for="t in gameList" :key="t.id" :label="t.name" :value="t.id"></el-option>
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
              <WagerCancel :cancel="bettingInfo.cancel"></WagerCancel>
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
              {{typeof bettingInfo.betAmount === 'number' ?  toCurrencyFloor(bettingInfo.betAmount) : "暫無資料"}}
            </td>
          </tr>
          <template v-if="bettingInfo.status != 2 && bettingInfo.status != 3">
            <tr>
              <th>有效金額</th>
              <td>
                {{typeof bettingInfo.realAmount === 'number' ?  toCurrencyFloor(bettingInfo.realAmount) : "暫無資料"}}
              </td>
            </tr>
            <!-- <tr>
              <th>中獎金額</th>
              <td>
                {{typeof bettingInfo.winAmount === 'number' ?  toCurrencyFloor(bettingInfo.winAmount) : "暫無資料"}}
              </td>
            </tr> -->
            <tr>
              <th>會員結果</th>
              <td>
                <span v-if="typeof bettingInfo.betResult === 'number'" :class="$root.handleResultColor(bettingInfo.betResult)">
                  {{ toCurrencyFloor(bettingInfo.betResult) }}
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
            <!-- <tr>
              <th>中獎金額</th>
              <td>-</td>
            </tr> -->
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
import { SET_BREADCRUMB, GET_BETTING_INFO, CLEAR_BETTING_INFO, GAME_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
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
      bettingInfo: state => state.BettingInfo.bettingInfo
    }),
    ...mapGetters({
      gameList: GAME_LIST
    })
  },

  methods: {
    onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.searchForm.gameList = this.gameList[this.searchForm.type - 1];
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
  }
}
</script>

<style lang="stylus">
@import '../style/component/BettingSearch';

.el-tag {
  padding: 0 5px;
  height: 24px;
  line-height: 22px;
}
</style>
