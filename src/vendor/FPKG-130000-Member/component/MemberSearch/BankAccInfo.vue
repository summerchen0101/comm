<template>
  <div>
    <h5>銀行帳戶資訊</h5>
    <table class="table table-bordered">
      <tr v-if="bankAccInfo.length === 0">
        <th>銀行帳戶</th>
        <td>(暫無設定)</td>
      </tr>
      <tr v-for="b,i in bankAccInfo" :key="i">
        <th>銀行帳戶</th>
        <td>{{b.bankAccount}}
            <el-checkbox class="float-right" style="margin-bottom: 0" disabled
                          :value="b.status == 1">
                          驗證通過
            </el-checkbox>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { GET_MEMBER_STATUS_OPTIONS } from '@/vendor/FPKG-40000-VuexStore/constants'
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
      bankAccInfo: state => state.Member.MemberSearch.bankAccInfo
    })
  },
  methods: {
  },

  async mounted() {
  }
}
</script>