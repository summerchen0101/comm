<template>
  <el-dialog
    :title="form.id ? '編輯跑馬燈' : '新增跑馬燈'"
    :before-close="() => SWITCH_MARQUEE_DIALOG(false)"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form 
      label-width="80px" 
      label-position="left"
      status-icon 
      :model="form"
      :rules="formRules"
      ref="marqueeForm"
      >
      <el-form-item label="標題" prop="title">
        <el-input v-model.trim="form.title" placeholder="20字為限"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model.trim="form.desc" placeholder="100字為限"></el-input>
      </el-form-item>
      <el-form-item label="開始時間" prop="startAt">
        <el-date-picker
          v-model="form.startAt"
          :picker-options="startAtOption"
          @change="onStartAtChanged"
          type="datetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="結束時間" prop="endAt">
        <el-date-picker
          v-model="form.endAt"
          :picker-options="endAtOption"
          :disabled="form.forever"
          type="datetime">
        </el-date-picker>
        <el-checkbox class="mb-0 ml-3" v-model="form.forever">長期</el-checkbox>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="SWITCH_MARQUEE_DIALOG(false)">取 消</el-button>
      <el-button v-if="form.id" type="primary" @click="onEditSubmit">修 改</el-button>
      <el-button v-else type="primary" @click="onCreateSubmit">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { 
  SWITCH_MARQUEE_DIALOG, 
  GET_MARQUEE_LIST, 
  GET_MARQUEE, 
  ADD_MARQUEE, 
  EDIT_MARQUEE,
  } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { codeValidator, startAtValidator, endAtValidator } from '@/vendor/FPKG-120000-Util/customValidate';
import moment, { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'

let initForm = {
        id: "",
        title: "",
        desc: "",
        startAt: moment(new Date()).add(5, 'minutes'),
        endAt: moment(new Date()).add(1, 'days').add(5, 'minutes'),
        forever: false,
      }
export default {
  data() {
    return {
      form: Object.assign({}, initForm),
      formRules: {
        code: [
          { required: true, message: '代碼為必填', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' },
        ],
        title: [
          { required: true, message: '標題為必填', trigger: 'blur' },
          { max: 20, message: '最多為20字內', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '內容為必填', trigger: 'blur' },
          { max: 100, message: '最多為100字內', trigger: 'blur' },
        ],
        startAt: [
          { required: true, message: '開始時間為必填', trigger: 'blur' },
          { validator: startAtValidator.bind(this), trigger: 'blur' },
        ],
        endAt: [
          { required: true, message: '結束時間為必填', trigger: 'blur' },
          { validator: endAtValidator.bind(this), trigger: 'blur' },
        ],
      },
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
      dialogVisible: state => state.Announce.Marquee.dialogVisible,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_MARQUEE_DIALOG
    ]),
    
    onCreateSubmit() {
      this.$refs.marqueeForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(ADD_MARQUEE, this.form)
        }
      });
    },
    onEditSubmit() {
      this.$refs.marqueeForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT_MARQUEE, this.form)
        }
      });
    },
    setForm(formData) {
      setTimeout(() => this.$refs.marqueeForm.clearValidate())
      this.form = Object.assign({}, formData)
    },
    clearForm() {
      setTimeout(() => this.$refs.marqueeForm.clearValidate())
      this.form = Object.assign({}, initForm)
    },

    onStartAtChanged() {
      // this.form.endAt = moment(this.form.startAt).add(1, "days")
    }
  },
  
  created() {
    this.$hub.$on("Announce:marqueeFormUpdate", this.setForm)
    this.$hub.$on("Announce:clearMarqueeForm", this.clearForm)
  }
}
</script>

<style lang="stylus">

</style>
