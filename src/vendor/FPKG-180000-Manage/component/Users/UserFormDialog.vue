<template>
  <el-dialog
    :title="form.id ? '編輯帳號' : '新增帳號'"
    :before-close="() => SWITCH_USER_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="userForm"
      >
      <el-form-item label="帳號" prop="account">
        <el-input v-model.trim="form.account" :disabled="!!form.id"></el-input>
      </el-form-item>
      <el-form-item label="暱稱" prop="nick">
        <el-input v-model.trim="form.nick"></el-input>
      </el-form-item>
      <el-form-item v-if="form.id" label="狀態" prop="status">
        <el-select v-model="form.status">
          <el-option v-for="opt in statusOpts.filter(t => t.id !== 0)" :label="opt.name" :value="opt.id" :key="opt.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="權限" prop="perGroup">
        <el-select v-model="form.perGroup">
          <el-option v-for="opt in perGroupOpts" :label="opt.name" :value="opt.id" :key="opt.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP" prop="ip">
        <el-select v-model="form.ip" multiple>
          <el-option v-for="opt in ipOpts" :label="opt.ip" :value="opt.id" :key="opt.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密碼" prop="pw">
        <el-input type="password" v-model.trim="form.pw"></el-input>
      </el-form-item>
      <el-form-item label="確認密碼" prop="pw_confirm">
        <el-input type="password" v-model.trim="form.pw_confirm"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_USER_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.id" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_USER_DIALOG, 
  GET_USER_LIST, 
  GET_USER, 
  ADD_USER, 
  EDIT_USER,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time'
import { pwValidator, pwConfirmValidator } from '@/vendor/FPKG-120000-Util/customValidate'

let initForm = {
        id: "",
        account: "",
        nick: "",
        status: 1,
        perGroup: 1,
        ip: [],
        pw: "",
        pw_confirm: "",
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
      startAtOption: {
        disabledDate: (val) => {
          return dateBefore(startAtDay(new Date()), val)
        }
      },
      endAtOption: {
        disabledDate: (val) => {
          return dateBefore(this.form.startAt, val) 
        }
      },
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.Manage.Users.dialogVisible,
      perGroupOpts: state => state.Manage.Users.perGroupOpts,
      ipOpts: state => state.Manage.Users.ipOpts,
      statusOpts: state => state.Global.userStatusOpts,
    }),
    formRules() {
      return {
        account: [
          { required: !this.form.id, message: '帳號為必填', trigger: 'blur' },
        ],
        nick: [
          { required: true, message: '暱稱為必填', trigger: 'blur' },
        ],
        perGroup: [
          { required: true, message: '權限為必填', trigger: 'blur' },
        ],
        pw: [
          { required: !this.form.id, message: '密碼為必填', trigger: 'blur' },
          { min: 8, max: 12, message: '至少需8~12碼英數字', trigger: 'blur' },
        ],
        pw_confirm: [
          { required: !this.form.id, message: '確認密碼為必填', trigger: 'blur' },
          { validator: pwConfirmValidator(this.form.pw), trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    ...mapMutations([
      SWITCH_USER_DIALOG
    ]),
    onCreateSubmit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_USER, this.form)
        }
      });
    },
    onEditSubmit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_USER, this.form)
        }
      });
    },
    setForm(formData) {
      setTimeout(() => this.$refs.userForm.clearValidate())
      this.form = Object.assign({}, formData)
    },
    clearForm() {
      this.form = Object.assign({}, initForm)
      setTimeout(() => this.$refs.userForm.clearValidate())
    },

    onStartAtChanged() {
      this.form.endAt = endAtDay(this.form.startAt)
    }
  },
  
  mounted() {
    this.$hub.$on("Manage:userFormUpdate", this.setForm)
    this.$hub.$on("Manage:clearUserForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
