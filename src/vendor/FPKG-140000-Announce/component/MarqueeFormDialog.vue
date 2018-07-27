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
        <el-input v-model.trim="form.title"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model.trim="form.desc"></el-input>
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
          type="datetime">
        </el-date-picker>
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
import { codeValidator } from '@/vendor/FPKG-120000-Util/customValidate';
import { startAtDay, endAtDay, dateAfter , dateBefore} from '@/vendor/FPKG-120000-Util/time.js'

let initForm = {
        id: "",
        title: "",
        desc: "",
        startAt: startAtDay(new Date()),
        endAt: endAtDay(new Date()),
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
        ],
        desc: [
          { required: true, message: '內容為必填', trigger: 'blur' },
          { max: 100, message: '最多為100字', trigger: 'blur' },
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
      dialogVisible: state => state.Announce.dialogVisible,
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
      this.form = Object.assign({}, formData)
    },
    clearForm() {
      this.form = Object.assign({}, initForm)
      if(this.$refs.marqueeForm) {
        this.$refs.marqueeForm.resetFields();
      }
    },

    onStartAtChanged() {
      this.form.endAt = endAtDay(this.form.startAt)
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
