<template>
  <div id="Branch">
    
    <MenuComponent></MenuComponent>
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb :path="breadcrumbPath"></Breadcrumb>
      <div class="main-container">
        <PageTitle>
          <el-button slot="btns" type="primary" @click="SWITCH_BRANCH_DIALOG(true)">新增站台</el-button>
        </PageTitle>

        <!-- 站台列表 -->
        <el-table
          :data="branchList"
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

        <!-- 新增站台 -->
        <BranchFormDialog ref="BranchFormDialog"></BranchFormDialog>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import Menu from '@/vendor/FPKG-70000-Dashboard/component/Menu.vue';
import MobileMenu from '@/vendor/FPKG-70000-Dashboard/component/MobileMenu.vue';
import Validation from '@/vendor/FPKG-110000-Widget/component/Validation.vue';
import PageTitle from '@/vendor/FPKG-110000-Widget/component/PageTitle.vue';
import LoadingCover from '@/vendor/FPKG-110000-Widget/component/LoadingCover.vue';
import BranchFormDialog from '@/vendor/FPKG-80000-Branch/component/BranchFormDialog.vue';
import { SWITCH_BRANCH_DIALOG, GET_BRANCH_LIST, GET_BRANCH, ADD_BRANCH, DEL_BRANCH } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';


export default {
  components: {
    MenuComponent: Menu,
    MobileMenu,
    Validation,
    PageTitle,
    BranchFormDialog,
    LoadingCover,
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "站台管理"},
        // {link: null, title: "站台管理一"},
      ],
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      branchList: state => state.Branch.branchList,
      dialogVisible: state => state.Branch.dialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_BRANCH_DIALOG
    ]),
    async onGetItem(item) {
      await this.$store.dispatch(GET_BRANCH, item)
      this.$refs.BranchFormDialog.form = Object.assign(
        {}, 
        this.$refs.BranchFormDialog.form, 
        this.$store.state.Branch.branch)
    },
    async onDelItem(item) {
      await this.$store.dispatch(DEL_BRANCH, item)
    }
  },
  
  mounted() {
    this.$store.dispatch(GET_BRANCH_LIST)
  }
}
</script>

<style lang="stylus">
@import '../style/component/Branch'

</style>
