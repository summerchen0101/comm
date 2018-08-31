<template>
  <div id="Withdraw">
    <el-select v-model="searchForm.status">
      <el-option
        v-for="opt in statusOpts.filter(t => t.id !== 2)"
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
        <el-form-item label="時間" v-if="searchForm.status !== 1">
          <el-date-picker
            v-model="searchForm.startAt"
            format="yyyy-MM-dd HH:mm"
            :picker-options="startAtOption"
            type="datetime"
            @change="onStartAtChanged"
            placeholder="開始時間">
          </el-date-picker>
          -
          <el-date-picker
            v-model="searchForm.endAt"
            format="yyyy-MM-dd HH:mm"
            :picker-options="endAtOption"
            type="datetime"
            placeholder="結束時間">
          </el-date-picker>
        </el-form-item>
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
      <div class="total">總點數：{{$root.toCurrency(withdrawInfo.total)}}</div>
      <div class="count">總筆數：{{$root.toCurrency(withdrawInfo.count)}}</div>
    </div>

    <!-- 訂單列表 -->
    <el-table
      :data="withdrawList"
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
        min-width="120"
        label="提領點數">
        <template slot-scope="scope">
          {{$root.toCurrency(scope.row.withdrawPoint)}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="listType == 3"
        key="reason"
        prop="reason"
        min-width="120"
        class-name="red"
        label="原因">
      </el-table-column>
      <el-table-column
        min-width="150"
        label="申請時間">
         <template slot-scope="scope">
           <span>{{toShortDateTime(scope.row.withdrawAt)}}</span>
         </template>
      </el-table-column>
      <el-table-column
        v-if="listType == 3"
        key="operator"
        prop="operator"
        min-width="120"
        label="審核人員">
      </el-table-column>
      <el-table-column
        v-if="listType == 1"
        key="control"
        fixed="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="onConfirm(scope.row)">確定</el-button>
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
    </el-table>
    <Paginator v-if="withdrawPager"
              :on-page-changed="onPageChanged"
              :count="withdrawPager.count"
              :perpage="withdrawPager.perpage"></Paginator>

    <WithdrawDialog ref="WithdrawDialog"></WithdrawDialog>
    <WithdrawInfoDialog></WithdrawInfoDialog>
  </div>
</template>

<script>
import { 
  SET_BREADCRUMB, 
  GET_STATUS_OPTIONS, 
  GET_WITHDRAW_INFO, 
  GET_WITHDRAW_LIST,
  SWITCH_WITHDRAW_DIALOG,
  SET_WITHDRAW,
  SWITCH_WITHDRAW_INFO_DIALOG,
  GET_FEE_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'
import WithdrawDialog from '@/vendor/FPKG-150000-Money/component/Withdraw/WithdrawDialog.vue'
import WithdrawInfoDialog from '@/vendor/FPKG-150000-Money/component/Withdraw/WithdrawInfoDialog.vue'
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'

export default {
  mixins: [commonTool],
  components: {
    WithdrawDialog,
    WithdrawInfoDialog: WithdrawInfoDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "存提管理"},
        {name: null, title: "提款管理"},
      ],
      searchForm: {
        status: 1,
        number: "",
        account: "",
        startAt: startAtDay(new Date()),
        endAt: endAtDay(new Date()),
      },
      searchFormRules: {
        account: [
          { min: 4, max: 12, message: '至少需4~12碼英數字', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      listType: state => state.Money.Withdraw.listType,
      statusOpts: state => state.Global.statusOpts,
      withdrawPager: state => state.Money.Withdraw.withdrawPager,
      withdrawInfo: state => state.Money.Withdraw.withdrawInfo,
      withdrawList: state => state.Money.Withdraw.withdrawList,
    }),
    startAtOption() {
      return {
        disabledDate: (val) => {
          return dateBefore(startAtDay(moment(new Date()).subtract(9, 'day')), val) || dateAfter(new Date(), val)
        }
      }
    },
    endAtOption() {
      return {
        disabledDate: (val) => {
          return dateBefore(this.searchForm.startAt, val) || dateAfter(new Date(), val) 
        }
      }
    },
  },
  methods: {
    ...mapMutations([
      SWITCH_WITHDRAW_DIALOG,
      SWITCH_WITHDRAW_INFO_DIALOG,
      SET_WITHDRAW,
    ]),
    onConfirm(withdraw) {
      this.$refs.WithdrawDialog.type = 'confirm'
      this.SET_WITHDRAW(withdraw)
      this.SWITCH_WITHDRAW_DIALOG(true)
    },
    onCancel(withdraw) {
      this.$refs.WithdrawDialog.type = 'cancel'
      this.SET_WITHDRAW(withdraw)
      this.SWITCH_WITHDRAW_DIALOG(true)
    },
    onCheckInfo(withdraw) {
      this.$refs.WithdrawDialog.type = 'check'
      this.SET_WITHDRAW(withdraw)
      this.SWITCH_WITHDRAW_INFO_DIALOG(true)
    },
    onStartAtChanged() {
      // 若結束時間大於開始時間則清空結束時間
      if(dateAfter(this.searchForm.endAt, this.searchForm.startAt)) {
        this.searchForm.endAt = ""
      }
      
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_WITHDRAW_LIST, {
        ...this.searchForm,
        page
      })
    },

    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(GET_WITHDRAW_INFO, this.searchForm)
          this.$store.dispatch(GET_WITHDRAW_LIST, this.searchForm)
        }
      });
      
    }
  },
  created() {
    this.$hub.$on("withdraw:UpdateList", () => {
      this.$store.dispatch(GET_WITHDRAW_LIST, this.searchForm)
    })
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_FEE_LIST)
    this.$store.dispatch(GET_STATUS_OPTIONS)
    this.$store.dispatch(GET_WITHDRAW_INFO, this.searchForm)
    this.$store.dispatch(GET_WITHDRAW_LIST, this.searchForm)
  }
}
</script>

<style lang="stylus">
@import '../../style/component/Withdraw'
</style>
