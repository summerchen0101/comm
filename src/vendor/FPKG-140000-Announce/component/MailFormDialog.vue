<template>
  <el-dialog :visible.sync="visible" :title="title" :before-close="()=>hideDialog()" width="50%" @open="onOpen()">
    <el-form :model.sync="form" :rules="formRules" ref="mailForm" label-position="right" label-width="80px" status-icon>
      <el-form-item id="my-sendtype" label="發送目標" prop="send_type">
        <el-radio v-model="form.send_type" :label="3" @change="changeType(3)">全站</el-radio>
        <el-radio v-model="form.send_type" :label="2" @change="changeType(2)">帳號</el-radio>
      </el-form-item>
      <el-form-item label="帳號" prop="target_account">
        <el-input v-model.trim="form.target_account" :disabled="form.send_type!==2" type="textarea" placeholder="請用逗號區隔帳號 範例: phrv612,phrv229"></el-input>
      </el-form-item>
      <el-form-item label="標題" prop="title">
        <el-input v-model.trim="form.title" placeholder="10字為限"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model.trim="form.description" type="textarea" placeholder="200字為限"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="submit()">{{ id > 0 ? '修 改' : '新 增' }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import {
  ADD_MAIL, 
  EDIT_MAIL,
  SET_MAIL_DIALOG_VISIBLE
} from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  props: {
    title: String,
    id: Number,
    form: Object
  },
  data() {
    return {
      formRules : {
        target_account: [
          { required: false, message: '帳號為必填', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '標題為必填', trigger: 'blur' },
          { max: 10, message: '最多為10字內', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '內容為必填', trigger: 'blur' },
          { max: 200, message: '最多為200字內', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      visible: state => state.Announce.Mail.dialogVisible
    })
  },
  methods: {
    onOpen() {
      if (this.$refs.mailForm) { this.$refs.mailForm.clearValidate() }
    },
    hideDialog() {
      this.$store.commit(SET_MAIL_DIALOG_VISIBLE, false)
    },
    changeType(type) {
      switch (type) {
        case 2:
          this.formRules.target_account[0].required = true
          if (this.$refs.mailForm) { this.$refs.mailForm.clearValidate() }
          break
        case 3:
          this.formRules.target_account[0].required = false
          if (this.$refs.mailForm) { this.$refs.mailForm.clearValidate() }
          break
      }
    },
    cancel() {
      this.hideDialog()
    },
    async submit() {
      this.$refs.mailForm.validate( async valid => {
        if (valid) {
          if (this.id > 0) {
            const data = { id: this.id, data: this.form }
            await this.$store.dispatch(EDIT_MAIL, data)
          }
          else {
            await this.$store.dispatch(ADD_MAIL, this.form)
          }
        }
      })
    }
  }
}
</script>

<style>
#my-sendtype > label {
  margin-top: 5px;
}
#my-sendtype > div.el-form-item__content {
  padding-left: 8px;
}
</style>