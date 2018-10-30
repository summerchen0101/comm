<template>
  <div id="GameReport">
    <SearchBar>
      <el-form ref="searchForm" :inline="true" :model="searchForm" :rules="searchFormRules">
        <el-form-item label="結帳日期">
          <el-select v-model="searchForm.startAt" @change="changeWeek1">
            <el-option v-for="i in weeks" :label="`${i.option}`" :value="i.value" :key="i.value"></el-option>
          </el-select>
           ~ 
          <el-select v-model="searchForm.endAt" @change="changeWeek2">
            <el-option v-for="i in weeks" :label="`${i.option}`" :value="i.value" :key="i.value"></el-option>
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
    <router-view></router-view>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_COMMISSION_WEEKS, GET_COMMISSION_TOTAL_REPORT } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: null, title: "佣金報表"},
      ],
      searchForm: {
        startAt: '',
        endAt: ''
      },
      searchFormRules: {
        startAt: [
          { required: true, message: '結帳日期必填', trigger: 'blur' },
        ],
        endAt: [
          { required: true, message: '結帳日期必填', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      weeks: state => state.Report.CommissionReport.weeks
    }),
  },
  methods: {
    changeWeek1() {
      if (this.searchForm.startAt > this.searchForm.endAt ) {
        this.searchForm.endAt = this.searchForm.startAt
      }
    },
    changeWeek2() {
      if (this.searchForm.startAt > this.searchForm.endAt ) {
         this.searchForm.endAt = this.searchForm.startAt
      }
    },
    onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$router.push({name: "CommissionTotalReport", params: {
            startAt: this.searchForm.startAt,
            endAt: this.searchForm.endAt,
          }})
        }
      });
    }
  },
  async created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_COMMISSION_WEEKS)
    if (this.weeks.length > 0) {
      this.searchForm.startAt = this.weeks[this.weeks.length-1].value
      this.searchForm.endAt = this.weeks[this.weeks.length-1].value
    }
  }
}
</script>

<style lang="stylus">
#GameReport {
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
