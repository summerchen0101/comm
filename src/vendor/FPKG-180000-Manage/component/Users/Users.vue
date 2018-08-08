<template>
  <div id="Users">
    <PageTitle>
      <el-button slot="btns" type="primary" @click="SWITCH_USER_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>
    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="帳號" prop="account">
          <el-input v-model="searchForm.account" placeholder="搜尋帳號"></el-input>
        </el-form-item>
        <el-form-item label="狀態">
          <el-select v-model="searchForm.status" prop="status">
            <el-option v-for="t in statusOpts" :key="t.id" :label="t.name" :value="t.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>

    <!-- 帳號列表 -->
    <el-table
      :data="userList"
      stripe
      class="mt-4"
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
        width="100"
        prop="permission"
        label="權限">
      </el-table-column>
      <el-table-column
        width="180"
        prop="loginAt"
        label="最後登入">
      </el-table-column>
      <el-table-column
        width="180"
        prop="createdAt"
        label="建立時間">
      </el-table-column>
      <el-table-column
        width="100"
        label="狀態">
        <template slot-scope="scope">
          <span :class="{'text-danger': scope.row.status == 2, 'text-success': scope.row.status == 1}">
            {{scope.row.statusName}}
          </span>
        </template>
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
          <el-button size="mini" :class="{'history-active': scope.row.operation}" @click="onCheckHistory(scope.row.id)">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="userPager"
              :on-page-changed="onPageChanged"
              :count="userPager.count"
              :perpage="userPager.perpage"></Paginator>


    <!-- 新增帳號 -->
    <UserFormDialog ref="UserFormDialog"></UserFormDialog>
    <HistoryDialog ></HistoryDialog>
  </div>
</template>

<script>
import UserFormDialog from '@/vendor/FPKG-180000-Manage/component/Users/UserFormDialog.vue';
import { 
  GET_USER_LIST, 
  GET_PERMISSION_GROUP_OPTIONS, 
  GET_IP_OPTIONS, 
  GET_USER_STATUS_OPTIONS, 
  SWITCH_USER_DIALOG,
  DEL_USER,
  SET_BREADCRUMB,
  GET_HISTORY,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { toEnum } from '@/vendor/FPKG-120000-Util/other'

export default {
  components: {
    UserFormDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "後台管理"},
        {name: null, title: "帳號管理"},
      ],
      searchForm: {
        account: "",
        status: 0
      },
      searchFormRules: {
        account: [
          // { required: true, message: '帳號為必填', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      userList: state => state.Manage.Users.userList,
      userPager: state => state.Manage.Users.userPager,
      statusOpts: state => state.Global.statusOpts,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_USER_DIALOG
    ]),
    toEnum,
    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(GET_USER_LIST, this.searchForm)
        }
      });
    },
    onCheckHistory(id) {
      this.$store.dispatch(GET_HISTORY, {
          funcKey: this.$attrs.funcKey, 
          id,
          title: "帳號修改歷程"
        })
    },
    onGetItem(item) {
      this.SWITCH_USER_DIALOG(true)
      let formData = Object.assign({},
      this.$refs.UserFormDialog.form,
      item
      )
      this.$hub.$emit("Manage:userFormUpdate", formData)
    },
    async onDelItem(id) {
      this.$confirm('確定刪除後將無法復原', '你確定嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DEL_USER, id)
      }).catch(() => {        
      });
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_USER_LIST, {page})
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_PERMISSION_GROUP_OPTIONS)
    this.$store.dispatch(GET_IP_OPTIONS)
    this.$store.dispatch(GET_USER_STATUS_OPTIONS, 'user')
    this.$store.dispatch(GET_USER_LIST, this.searchForm)
  },
}
</script>

<style lang="stylus">
</style>
