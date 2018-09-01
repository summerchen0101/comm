<template>
  <div id="GameReport">
    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="結帳日期">
          <el-date-picker
            v-model="searchForm.startAt"
            format="yyyy-MM-dd"
            :picker-options="startAtOption"
            type="date"
            @change="onStartAtChanged"
            placeholder="開始時間">
          </el-date-picker>
          -
          <el-date-picker
            v-model="searchForm.endAt"
            format="yyyy-MM-dd"
            :picker-options="endAtOption"
            type="date"
            placeholder="結束時間">
          </el-date-picker>
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
import moment, { toDate, startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'
import { mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "報表查詢"},
        {name: null, title: "遊戲報表"},
      ],
      searchForm: {
        startAt: this.$route.params.startAt || startAtDay(new Date()),
        endAt: this.$route.params.endAt || endAtDay(new Date()),
      },
      searchFormRules: {
        account: [
          { required: true, message: '帳號為必填', trigger: 'blur' },
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
    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          // this.$store.dispatch(GET_MEMBER_REPORT, this.searchForm)
          let f = this.searchForm
          this.$router.push({name: "GameTotalReport", params: {
            startAt: toDate(f.startAt),
            endAt: toDate(f.endAt),
          }})
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
#GameReport 
  .el-date-editor.el-input, .el-date-editor.el-input__inner
    width: 160px
  table 
    th, td 
      font-size: 13px
      color: #555
    th 
      background-color: #eee 
</style>
