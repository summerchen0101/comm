<template>
  <div id="Account">
    
    <MenuComponent></MenuComponent>
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb :path="breadcrumbPath"></Breadcrumb>
      <div class="main-container">
        <PageTitle>
          <el-button slot="btns" type="primary" @click="SWITCH_ACCOUNT_DIALOG(true)">新增帳號</el-button>
        </PageTitle>

        <!-- 帳號列表 -->
        <el-table
          :data="accountList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="code"
            label="代碼">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名稱">
          </el-table-column>
          <el-table-column
            prop="status"
            label="狀態">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="3" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="onGetItem(scope.row)">編輯</el-button>
              <el-button size="mini" type="danger" @click="onDelItem(scope.row)">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 新增帳號 -->
        <AccountFormDialog ref="AccountFormDialog"></AccountFormDialog>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import AccountFormDialog from '@/vendor/FPKG-90000-Account/component/AccountFormDialog.vue';
import { SWITCH_ACCOUNT_DIALOG, GET_ACCOUNT_LIST, GET_ACCOUNT, ADD_ACCOUNT, DEL_ACCOUNT } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';


export default {
  components: {
    AccountFormDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "帳號管理"},
        // {link: null, title: "帳號管理一"},
      ],
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      accountList: state => state.Account.accountList,
      dialogVisible: state => state.Account.dialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_ACCOUNT_DIALOG
    ]),
    async onGetItem(item) {
      await this.$store.dispatch(GET_ACCOUNT, item)
      this.$refs.AccountFormDialog.form = Object.assign(
        {}, 
        this.$refs.AccountFormDialog.form, 
        this.$store.state.Account.account)
    },
    async onDelItem(item) {
      this.$confirm('確定刪除後將無法復原', '你確定嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DEL_ACCOUNT, item)
      }).catch(() => {
      });
    }
  },
  
  mounted() {
    this.$store.dispatch(GET_ACCOUNT_LIST)
  }
}
</script>

<style lang="stylus">
@import '../style/component/Account'

</style>
