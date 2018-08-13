<template>
  <el-dialog
    id="PointModifyDialog"
    :visible.sync="dialogVisible"
    width="350px"
    :title="$route.query.action === 'add' ? '撥點' : '扣點'"
    @open="onOpen"
    @closed="afterClosed"
    :before-close="onClose">
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
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">確定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_POINT_DIALOG,
  SET_MEMBER_POINT_MODIFY,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
let initForm = {
        account: "",
        point: "",
        memo: "",
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm, {account: this.$route.params.acc})
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.Member.MemberManage.pointDialogVisible,
      pointModify: state => state.Member.MemberManage.pointModify
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_POINT_DIALOG
    ]),
    onSubmit() {
      this.$store.commit(SET_MEMBER_POINT_MODIFY, {
        type: this.$route.query.action,
        point: this.form.point,
        memo: this.form.memo,
      })
      this.$store.commit(SWITCH_POINT_DIALOG, false)
    },
    clearForm() {
      this.form = Object.assign({}, initForm)
    },
    onClose() {
      this.$store.commit(SWITCH_POINT_DIALOG, false)
    },
    onOpen() {
      this.form = Object.assign({}, initForm, {
        account: this.$route.params.acc,
        point: this.pointModify[this.$route.query.action].point,
        memo: this.pointModify[this.$route.query.action].memo
      })
    },
    afterClosed() {
      this.clearForm()
    }
  },
}
</script>

<style lang="stylus">
#PointModifyDialog
  //
</style>
