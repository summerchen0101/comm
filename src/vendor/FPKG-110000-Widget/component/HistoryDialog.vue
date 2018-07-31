<template>
  <el-dialog
    title="歷程資訊"
    id="HistoryDialog"
    :visible.sync="dialogVisible"
    width="630px"
    :before-close="() => SWITCH_HISTORY_DIALOG(false)">
    <el-table
      :data="historyList"
      border
      style="width: 100%">
      <el-table-column
        prop="time"
        label="時間"
        width="150">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP"
        width="100">
      </el-table-column>
      <el-table-column
        label="修改者"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.operatorAcc}}</span><br>
          <span>({{scope.row.operatorName}})</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改內容"
        width="300">
        <template slot-scope="scope">
          <p v-for="msg,i in scope.row.content" :key="i">
            {{msg}}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="SWITCH_HISTORY_DIALOG(false)">關閉</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_HISTORY_DIALOG,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      historyList: state => state.Widget.historyList,
      dialogVisible: state => state.Widget.historyDialogVisible
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_HISTORY_DIALOG
    ]),
  },
}
</script>

<style lang="stylus">
#HistoryDialog
  .el-table 
    th 
      background-color: #eee
    td p 
      margin-bottom: 0

</style>
