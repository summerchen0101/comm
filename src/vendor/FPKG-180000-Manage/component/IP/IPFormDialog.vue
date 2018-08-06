<template>
  <el-dialog
    :title="form.id ? '編輯IP' : '新增IP'"
    :before-close="() => SWITCH_IP_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="ipForm"
      >
      <el-form-item label="IP" prop="ip[0]">
        <el-col :span="4">
          <el-input v-model.trim="form.ip[0]"></el-input>
        </el-col>
        <el-col :span="2" class="text-center">-</el-col>
        <el-col :span="4">
          <el-input v-model.trim="form.ip[1]"></el-input>
        </el-col>
        <el-col :span="2" class="text-center">-</el-col>
        <el-col :span="4">
          <el-input v-model.trim="form.ip[2]"></el-input>
        </el-col>
        <el-col :span="2" class="text-center">-</el-col>
        <el-col :span="4">
          <el-input v-model.trim="form.ip[3]"></el-input>
        </el-col>
        <el-col :span="24">
          <span class="text-danger">＊*表示所填IP對應段不做限制，IP首段不能為*。</span>
        </el-col>
      </el-form-item>
      <el-form-item label="IP描述" prop="desc">
        <el-input v-model.trim="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_IP_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.id" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_IP_DIALOG, 
  GET_IP_LIST, 
  GET_IP, 
  ADD_IP, 
  EDIT_IP,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time'
import { status } from '@/vendor/FPKG-10000-Config/enum'

let initForm = {
        ip: ['', '', '', ''],
        desc: ""
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.Manage.IP.dialogVisible,
    }),
    formRules() {
      let pwConfirmValidator = (rules, value, cb) => {
        if(this.form.pw != this.form.pw_confirm) {
          cb(false)
        }else {
          cb()
        }
      }
      return {
        // 'ip[0]': [
        //   { required: true, message: 'IP為必填', trigger: 'blur' },
        // ],
      }
    }
  },
  methods: {
    ...mapMutations([
      SWITCH_IP_DIALOG
    ]),
    onCreateSubmit() {
      this.$refs.ipForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_IP, this.form)
        }
      });
    },
    onEditSubmit() {
      this.$refs.ipForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_IP, this.form)
        }
      });
    },
    setForm(formData) {
      setTimeout(() => this.$refs.ipForm.clearValidate())
      this.form = Object.assign({}, formData)
    },
    clearForm() {
      console.log("clearForm")
      console.log(initForm)
      this.form = Object.assign({}, initForm)
      setTimeout(() => this.$refs.ipForm.clearValidate())
    },

    onStartAtChanged() {
      this.form.endAt = endAtDay(this.form.startAt)
    }
  },
  
  mounted() {
    this.$hub.$on("Manage:ipFormUpdate", this.setForm)
    this.$hub.$on("Manage:clearIPForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
