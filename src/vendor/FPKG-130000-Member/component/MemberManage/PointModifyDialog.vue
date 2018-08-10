<template>
  <el-dialog
    id="PointModifyDialog"
    :visible.sync="dialogVisible"
    width="350px"
    :title="$route.query.action === 'add' ? '撥點' : '扣點'"
    :before-close="() => SWITCH_POINT_DIALOG(false)">
    <el-form label-position="top">
      <el-form-item label="帳號">
        <el-input v-model="form.account" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$route.query.action === 'add' ? '撥點點數' : '扣點點數'">
        <el-input v-model="form.point"></el-input>
      </el-form-item>
      <el-form-item label="備註">
        <el-input v-model="form.memo"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_POINT_DIALOG(false)">取消</el-button>
      <el-button type="primary" @click="onSubmit">確定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_POINT_DIALOG,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      form: {
        account: this.$route.params.acc,
        point: "",
        memo: "",
      }
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.Member.MemberManage.pointDialogVisible
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_POINT_DIALOG
    ]),
    onSubmit() {
      this.$store.commit(SWITCH_POINT_DIALOG, false)
    },
  },
}
</script>

<style lang="stylus">
#PointModifyDialog
  //
</style>
