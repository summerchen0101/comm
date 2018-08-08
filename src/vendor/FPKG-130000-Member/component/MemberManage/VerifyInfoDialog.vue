<template>
  <el-dialog
    id="VerifyInfoDialog"
    :visible.sync="dialogVisible"
    width="350px"
    :before-close="() => CLOSE_VERIFY_DIALOG()">
    <div slot="title">
      <span class="el-dialog__title">{{info.account}} 手機驗證碼</span>
      <el-button type="info" class="float-right" @click="onCopyText">複製資訊</el-button>
    </div>
    <el-form label-position="top">
      <el-form-item label="帳號">
        <el-input :value="info.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="預設密碼">
        <el-input :value="info.password" disabled></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="CLOSE_VERIFY_DIALOG">確定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  CLOSE_VERIFY_DIALOG,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { onCopyText } from '@/vendor/FPKG-120000-Util/other'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      info: state => state.Member.MemberManage.verifyInfo,
      dialogVisible: state => state.Member.MemberManage.displayVerifyDialog
    }),
    copyText() {
      return [
        {title: '帳號', content: this.info.account},
        {title: '預設密碼', content: this.info.password},
      ]
    }
  },
  methods: {
    ...mapMutations([
      CLOSE_VERIFY_DIALOG
    ]),
    onCopyText,
  },
}
</script>

<style lang="stylus">
#VerifyInfoDialog
  .el-table 
    th 
      background-color: #eee
    td p 
      margin-bottom: 0

</style>
