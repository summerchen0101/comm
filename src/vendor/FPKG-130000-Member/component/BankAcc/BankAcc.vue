<template>
  <div id="BankAcc">
    <PageTitle>
      <el-select slot="btns" v-model="searchForm.status">
        <el-option
          v-for="opt in statusOpts"
          :key="opt.id"
          :label="opt.name"
          :value="opt.id">
        </el-option>
      </el-select>
    </PageTitle>
    <SearchBar v-if="searchForm.status !== 1">
      <el-form :inline="true"
                ref="searchForm"
                status-icon
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="會員" prop="account">
          <el-input v-model="searchForm.account" placeholder="搜尋帳號"></el-input>
        </el-form-item>
        <el-form-item label="銀行帳號" prop="backAccount">
          <el-input v-model="searchForm.bankAccount" placeholder="搜尋銀行帳號"></el-input>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <el-table
      :data="bankAccList"
      stripe
      style="width: 100%">
      <el-table-column
        width="180"
        label="帳號(暱稱)">
        <template slot-scope="scope">
          <span>{{scope.row.account}}</span>
          <span>({{scope.row.nick}})</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        prop="bankName"
        label="銀行代碼">
      </el-table-column>
      <el-table-column
        width="120"
        prop="branchName"
        label="分行名稱">
      </el-table-column>
      <el-table-column
        width="120"
        prop="accountName"
        label="戶名">
      </el-table-column>
      <el-table-column
        width="180"
        prop="bankAccount"
        label="銀行帳號">
      </el-table-column>
      <el-table-column
        min-width="150"
        label="申請時間">
         <template slot-scope="scope">
           <span>{{toDateTime(scope.row.createdAt)}}</span>
         </template>
      </el-table-column>
      <el-table-column
        v-if="listType != 1"
        key="operator"
        width="120"
        prop="operator"
        label="審核人員">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <template v-if="listType == 1">
            <el-button size="mini" type="success" @click="onReview('confirm', scope.row)">通過</el-button>
            <el-button size="mini" type="danger" @click="onReview('cancel', scope.row)">未過</el-button>
          </template>
          <template v-if="listType == 2">
            <el-button size="mini" type="info" @click="onReview('edit', scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="onReview('cancel', scope.row)">未過</el-button>
          </template>
          <template v-if="listType == 3">
            <el-button size="mini" type="info" @click="onReview('info', scope.row)">資訊</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-if="listType == 2"
        fixed="right"
        key="history"
        label="歷程"
        width="80">
        <template slot-scope="scope">
          <el-button size="mini" :class="{'history-active': scope.row.operation}" :disabled="!scope.row.operation" @click="onCheckHistory(scope.row.id)">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="bankAccPager"
              :on-page-changed="onPageChanged"
              :count="bankAccPager.count"
              :perpage="bankAccPager.perpage"></Paginator>
    <BankAccDialog ref="BankAccDialog"></BankAccDialog>
    <HistoryDialog ></HistoryDialog>
  </div>
</template>

<script>
import {
  SET_BREADCRUMB,
  GET_STATUS_OPTIONS,
  GET_BANK_ACC_LIST,
  GET_HISTORY,
  SWITCH_BANK_ACC_DIALOG,
  SET_BANK_ACC,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'
import BankAccDialog from '@/vendor/FPKG-130000-Member/component/BankAcc/BankAccDialog.vue'
import { memberAccountValidator } from '@/vendor/FPKG-120000-Util/customValidate'

export default {
  mixins: [commonTool],
  components: {
    BankAccDialog
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "會員資訊"},
        {name: null, title: "銀行帳戶管理"},
      ],
      searchForm: {
        status: 1,
        account: "",
        bankAccount: "",
      },
      searchFormRules: {
        account: [
          { validator: memberAccountValidator, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      statusOpts: state => state.Global.statusOpts,
      bankAccList: state => state.Member.BankAcc.bankAccList,
      bankAccPager: state => state.Member.BankAcc.bankAccPager,
      listType: state => state.Member.BankAcc.listType,
    }),
  },
  methods: {
    onCheckHistory(id) {
      this.$store.dispatch(GET_HISTORY, {
          funcKey: this.$attrs.funcKey,
          id,
          title: "銀行帳戶修改歷程"
        })
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_BANK_ACC_LIST, {
        ...this.searchForm,
        page
      })
    },
    onReview(type, item) {
      this.$store.commit(SET_BANK_ACC, {
        type,
        ...item
      })
      this.$store.commit(SWITCH_BANK_ACC_DIALOG, true)
    },
    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(GET_BANK_ACC_LIST, this.searchForm)
        }
      });
    }
  },
  mounted() {
    this.$hub.$on("Member:BankAcc:updateList", () => {
      this.$store.dispatch(GET_BANK_ACC_LIST, this.searchForm)
    })
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_STATUS_OPTIONS)
    this.$store.dispatch(GET_BANK_ACC_LIST, this.searchForm)
  }
}
</script>

<style lang="stylus">
</style>
