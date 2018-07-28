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
        prop="title"
        label="標題">
      </el-table-column>
      <el-table-column
        width="180px"
        prop="startAt"
        label="開始時間">
      </el-table-column>
      <el-table-column
        width="180px"
        prop="endAt"
        label="結束時間">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
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
      depositAccList: state => state.Money.DepositAcc.depositAccList,
      depositAccPager: state => state.Money.DepositAcc.depositAccPager,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_DEPOSIT_ACC_DIALOG
    ]),
    onGetItem(item) {
      this.SWITCH_DEPOSIT_ACC_DIALOG(true)
      let formData = Object.assign({},
      this.$refs.DepositAccDialog.form,
      item
      )
      this.$hub.$emit("Money:depositAccFormUpdate", formData)
    },
    async onDelItem(id) {
      await this.$store.dispatch(DEL_DEPOSIT_ACC, id)
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_DEPOSIT_ACC_LIST, {page})
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_DEPOSIT_ACC_LIST)
  },
}
</script>

<style lang="stylus">
</style>
