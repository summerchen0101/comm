<template>
  <el-dialog
    id="CommisionDialog"
    :visible.sync="dialogVisible"
    width="630px"
    :before-close="CLOSE_COMMISSION_DIALOG">
    <span slot="title" class="el-dialog__title">
      帳號：{{member.account}}({{member.nick}})
    </span>
    <table class="table">
      <thead>
        <tr>
          <th>級別: {{commissionInfo.level}}</th>
          <th>總業績</th>
          <th>總佣金</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t,i in commissionInfo.list" :key="i">
          <td>{{t.group}}: {{t.feedback}}</td>
          <td>{{t.feat}}</td>
          <td>{{t.brokerage}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>總計</td>
          <td>{{commissionInfo.summary.feat}}</td>
          <td>{{commissionInfo.summary.brokerage}}</td>
        </tr>
      </tfoot>
    </table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="CLOSE_COMMISSION_DIALOG">關閉</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  CLOSE_COMMISSION_DIALOG,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      member: state => state.Widget.commissionMember,
      commissionInfo: state => state.Widget.commissionInfo,
      dialogVisible: state => state.Widget.commissionDialogVisible
    }),
  },
  methods: {
    ...mapMutations([
      CLOSE_COMMISSION_DIALOG
    ]),
    onPageChanged(page) {
      this.$hub.$emit("Widgets:CommisionDialog:pageChange", page)
    }
  },
}
</script>

<style lang="stylus">
#CommisionDialog
  .el-table 
    th 
      background-color: #eee
    td p 
      margin-bottom: 0

</style>
