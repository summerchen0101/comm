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
        min-width="100"
        label="訂單編號">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        min-width="120"
        label="帳號(暱稱)">
        <template slot-scope="scope">
          <span>{{scope.row.account}}</span>
          <span>({{scope.row.nick}})</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="depositPoint"
        min-width="120"
        label="存款點數">
      </el-table-column>
      <el-table-column
        prop="payTypeName"
        min-width="120"
        label="付款類型">
      </el-table-column>
      <el-table-column
        v-if="listType == 3"
        prop="reason"
        min-width="120"
        label="原因">
      </el-table-column>
      <el-table-column
        min-width="150"
        label="申請時間">
         <template slot-scope="scope">
           <span>{{getDateTime(scope.row.depositAt)}}</span>
         </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        label="截止時間">
        <template slot-scope="scope">
           <span>{{getDateTime(scope.row.expireAt)}}</span>
         </template>
      </el-table-column>
      <el-table-column
        v-if="listType != 1"
        prop="operator"
        min-width="120"
        label="審核人員">
      </el-table-column>
      <el-table-column
        v-if="listType == 1"
        fixed="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!-- 超商付款(1)及信用卡(3)付款時不用顯示「確定」鍵 -->
          <el-button v-if="[2, 4].indexOf(form.payTypeId) > -1" size="mini" type="success" @click="onConfirm(scope.row)">確定</el-button>
          <el-button size="mini" type="danger" @click="onCancel(scope.row)">取消</el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        fixed="right"
        width="80"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="onCheckInfo(scope.row)">資訊</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="80"
        label="歷程">
        <template slot-scope="scope">
          <el-button size="mini" @click="onCheckHistory">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="depositPager"
              :on-page-changed="onPageChanged"
              :count="depositPager.count"
              :perpage="depositPager.perpage"></Paginator>

    <DepositDialog></DepositDialog>
    <DepositInfoDialog></DepositInfoDialog>
    <HistoryDialog></HistoryDialog>
  </div>
</template>

<script>
import { 
  SET_BREADCRUMB, 
  GET_DEPOSIT_STATUS_LIST, 
  GET_DEPOSIT_INFO, 
  GET_DEPOSIT_LIST,
  SWITCH_DEPOSIT_DIALOG,
  SET_DEPOSIT,
  SWITCH_HISTORY_DIALOG,
  SWITCH_DEPOSIT_INFO_DIALOG,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'
import DepositDialog from '@/vendor/FPKG-150000-Money/component/Deposit/DepositDialog.vue'
import DepositInfoDialog from '@/vendor/FPKG-150000-Money/component/Deposit/DepositInfoDialog.vue'
import DepositHistoryDialog from '@/vendor/FPKG-150000-Money/component/Deposit/DepositHistoryDialog.vue';

export default {
  mixins: [commonTool],
  components: {
    DepositDialog,
    HistoryDialog: DepositHistoryDialog,
    DepositInfoDialog: DepositInfoDialog,
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
      listType: state => state.Money.Deposit.listType,
      statusList: state => state.Money.Deposit.depositStatusList,
      depositPager: state => state.Money.Deposit.depositPager,
      depositInfo: state => state.Money.Deposit.depositInfo,
      depositList: state => state.Money.Deposit.depositList,
    })
  },
  methods: {
    ...mapMutations([
      SWITCH_DEPOSIT_DIALOG,
      SWITCH_DEPOSIT_INFO_DIALOG,
      SET_DEPOSIT,
    ]),
    onCheckHistory() {
      this.$store.commit(SWITCH_HISTORY_DIALOG, true)
    },
    onConfirm(deposit) {
      this.SET_DEPOSIT({...deposit, type: 'confirm'})
      this.SWITCH_DEPOSIT_DIALOG(true)
    },
    onCancel(deposit) {
      this.SET_DEPOSIT({...deposit, type: 'cancel'})
      this.SWITCH_DEPOSIT_DIALOG(true)
    },
    onCheckInfo(deposit) {
      this.SET_DEPOSIT({...deposit, type: 'check'})
      this.SWITCH_DEPOSIT_INFO_DIALOG(true)
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
