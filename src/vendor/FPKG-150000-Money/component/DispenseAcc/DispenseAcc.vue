<template>
  <div id="DispenseAcc">
    <PageTitle title="出款帳戶管理">
      <el-button slot="btns" type="primary" @click="SWITCH_DISPENSE_ACC_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>

    <!-- 出款帳戶列表 -->
    <el-table
      :data="dispenseAccList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="bankCode"
        width="150"
        label="銀行代碼">
      </el-table-column>
      <el-table-column
        prop="branchName"
        width="100"
        label="分行名稱">
      </el-table-column>
      <el-table-column
        prop="accountName"
        label="戶名">
      </el-table-column>
      <el-table-column
        prop="bankAccount"
        show-overflow-tooltip
        min-width="150"
        label="銀行帳號">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="onGetItem(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDelItem(scope.row.id)">刪除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="歷程"
        width="80">
        <template slot-scope="scope">
          <el-button size="mini" :class="{'history-active': scope.row.operation}" :disabled="!scope.row.operation" @click="onCheckHistory(scope.row.id)">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="dispenseAccPager"
              :on-page-changed="onPageChanged"
              :count="dispenseAccPager.count"
              :perpage="dispenseAccPager.perpage"></Paginator>


    <!-- 新增出款帳戶 -->
    <DispenseAccDialog ref="DispenseAccDialog"></DispenseAccDialog>
    <HistoryDialog></HistoryDialog>

  </div>
</template>

<script>
import DispenseAccDialog from '@/vendor/FPKG-150000-Money/component/DispenseAcc/DispenseAccDialog.vue';
import { 
  GET_DISPENSE_ACC_LIST, 
  SWITCH_DISPENSE_ACC_DIALOG,
  DEL_DISPENSE_ACC,
  SET_BREADCRUMB,
  GET_BANK_LIST,
  GET_HISTORY,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    DispenseAccDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "存提管理"},
        {name: null, title: "出款帳戶管理"},
      ]
    }
  },
  computed: {
    ...mapState({
      bankList: state => state.Global.bankList,
      dispenseAccList: state => state.Money.DispenseAcc.dispenseAccList,
      dispenseAccPager: state => state.Money.DispenseAcc.dispenseAccPager,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_DISPENSE_ACC_DIALOG,
    ]),
    onCheckHistory(id) {
      this.$store.dispatch(GET_HISTORY, {
          funcKey: this.$attrs.funcKey, 
          id,
          title: "出款帳戶修改歷程"
        })
    },
    onGetItem(item) {
      this.SWITCH_DISPENSE_ACC_DIALOG(true)
      let formData = Object.assign({},
      this.$refs.DispenseAccDialog.form,
      item
      )
      this.$hub.$emit("Money:dispenseAccFormUpdate", formData)
    },
    async onDelItem(id) {
      this.$confirm('確定刪除後將無法復原', '你確定嗎？', {
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
        confirmButtonClass: 'el-button--danger',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DEL_DISPENSE_ACC, id)
      }).catch(() => {        
      });
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_DISPENSE_ACC_LIST, {page})
    }
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_BANK_LIST)
    this.$store.dispatch(GET_DISPENSE_ACC_LIST)
  },
}
</script>

<style lang="stylus">
</style>
