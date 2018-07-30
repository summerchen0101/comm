<template>
  <el-dialog
    title="歷程資訊"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="() => SWITCH_HISTORY_DIALOG(false)">
    ...
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
      dialogVisible: state => state.Global.historyDialogVisible
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

</style>
