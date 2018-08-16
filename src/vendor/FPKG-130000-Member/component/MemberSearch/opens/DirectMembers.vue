<template>
  <div id="DirectMembers" class="container">
    <LoadingCover></LoadingCover>
    <!-- 直屬及代理會員數 -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>帳號(暱稱)</th>
          <th>直屬會員數</th>
        </tr>
        <tr>
          <td>{{$route.params.acc}} ({{$route.params.nick}})</td>
          <td>{{$route.params.count || 0}}</td>
        </tr>
      </thead>
    </table>
    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm">
        <el-form-item prop="account" label="會員">
          <el-input v-model.trim="searchForm.account" placeholder="搜尋帳號"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手機">
          <el-input v-model.trim="searchForm.phone" placeholder="搜尋手機號碼"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="狀態">
          <el-select v-model="searchForm.status" style="width: 100%">
              <el-option v-for="opt in statusOpts" :label="opt.name" :value="opt.id" :key="opt.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>

    <!-- 列表 -->
    <el-table
      :data="directMemberList"
      stripe
      style="width: 100%">
      <el-table-column
        label="帳號(暱稱)">
        <template slot-scope="scope">
          {{scope.row.account}} ({{scope.row.nick}})
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手機號碼">
      </el-table-column>
      <el-table-column
        label="本週業績">
        <template slot-scope="scope">
          {{toCurrencyDecimal(scope.row.selfValidityBetting)}}
        </template>
      </el-table-column>
      <el-table-column
        label="本週總佣金">
        <template slot-scope="scope">
          {{toCurrencyDecimal(scope.row.allowCommision)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="建立日期">
      </el-table-column>
      <el-table-column
        label="狀態">
        <template slot-scope="scope">
          <span :class="{'text-success': scope.row.status == 1, 'text-danger': scope.row.status == 2}">
            {{toOption(statusOpts, scope.row.status)}}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="directMemberPager"
              :on-page-changed="onPageChanged"
              :count="directMemberPager.count"
              :perpage="directMemberPager.perpage"></Paginator>
  </div>
</template>

<script>
import { GET_MEMBER_STATUS_OPTIONS, GET_DIRECT_MEMBER_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      searchForm: {
        account: "",
        phone: "",
        status: 0
      }
    }
  },
  computed: {
    ...mapState({
      statusOpts: state => state.Global.memberStatusOpts,
      directMemberList: state => state.Member.MemberSearch.directMemberList,
      directMemberPager: state => state.Member.MemberSearch.directMemberPager,
    })
  },
  methods: {
    onSearchSubmit() {
      this.$store.dispatch(GET_DIRECT_MEMBER_LIST, {...this.searchForm, id: this.$route.params.id})
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_DIRECT_MEMBER_LIST, { 
        id: this.$route.params.id, 
        page 
      })
    },
  },

  async mounted() {
    this.$store.dispatch(GET_MEMBER_STATUS_OPTIONS)
    this.$store.dispatch(GET_DIRECT_MEMBER_LIST, {id: this.$route.params.id})
  }
}
</script>

<style lang="stylus">
#DirectMembers
  margin: 30px auto
  table 
    // margin-bottom: 25px
    th, td 
      font-size: 13px
      color: #555
    th 
      background-color: #eee 
      width: 170px
</style>

