<template>
  <div id="DepositAcc">
    <PageTitle title="存款帳戶管理">
      <el-button slot="btns" type="primary" @click="SWITCH_DEPOSIT_ACC_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>

    <!-- 存款帳戶列表 -->
    <el-table
      :data="depositAccList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="bankCode"
        width="150px"
        label="銀行代碼">
      </el-table-column>
      <el-table-column
        prop="branchName"
        width="100px"
        label="分行名稱">
      </el-table-column>
      <el-table-column
        prop="accountName"
        label="戶名">
      </el-table-column>
      <el-table-column
        prop="bankAccount"
        show-overflow-tooltip
        width="150px"
        label="銀行帳號">
      </el-table-column>
      <el-table-column
        prop="checkingPoint"
        label="審核中存點">
      </el-table-column>
      <el-table-column
        prop="savedPoint"
        label="已入帳存點">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="280">
        <template slot-scope="scope">
          <el-switch 
              style="margin-right: 7px"
              :value="scope.row.isPrimary" 
              @click.native="onPrimaryChanged(scope.row)"></el-switch>
          <el-button size="mini" type="success" @click="onClearPoint(scope.row.id)">清空</el-button>
          <el-button size="mini" type="info" @click="onGetItem(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDelItem(scope.row.id)">刪除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="歷程"
        width="80">
        <template slot-scope="scope">
          <el-button size="mini">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="depositAccPager"
              :on-page-changed="onPageChanged"
              :count="depositAccPager.count"
              :perpage="depositAccPager.perpage"></Paginator>


    <!-- 新增存款帳戶 -->
    <DepositAccDialog ref="DepositAccDialog"></DepositAccDialog>

  </div>
</template>

<script>
import DepositAccDialog from '@/vendor/FPKG-150000-Money/component/DepositAccDialog.vue';
import { 
  GET_DEPOSIT_ACC_LIST, 
  SWITCH_DEPOSIT_ACC_DIALOG,
  DEL_DEPOSIT_ACC,
  SET_BREADCRUMB,
  GET_BANK_LIST,
  SET_PRIMARY_DEPOSIT_ACC,
  CLEAR_DEPOSIT_ACC_POINT,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    DepositAccDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "存提管理"},
        {link: null, title: "存款帳戶管理"},
      ]
    }
  },
  computed: {
    ...mapState({
      bankList: state => state.Global.bankList,
      depositAccList: state => state.Money.DepositAcc.depositAccList,
      depositAccPager: state => state.Money.DepositAcc.depositAccPager,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_DEPOSIT_ACC_DIALOG
    ]),
    onPrimaryChanged(t) {
      if(!t.isPrimary) {
        this.$confirm('確定修改此銀行帳號為會員存款帳號', '你確定嗎？', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(SET_PRIMARY_DEPOSIT_ACC, t)
        }).catch(() => {        
        });
      }
    },
    onClearPoint(id) {
      this.$confirm('確定清空此銀行帳號之已入帳存點', '你確定嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(CLEAR_DEPOSIT_ACC_POINT, id)
      }).catch(() => {        
      });
    },
    onGetItem(item) {
      this.SWITCH_DEPOSIT_ACC_DIALOG(true)
      let formData = Object.assign({},
      this.$refs.DepositAccDialog.form,
      item
      )
      this.$hub.$emit("Money:depositAccFormUpdate", formData)
    },
    async onDelItem(id) {
      this.$confirm('確定刪除後將無法復原', '你確定嗎？', {
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
        confirmButtonClass: 'el-button--danger',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DEL_DEPOSIT_ACC, id)
      }).catch(() => {        
      });
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_DEPOSIT_ACC_LIST, {page})
    }
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_DEPOSIT_ACC_LIST)
  },
}
</script>

<style lang="stylus">
</style>
