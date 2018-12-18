<template>
  <div id="PointHistory">
    <SearchBar>
      <el-form :inline="true"
                ref="searchForm"
                status-icon
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="會員" prop="account">
          <el-input v-model="searchForm.account" placeholder="帳號/手機號碼"></el-input>
        </el-form-item>
        <el-form-item label="時間">
          <el-date-picker
            v-model="searchForm.startAt"
            format="yyyy-MM-dd HH:mm"
            :picker-options="startAtOption"
            type="datetime"
            @change="onStartAtChanged() && onDateTimeAtChanged()"
            placeholder="開始時間">
          </el-date-picker>
          -
          <el-date-picker
            v-model="searchForm.endAt"
            format="yyyy-MM-dd HH:mm"
            :picker-options="endAtOption"
            type="datetime"
            @change="onDateTimeAtChanged"
            placeholder="結束時間">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
        <el-form-item label="類型" style="margin-top: 10px">
          <el-checkbox :indeterminate="isIndeterminate" v-model="isSelectedAllFilters" @change="onFilterAllChanged">全部</el-checkbox>
          <el-checkbox v-for="opt in typeOpts" 
                      :key="opt.id" 
                      :label="opt.id" 
                      v-model="searchForm.type"
                      @change="onFilterChanged">{{opt.name}}</el-checkbox>
        </el-form-item>
      </el-form>
      <!-- <div>
        篩選：
        <el-checkbox :indeterminate="isIndeterminate" v-model="isSelectedAllFilters" @change="onFilterAllChanged">全部</el-checkbox>
        <el-checkbox v-for="opt in typeOpts" 
                    :key="opt.id" 
                    :label="opt.id" 
                    v-model="searchForm.type"
                    @change="onFilterChanged">{{opt.name}}</el-checkbox>
      </div> -->
    </SearchBar>
    <div class="InfoBox" v-if="pointHistoryList.length > 0">
      <div class="name">帳號(暱稱)：{{ pointHistoryList[0].account }} ({{ pointHistoryList[0].nick }})</div>
      <div class="phone">手機號碼：{{ pointHistoryList[0].phone }}</div>
    </div>
    <el-table
      :data="pointHistoryList"
      stripe
      style="width: 100%">
      <el-table-column
        width="180"
        prop="createdAt"
        label="時間">
      </el-table-column>
      <el-table-column
        min-width="120"
        label="錢包">
        <template slot-scope="scope">
           <span>{{ toWalletName(scope.row.from) }}</span>
           <span v-if="scope.row.to"> -> </span>
           <span>{{ toWalletName(scope.row.to) }}</span>
         </template>
      </el-table-column>
      <el-table-column
        min-width="140"
        label="平台錢包-原始額度">
        <template slot-scope="scope">
          {{ toCurrencyDecimal(scope.row.beforePoint) }}
         </template>
      </el-table-column>
      <el-table-column
        min-width="140"
        label="異動額度">
        <template slot-scope="scope">
          <span :class="{'text-danger': scope.row.transferPoint < 0, 'text-success': scope.row.transferPoint > 0, }">
            {{ toCurrencyDecimal(scope.row.transferPoint) }}
          </span>
         </template>
      </el-table-column>
      <el-table-column
        min-width="140"
        label="平台錢包-變動後額度">
        <template slot-scope="scope">
          {{ toCurrencyDecimal(scope.row.currentPoint) }}
         </template>
      </el-table-column>
      <el-table-column
        label="狀態">
        <template slot-scope="scope">
          {{ $root.toOption(typeOpts, scope.row.type) }}
         </template>
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作人員">
      </el-table-column>
      <el-table-column
        prop="notes"
        label="備註">
      </el-table-column>
    </el-table>
    <Paginator v-if="pointHistoryPager"
              :on-page-changed="onPageChanged"
              :count="pointHistoryPager.count"
              :perpage="pointHistoryPager.perpage"></Paginator>
  </div>
</template>

<script>
import {
  SET_BREADCRUMB,
  GET_GAME_TYPE_OPTIONS,
  GET_POINT_TRANSFER_OPTIONS,
  GET_POINT_HISTORY_LIST,
  CLEAR_POINT_HISTORY_LIST,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'
import { memberAccountValidator } from '@/vendor/FPKG-120000-Util/customValidate'
import moment, { startAtDay, endAtDay, dateAfter , dateBefore, getRangeLastDate, getTimeDiff} from '@/vendor/FPKG-120000-Util/time.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "會員資訊"},
        {name: null, title: "會員點數歷程"},
      ],
      searchForm: {
        account: "",
        type: [],
        startAt: this.$route.params.startAt || startAtDay(new Date()),
        endAt: this.$route.params.endAt || endAtDay(new Date()),
      },
      isSelectedAllFilters: true,
      isIndeterminate: false,
      searchFormRules: {
        account: [
          { required: true, message: '帳號為必填', trigger: 'blur' },
          { validator: memberAccountValidator, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      typeOpts: state => state.Global.pointTransferOpts,
      gameTypeOpts: state => state.Global.gameTypeOpts,
      pointHistoryList: state => state.Member.PointHistory.pointHistoryList,
      pointHistoryPager: state => state.Member.PointHistory.pointHistoryPager,
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
    toWalletName(value) {
      if(typeof value === 'number') {
        return this.$root.toOption(this.gameTypeOpts, value)
      }
      else if(value === 'wallet') {
        return '主錢包'
      }
      return
    },
    onStartAtChanged() {
      if(getTimeDiff(this.searchForm.endAt, this.searchForm.startAt, 'months') > 2) {
        this.searchForm.endAt = ""
      }
    },
    onDateTimeAtChanged() {
      // 若結束時間大於開始時間則改同為開始時間
      if(dateAfter(this.searchForm.endAt, this.searchForm.startAt)) {
        this.searchForm.endAt = this.searchForm.startAt
      }
    },
    onFilterChanged() {
      this.isSelectedAllFilters = this.searchForm.type.length > 0 && this.searchForm.type.length === this.typeOpts.length
      this.isIndeterminate = this.searchForm.type.length > 0 && this.searchForm.type.length !== this.typeOpts.length
      this.onSearchSubmit()
    },
    onFilterAllChanged() {
      this.searchForm.type = this.isSelectedAllFilters ? this.typeOpts.map(opt => opt.id) : []
      this.isIndeterminate = this.searchForm.type.length > 0 && this.searchForm.type.length !== this.typeOpts.length
      if(this.isSelectedAllFilters) {
        this.onSearchSubmit()
      }
    },
    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(GET_POINT_HISTORY_LIST, this.searchForm)
        }
      });
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_POINT_HISTORY_LIST, {
        ...this.searchForm,
        page
      })
    },
    setSearchForm() {
      this.searchForm.type = this.typeOpts.map(opt => opt.id)
    }
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_GAME_TYPE_OPTIONS)
    await this.$store.dispatch(GET_POINT_TRANSFER_OPTIONS)
    this.setSearchForm()
  },
  beforeDestroy() {
    this.$store.commit(CLEAR_POINT_HISTORY_LIST)
  }
}
</script>

<style lang="stylus">
</style>
