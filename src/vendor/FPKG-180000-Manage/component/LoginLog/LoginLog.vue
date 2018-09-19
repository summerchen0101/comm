<template>
  <div id="LoginLog">
    <SearchBar>
      <el-form :inline="true"
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="時間">
          <el-date-picker
            style="width: 180px"
            v-model="searchForm.startAt"
            format="MM-dd HH:mm"
            :picker-options="startAtOption"
            type="datetime"
            @change="onStartAtChanged">
          </el-date-picker>
          -
          <el-date-picker
            style="width: 180px"
            v-model="searchForm.endAt"
            format="MM-dd HH:mm"
            :picker-options="endAtOption"
            type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="帳號">
          <el-select v-model="searchForm.users" multiple collapse-tags style="width: 240px" placeholder="全部">
            <el-option v-for="opt in userOpts" :key="opt.id" :label="`${opt.account}(${opt.name})`" :value="opt.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>

    <el-table
      :data="loginList"
      stripe
      class="mt-4"
      style="width: 100%">
      <el-table-column
        label="帳號(暱稱)">
        <template slot-scope="scope">
          {{scope.row.account}} ({{scope.row.nick}})
        </template>
      </el-table-column>
      <el-table-column
        label="時間">
        <template slot-scope="scope">
          {{toShortDateTime(scope.row.time)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP">
      </el-table-column>
      <el-table-column
        prop="area"
        label="地區">
      </el-table-column>
      <el-table-column
        prop="statusName"
        label="登入資訊">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 3" class="text-danger">{{scope.row.statusName}}</span>
          <span v-else>{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="loginPager"
              :on-page-changed="onPageChanged"
              :count="loginPager.count"
              :perpage="loginPager.perpage"></Paginator>
  </div>
</template>

<script>
import {
  SET_BREADCRUMB,
  GET_OPERATING_OPTIONS,
  GET_USER_OPTIONS,
  GET_LOGIN_LOG_LIST,
  CLEAR_LOGIN_LOG_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "後台管理"},
        {name: null, title: "登入日誌"},
      ],
      searchForm: {
        startAt: startAtDay(new Date()),
        endAt: endAtDay(new Date()),
        users: [],
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
      userOpts: state => state.Manage.userOpts,
      loginList: state => state.Manage.LoginLog.loginList,
      loginPager: state => state.Manage.LoginLog.loginPager,
    }),
    startAtOption() {
      return {
        disabledDate: (val) => {
          return dateBefore(startAtDay(moment(new Date()).subtract(9, 'day')), val) || dateAfter(new Date(), val)
        }
      }
    },
    endAtOption() {
      return {
        disabledDate: (val) => {
          return dateBefore(this.searchForm.startAt, val) || dateAfter(new Date(), val)
        }
      }
    },
  },
  methods: {
    onStartAtChanged() {
      // 若結束時間大於開始時間則清空結束時間
      if(dateAfter(this.searchForm.endAt, this.searchForm.startAt)) {
        this.searchForm.endAt = ""
      }
    },
    onSearchSubmit() {
      this.$store.dispatch(GET_LOGIN_LOG_LIST, this.searchForm)
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_LOGIN_LOG_LIST, {...this.searchForm, page})
    },
    initLayout() {
      this.searchForm = {
        startAt: startAtDay(new Date()),
        endAt: endAtDay(new Date()),
        users: []
      };
      this.$store.commit(CLEAR_LOGIN_LOG_LIST)
    }
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.initLayout()
    await this.$store.dispatch(GET_USER_OPTIONS)
  }
}
</script>

<style lang="stylus">
#LoginLog
  .el-input--small .el-input__inner
    placeholder(#666)
</style>
