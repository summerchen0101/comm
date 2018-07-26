<template>
  <div id="Theme">
    
    <MenuComponent></MenuComponent>
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb :path="breadcrumbPath"></Breadcrumb>
      <div class="main-container">
        <PageTitle>
          <el-button slot="btns" type="primary" @click="SWITCH_THEME_DIALOG(true)">新增版型</el-button>
        </PageTitle>

        <!-- 版型列表 -->
        <el-table
          :data="themeList"
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

        <!-- 新增版型 -->
        <ThemeFormDialog ref="ThemeFormDialog"></ThemeFormDialog>
        
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
import ThemeFormDialog from '@/vendor/FPKG-100000-Theme/component/ThemeFormDialog.vue';
import { SWITCH_THEME_DIALOG, GET_THEME_LIST, GET_THEME, ADD_THEME, DEL_THEME } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';


export default {
  components: {
    MenuComponent: Menu,
    MobileMenu,
    Validation,
    PageTitle,
    ThemeFormDialog,
    LoadingCover,
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "版型管理"},
        // {link: null, title: "版型管理一"},
      ],
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      themeList: state => state.Theme.themeList,
      createDialogVisible: state => state.Theme.createDialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_THEME_DIALOG
    ]),
    async onGetItem(item) {
      await this.$store.dispatch(GET_THEME, item)
      this.$refs.ThemeFormDialog.form = Object.assign(
        {}, 
        this.$refs.ThemeFormDialog.form, 
        this.$store.state.Theme.theme)
    },
    async onDelItem(item) {
      await this.$store.dispatch(DEL_THEME, item)
    }
  },
  
  mounted() {
    this.$store.dispatch(GET_THEME_LIST)
  }
}
</script>

<style lang="stylus">
@import '../style/component/Theme'

</style>
