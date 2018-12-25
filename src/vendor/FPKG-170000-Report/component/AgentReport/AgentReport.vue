<template>
  <div id="AgentReport">
    <SearchBar>
      <el-form :inline="true"
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="結帳日期">
          <el-select v-model="searchForm.startAt" @change="onWeekChanged">
            <el-option v-for="i in weekOpts" :label="`${i.option}`" :value="i.value" :key="i.value"></el-option>
          </el-select>
           ~ 
          <el-select v-model="searchForm.endAt" @change="onWeekChanged">
            <el-option v-for="i in weekOpts" :label="`${i.option}`" :value="i.value" :key="i.value"></el-option>
          </el-select>
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
import { SET_BREADCRUMB, GET_AGENT_REPORT, GET_COMMISSION_WEEKS_OPTIONS } from '@/vendor/FPKG-40000-VuexStore/constants'
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
        {name: null, title: "代理報表"},
      ],
      searchForm: {
        account: this.$route.params.account || "",
        startAt: "",
        endAt: "",
      },
      searchFormRules: {
        account: [
          // { required: true, message: '帳號為必填', trigger: 'blur' },
          { min: 4, max: 12, message: '須為4~12位英數字', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      weekOpts: state => state.Global.commissionWeeksOpts
    }),
  },
  methods: {
    onWeekChanged() {
      if (this.searchForm.startAt > this.searchForm.endAt ) {
        this.searchForm.endAt = this.searchForm.startAt
      }
    },
    setSearchForm() {
      this.searchForm = Object.assign({}, this.searchForm, {
        account: this.$route.params.account || "",
        startAt: this.$route.params.startAt || this.weekOpts[this.weekOpts.length-1].value,
        endAt: this.$route.params.endAt || this.weekOpts[this.weekOpts.length-1].value,
      })
    },
    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$router.push({name: "AgentReportInfo", params: {
              startAt: this.searchForm.startAt,
              endAt: this.searchForm.endAt,
              account: this.searchForm.account || undefined,
            }
          })
        }
      });
      // this.$refs.searchForm.validate((valid) => {
      //   if (valid) {
      //     let f = this.searchForm
      //     // 若新的搜尋資訊與原查詢相同，則直接呼叫報表API
      //     let oldSearchData = this.$route.params
      //     let newSearchData = Object.assign({}, this.searchForm)
      //     let isEqualSearch = this.$lodash.isEqual(oldSearchData, newSearchData)
      //     if(isEqualSearch) {
      //       this.$store.dispatch(GET_AGENT_REPORT, this.searchForm)
      //     }else {
      //       this.$router.push({name: "AgentReportInfo", params: newSearchData})
      //       this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath.concat({name: null, title: f.account}))
      //     }
          
      //   }
      // });
    }
  },
  async created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_COMMISSION_WEEKS_OPTIONS)
    this.setSearchForm()
  },
  beforeDestroy() {
    
  }
}
</script>

<style lang="stylus">
#AgentReport {
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
