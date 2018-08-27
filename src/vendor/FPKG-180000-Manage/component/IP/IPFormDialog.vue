<template>
  <el-dialog
    :title="form.id ? '編輯IP' : '新增IP'"
    :before-close="() => SWITCH_IP_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="70%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="ipForm"
      >
      <el-form-item label="IP">
        <el-col :span="4">
          <el-form-item prop="ipColumns[0]">
            <el-input v-model.trim="form.ipColumns[0]"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center">-</el-col>
        <el-col :span="4">
          <el-form-item prop="ipColumns[1]">
            <el-input v-model.trim="form.ipColumns[1]"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center">-</el-col>
        <el-col :span="4">
          <el-form-item prop="ipColumns[2]">
            <el-input v-model.trim="form.ipColumns[2]"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center">-</el-col>
        <el-col :span="4">
          <el-form-item prop="ipColumns[3]">
            <el-input v-model.trim="form.ipColumns[3]"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span class="text-danger">填「*」表示所填IP對應段不做限制，IP首段不能填「*」。</span><br>
          <span class="text-danger">ex: 192.168.0.*</span>
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
import { ipColumnValidator, firstIpColumnValidator } from '@/vendor/FPKG-120000-Util/customValidate'

let initForm = {
        ipColumns: ['', '', '', ''],
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
      return {
        'ipColumns[0]': [
          { required: true, message: '不可為空', trigger: 'blur' },
          { validator: firstIpColumnValidator, trigger: 'blur' },
        ],
        'ipColumns[1]': [
          { required: true, message: '不可為空', trigger: 'blur' },
          { validator: ipColumnValidator, trigger: 'blur' },
        ],
        'ipColumns[2]': [
          { required: true, message: '不可為空', trigger: 'blur' },
          { validator: ipColumnValidator, trigger: 'blur' },
        ],
        'ipColumns[3]': [
          { required: true, message: '不可為空', trigger: 'blur' },
          { validator: ipColumnValidator, trigger: 'blur' },
        ],
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
      this.form = this.$lodash.cloneDeep(initForm)
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
