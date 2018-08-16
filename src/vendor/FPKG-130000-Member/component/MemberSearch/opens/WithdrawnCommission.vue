<template>
  <div id="WithdrawnCommission" class="container">
    <!-- 已提領佣金 -->
    <table class="table table-bordered">
      <tr>
        <th>帳號(暱稱)</th>
      </tr>
      <tr>
        <td>{{$route.params.acc}}({{$route.params.nick}})</td>
      </tr>
    </table>

    <!-- 列表 -->
    <el-table
      :data="withdrawnCommissionList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="標題">
      </el-table-column>
    </el-table>
    <Paginator v-if="withdrawnCommissionPager"
              :on-page-changed="onPageChanged"
              :count="withdrawnCommissionPager.count"
              :perpage="withdrawnCommissionPager.perpage"></Paginator>
  </div>
</template>

<script>
import { GET_WITHDRAWN_COMMISSION_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      withdrawnCommissionList: state => state.Member.MemberSearch.withdrawnCommissionList,
      withdrawnCommissionPager: state => state.Member.MemberSearch.withdrawnCommissionPager,
    })
  },
  methods: {
    onPageChanged(page) {
      this.$store.dispatch(GET_WITHDRAWN_COMMISSION_LIST, { 
        id: this.$route.params.id, 
        page 
      })
    },
  },

  async mounted() {
    this.$store.dispatch(GET_WITHDRAWN_COMMISSION_LIST, {id: this.$route.params.id})
  }
}
</script>

<style lang="stylus">
#WithdrawnCommission
  margin: 30px auto
  table 
    margin-bottom: 25px
    th, td 
      font-size: 13px
      color: #555
    th 
      background-color: #eee 
      width: 170px
</style>

