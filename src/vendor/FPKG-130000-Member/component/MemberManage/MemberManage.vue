<template>
  <div id="MemberManage">
    <PageTitle>
      <el-button slot="btns" type="primary" @click="SWITCH_MEMBER_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>
    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="會員" prop="account">
          <el-input v-model.trim="searchForm.account" placeholder="搜尋帳號"></el-input>
        </el-form-item>
        <el-form-item label="手機" prop="phone">
          <el-input v-model.trim="searchForm.phone" placeholder="搜尋手機號碼"></el-input>
        </el-form-item>
        <el-form-item label="狀態">
          <el-select v-model="searchForm.status" prop="status">
            <el-option v-for="t in statusOpts" :key="t.id" :label="t.name" :value="t.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="層級">
          <el-select v-model="searchForm.layer" prop="layer">
            <el-option v-for="t in layerOpts" :key="t.id" :label="t.name" :value="t.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>

    <!-- 會員列表 -->
    <el-table
      :data="memberList"
      stripe
      style="width: 100%">
      <el-table-column
        width="80"
        label="驗證">
        <template slot-scope="scope">
          <el-checkbox :value="scope.row.isVerified" @click.native.prevent="onClickVerify(scope.row)"></el-checkbox>
        </template>
      </el-table-column>
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
        prop="phone"
        label="手機號碼">
      </el-table-column>
      <el-table-column
        width="120"
        label="點數">
        <template slot-scope="scope">
          {{$root.toCurrencyDecimal(scope.row.point)}}
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        prop="createdAt"
        label="建立時間">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="onClickEdit(scope.row)" :disabled="!scope.row.isVerified">修改</el-button>
          <el-button size="mini" type="warning" @click="onClickGameEdit(scope.row)" :disabled="!scope.row.isVerified">遊戲</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="狀態">
        <template slot-scope="scope">
          <span :class="{'text-success': scope.row.status == 1, 'text-danger': scope.row.status == 2}">{{toOption(statusOpts, scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        prop="modified_at"
        label="更新時間">
          <template slot-scope="scope">
            <span>{{toShortDateTimeNoSecond(scope.row.modified_at)}}</span>
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
    <Paginator v-if="memberPager"
              :on-page-changed="onPageChanged"
              :count="memberPager.count"
              :perpage="memberPager.perpage"></Paginator>

    <HistoryDialog ></HistoryDialog>
    <VerifyInfoDialog ></VerifyInfoDialog>
    <MemberDialog ></MemberDialog>
  </div>
</template>

<script>
import { 
  SET_BREADCRUMB, 
  GET_MEMBER_STATUS_OPTIONS,
  GET_MEMBER_LAYER_OPTIONS,
  GET_MEMBER_LIST,
  GET_MEMBER_SEARCH_LIST,
  GET_HISTORY,
  VERIFY_MEMBER,
  SWITCH_MEMBER_DIALOG,
  FINISH_MEMBER_SEARCH_LIST
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { toOption } from '@/vendor/FPKG-120000-Util/other';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';
import VerifyInfoDialog from '@/vendor/FPKG-130000-Member/component/MemberManage/VerifyInfoDialog.vue';
import MemberDialog from '@/vendor/FPKG-130000-Member/component/MemberManage/MemberDialog.vue'

export default {
  mixins: [commonTool],
  components: {
    VerifyInfoDialog,
    MemberDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "會員資訊"},
        {name: null, title: "會員管理"},
      ],
      searchForm: {
        account: "",
        phone: "",
        status: 0,
        layer: 0
      },
      searchFormRules: {

      }
    }
  },
  
  computed: {
    ...mapState({
      statusOpts: state => state.Global.memberStatusOpts,
      layerOpts: state => state.Global.memberLayerOpts,
      memberSearchKey: state => state.Member.MemberManage.memberSearchKey,
      memberSearch: state => state.Member.MemberManage.memberSearch,
      memberList: state => state.Member.MemberManage.memberList,
      memberPager: state => state.Member.MemberManage.memberPager,
    })
  },
  methods: {
    ...mapMutations({
      GET_HISTORY,
      SWITCH_MEMBER_DIALOG
    }),
    toOption,
    onSearchSubmit() {
      this.$store.dispatch(GET_MEMBER_LIST, this.searchForm)
    },
    onClickEdit(item) {
      this.$router.push({name: "MemberDetail", params: {id: item.id, acc: item.account}})
    },
    onClickGameEdit(item) {
      this.$router.push({name: "MemberGame", params: {id: item.id, acc: item.account}})
    },
    onClickVerify(item) {
      if(!item.isVerified) {
        this.$store.dispatch(VERIFY_MEMBER, item.id)
      }
    },
    onPageChanged(page) {
      if (this.memberSearch) {
        this.$store.dispatch(GET_MEMBER_SEARCH_LIST, { search: this.memberSearchKey, page })
      }
      else {
        this.$store.dispatch(GET_MEMBER_LIST, { ...this.searchForm, page })
      }
    },
    onCheckHistory(id) {
      this.$store.dispatch(GET_HISTORY, {
          funcKey: this.$attrs.funcKey, 
          id,
          title: "會員管理修改歷程"
        })
    },
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_MEMBER_STATUS_OPTIONS)
    this.$store.dispatch(GET_MEMBER_LAYER_OPTIONS)
    if (!this.memberSearch) {
      this.$store.dispatch(GET_MEMBER_LIST, this.searchForm)
    }else {
      this.$store.dispatch(FINISH_MEMBER_SEARCH_LIST)
    }
  },
}
</script>

<style lang="stylus">
</style>
