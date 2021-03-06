<template>
  <div id="MemberReport">
    <SearchBar>
      <el-form :inline="true"
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="結帳時間">
          <el-date-picker
            v-model="searchForm.startAt"
            format="yyyy-MM-dd HH:mm"
            :picker-options="startAtOption"
            type="datetime"
            @change="onDateAtChanged"
            placeholder="開始時間">
          </el-date-picker>
          -
          <el-date-picker
            v-model="searchForm.endAt"
            format="yyyy-MM-dd HH:mm"
            :picker-options="endAtOption"
            type="datetime"
            @change="onDateAtChanged"
            placeholder="結束時間">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="會員" prop="account">
          <el-input v-model="searchForm.account" placeholder="帳號/手機號碼"></el-input>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <p class="help-text">＊一次可查的時間範圍為2個月</p>

    <router-view></router-view>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_MEMBER_REPORT } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { toDate, toDateTime, startAtDay, endAtDay, dateAfter, dateBefore, getRangeLastDate } from '@/vendor/FPKG-120000-Util/time.js'
import { mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: null, title: "會員報表"},
      ],
      searchForm: {
        account: this.$route.params.account || "",
        startAt: this.$route.params.startAt || startAtDay(new Date()),
        endAt: this.$route.params.endAt || endAtDay(new Date()),
      },
      searchFormRules: {
        account: [
          { required: true, message: '帳號為必填', trigger: 'blur' },
          { min: 4, max: 12, message: '須為4~12位英數字', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
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
    onDateAtChanged() {
      if (!this.searchForm.startAt || !this.searchForm.endAt) return
      // 若結束時間大於開始時間則改同為開始時間
      if(dateAfter(this.searchForm.endAt, this.searchForm.startAt)) {
        this.searchForm.endAt = this.searchForm.startAt = this.searchForm.startAt
        return
      }
      // 判斷期間
      let lastDate = getRangeLastDate(this.searchForm.startAt)
      if (dateAfter(lastDate, this.searchForm.endAt)) {
        this.searchForm.endAt = toDateTime(lastDate)
      }
    },
    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          let f = this.searchForm
          // 若新的搜尋資訊與原查詢相同，則直接呼叫報表API
          let oldSearchData = this.$route.params
          let newSearchData = {
            startAt: toDateTime(f.startAt).substr(0, 16),
            endAt: toDateTime(f.endAt).substr(0, 16),
            account: f.account
          }
          let isEqualSearch = this.$lodash.isEqual(oldSearchData, newSearchData)
          if(isEqualSearch) {
            this.$store.dispatch(GET_MEMBER_REPORT, this.searchForm)
          }else {
            this.$router.push({name: "MemberReportInfo", params: newSearchData})
            this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath.concat({name: null, title: f.account}))
          }
          
        }
      });
    }
  },
  created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  }
}
</script>

<style lang="stylus">
#MemberReport {
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 180px;
  }

  table {
    th, td {
      font-size: 13px;
      color: #555;
    }

    th {
      background-color: #eee;
    }
  }
}
</style>
