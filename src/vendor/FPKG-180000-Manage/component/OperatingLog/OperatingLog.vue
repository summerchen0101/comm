<template>
  <div id="OperatingLog">
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
            @change="onDateTimeAtChanged">
          </el-date-picker>
          -
          <el-date-picker
            style="width: 180px"
            v-model="searchForm.endAt"
            format="MM-dd HH:mm"
            :picker-options="endAtOption"
            @change="onDateTimeAtChanged"
            type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="帳號">
          <el-select v-model="searchForm.users" multiple collapse-tags style="width: 240px" placeholder="全部">
            <el-option v-for="opt in userOpts" :key="opt.id" :label="`${opt.account}(${opt.name})`" :value="opt.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="項目">
          <el-select v-model="searchForm.funcTargets" multiple collapse-tags style="width: 240px" placeholder="全部">
            <el-option v-for="opt in operatingOpts" :key="opt.id" :label="opt['zh-TW']" :value="opt.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <p class="help-text">＊一次可查的時間範圍為2個月</p>

    <el-table
      :data="operatingList"
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
        width="150"
        label="時間">
        <template slot-scope="scope">
          {{toShortDateTime(scope.row.time)}}
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        prop="ip"
        label="IP">
      </el-table-column>
      <el-table-column
        width="150"
        prop="target"
        label="對象">
      </el-table-column>
      <el-table-column
        label="操作內容">
        <template slot-scope="scope">
         <div class="pre-wrap">{{renderOperationContent(scope.row.content)}}</div>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="operatingPager"
              :on-page-changed="onPageChanged"
              :count="operatingPager.count"
              :perpage="operatingPager.perpage"></Paginator>
  </div>
</template>

<script>
import {
  SET_BREADCRUMB,
  GET_OPERATING_OPTIONS,
  GET_USER_OPTIONS,
  GET_OPERATING_LOG_LIST,
  CLEAR_OPERATING_LOG_LIST
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import moment, { startAtDay, endAtDay, dateAfter, dateBefore, getRangeLastDate } from '@/vendor/FPKG-120000-Util/time.js'
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
        {name: null, title: "操作日誌"},
      ],
      searchForm: {
        startAt: startAtDay(new Date()),
        endAt: endAtDay(new Date()),
        users: [],
        funcTargets: []
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
      operatingOpts: state => state.Manage.OperatingLog.operatingOpts,
      userOpts: state => state.Manage.userOpts,
      operatingList: state => state.Manage.OperatingLog.operatingList,
      operatingPager: state => state.Manage.OperatingLog.operatingPager,
    }),
    startAtOption() {
      return {
        disabledDate: (val) => {
          return dateAfter(new Date(), val)
        }
      }
    },
    endAtOption() {
      return {
        disabledDate: (val) => {
          let lastDate = getRangeLastDate(this.searchForm.startAt)
          return val.getTime() > lastDate.getTime() || dateAfter(new Date(), val)
        }
      }
    },
  },
  methods: {
    onDateTimeAtChanged() {
      // 若結束時間大於開始時間則改同為開始時間
      if(dateAfter(this.searchForm.endAt, this.searchForm.startAt)) {
        this.searchForm.endAt = this.searchForm.startAt = this.searchForm.startAt
        return
      }
      // 判斷期間
      let lastDate = getRangeLastDate(this.searchForm.startAt)
      if (dateAfter(lastDate, this.searchForm.endAt)) {
        this.searchForm.endAt = endAtDay(lastDate)
      }

    },
    onSearchSubmit() {
      this.$store.dispatch(GET_OPERATING_LOG_LIST, this.searchForm)
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_OPERATING_LOG_LIST, {...this.searchForm, page})
    },
    renderOperationContent(contents) {
      return this.$lodash.join(this.$lodash.map(contents, this.$lodash.trim), '\r\n');
    },
    initLayout() {
      this.searchForm = {
        startAt: startAtDay(new Date()),
        endAt: endAtDay(new Date()),
        users: [],
        funcTargets: []
      };
      this.$store.commit(CLEAR_OPERATING_LOG_LIST)
    }
  },

  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.initLayout()
    await this.$store.dispatch(GET_USER_OPTIONS)
    await this.$store.dispatch(GET_OPERATING_OPTIONS)
    // this.searchForm.funcTargets = this.operatingOpts.map(opt => opt.id)
  }
}
</script>

<style lang="stylus">
#OperatingLog
  .el-input--small .el-input__inner
    placeholder(#666)

  .pre-wrap {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
