<template>
  <div id="Deposit">
    <!-- <PageTitle title="存款管理">
      <el-button slot="btns" type="primary" @click="SWITCH_MARQUEE_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle> -->
    <el-select v-model="searchForm.status">
      <el-option
        v-for="opt in statusList"
        :key="opt.id"
        :label="opt.name"
        :value="opt.id">
      </el-option>
    </el-select>
    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="編號">
          <el-input v-model="searchForm.number" placeholder="搜尋訂單編號"></el-input>
        </el-form-item>
        <el-form-item label="會員">
          <el-input v-model="searchForm.account" placeholder="搜尋帳號"></el-input>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <div class="CountBox">
      <div class="total">總點數：{{toCurrency(depositInfo.total)}}</div>
      <div class="count">總筆數：{{toCurrency(depositInfo.count)}}</div>
    </div>

    <!-- 訂單列表 -->
    <el-table
      :data="depositList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="number"
        label="訂單編號">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        label="帳號(暱稱)">
        <template slot-scope="scope">
          <span>{{scope.row.account}}</span>
          <span>({{scope.row.nick}})</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="depositPoint"
        label="存款點數">
      </el-table-column>
      <el-table-column
        prop="payType"
        label="付款類型">
      </el-table-column>
      <el-table-column
        label="申請時間">
         <template slot-scope="scope">
           <span>{{getDateTime(scope.row.depositAt)}}</span>
         </template>
      </el-table-column>
      <el-table-column
        label="截止時間">
        <template slot-scope="scope">
           <span>{{getDateTime(scope.row.expireAt)}}</span>
         </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="150px"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="onCheck(scope.row)">確定</el-button>
          <el-button size="mini" type="danger" @click="onCancel(scope.row)">取消</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="80px"
        label="歷程">
        <template slot-scope="scope">
          <el-button size="mini">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="depositPager"
              :on-page-changed="onPageChanged"
              :count="depositPager.count"
              :perpage="depositPager.perpage"></Paginator>


  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_DEPOSIT_STATUS_LIST, GET_DEPOSIT_INFO, GET_DEPOSIT_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "存提管理"},
        {link: null, title: "存款管理"},
      ],
      searchForm: {
        status: 1,
        number: "",
        account: "",
      },
      searchFormRules: {
        account: [
          { min: 4, max: 12, message: '至少需4~12碼英數字', trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    ...mapState({
      statusList: state => state.Money.depositStatusList,
      depositPager: state => state.Money.depositPager,
      depositInfo: state => state.Money.depositInfo,
      depositList: state => state.Money.depositList,
    })
  },
  methods: {

    onCheck() {

    },
    onCancel() {

    },
    onPageChanged() {

    },

    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(GET_DEPOSIT_INFO, this.searchForm)
          this.$store.dispatch(GET_DEPOSIT_LIST, this.searchForm)
        }
      });
      
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_DEPOSIT_STATUS_LIST)
  }
}
</script>

<style lang="stylus">
.CountBox
  display: flex
  justify-content: flex-end
  > div 
    font-size: 12px
    color: #333
    padding: 5px 10px
    margin: 10px 0
    margin-left: 5px
    &.count 
      background-color: #ddd
    &.total 
      background-color: #eee
</style>
