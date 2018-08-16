<template>
  <div id="AddedPoint" class="container">
    <LoadingCover></LoadingCover>
    <!-- 撥點 -->
    <table class="table table-bordered">
      <tr>
        <th>帳號(暱稱)</th>
      </tr>
      <tr>
        <td>{{$route.params.acc}} ({{$route.params.nick}})</td>
      </tr>
    </table>

    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm">
        <el-form-item label="時間" v-if="searchForm.status !== 1">
          <el-date-picker
            v-model="searchForm.startAt"
            format="MM-dd HH:mm"
            :picker-options="startAtOption"
            type="datetime"
            @change="onStartAtChanged"
            placeholder="開始時間">
          </el-date-picker>
          -
          <el-date-picker
            v-model="searchForm.endAt"
            format="MM-dd HH:mm"
            :picker-options="endAtOption"
            type="datetime"
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

    <!-- 列表 -->
    <el-table
      :data="addedPointList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="point"
        label="撥點點數">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="備註">
      </el-table-column>
      <el-table-column
        prop="operator"
        label="執行人員">
      </el-table-column>
    </el-table>
    <Paginator v-if="addedPointPager"
              :on-page-changed="onPageChanged"
              :count="addedPointPager.count"
              :perpage="addedPointPager.perpage"></Paginator>
  </div>
</template>

<script>
import { GET_ADDED_POINT_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      searchForm: {
        startAt: startAtDay(new Date()),
        endAt: endAtDay(new Date()),
      },
    }
  },
  computed: {
    ...mapState({
      addedPointList: state => state.Member.MemberSearch.addedPointList,
      addedPointPager: state => state.Member.MemberSearch.addedPointPager,
    }),
    startAtOption() {
      return {
        disabledDate: (val) => {
          return dateBefore(startAtDay(moment(new Date()).subtract(2, 'month').startOf('month')), val)
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
      this.$store.dispatch(GET_ADDED_POINT_LIST, {...this.searchForm, id: this.$route.params.id})
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_ADDED_POINT_LIST, { 
        id: this.$route.params.id, 
        page 
      })
    },
  },

  async mounted() {
    this.$store.dispatch(GET_ADDED_POINT_LIST, {...this.searchForm, id: this.$route.params.id})
  }
}
</script>

<style lang="stylus">
#AddedPoint
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
