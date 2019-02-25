<template>
  <div id="PlatformGame">
    <PageTitle title="直播設定"></PageTitle>
    <div>
      <el-form :inline="true" :model="form" :rules="formRules" ref="form">
        <table class="table">
          <thead>
            <tr>
              <th>狀態</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <el-radio v-model="form.status" :label="1">
                  開啟
                  <span class="ml-3">
                    開啟時點選的網址：
                    <el-form-item
                      style="margin-bottom: 0; vertical-align: middle"
                      prop="urlOnOpen">
                      <el-input v-model="form.urlOnOpen"></el-input>
                    </el-form-item>
                  </span>
                </el-radio>
                <el-radio v-model="form.status" :label="2">隱藏</el-radio>
              </td>
            </tr>
            <tr>
              <td>
                <el-radio v-model="form.status" :label="3">
                  關閉
                  <span class="ml-3">
                    下次開啟時間：
                    <el-form-item
                      style="margin-bottom: 0; vertical-align: middle"
                      prop="openAt">
                      <el-date-picker type="datetime" v-model="form.openAt"></el-date-picker>
                    </el-form-item>
                  </span>

                  <span class="ml-3">
                    關閉時點選的網址：
                    <el-form-item
                      style="margin-bottom: 0; vertical-align: middle"
                      prop="urlOnClose">
                      <el-input v-model="form.urlOnClose"></el-input>
                    </el-form-item>
                  </span>
                </el-radio>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      <SubmitBar>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">確定</el-button>
      </SubmitBar>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB, SET_ADULT_MANAGE, GET_ADULT_MANAGE } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { toDate, toDateTime, startAtDay, endAtDay, dateAfter, dateBefore, getRangeLastDate } from '@/vendor/FPKG-120000-Util/time.js'
import { mapState } from 'vuex';
import { urlValidator, openTimeValidator } from '@/vendor/FPKG-120000-Util/customValidate'
let initForm = {
        status: 1,
        urlOnOpen: '',
        urlOnClose: '',
        openAt: '',
      }
export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "平台管理"},
        {name: null, title: "成人管理"},
      ],
      form: Object.assign({}, initForm)
    }
  },
  computed: {
    ...mapState({
      adultSetting: state => state.Platform.PlatformAdult.adultSetting
    }),
    formRules() {
      return {
        urlOnOpen: [
          {required: this.form.status === 1, message: "網址為必填", trigger: "blur"},
          {validator: urlValidator, trigger: "blur"},
        ],
        urlOnClose: [
          {required: this.form.status === 3, message: "網址為必填", trigger: "blur"},
          {validator: urlValidator, trigger: "blur"},
        ],
        openAt: [
          {required: this.form.status === 3, message: "開啟時間為必填", trigger: "blur"},
          {validator: openTimeValidator.bind(this), trigger: "blur"},
        ],
      }
    }
  },
  methods: {
    setForm() {
      console.log(this.adultSetting)
      this.form = Object.assign({}, initForm, this.adultSetting)
      setTimeout(()=> {
        this.$refs.form.clearValidate()
      })
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch(SET_ADULT_MANAGE, this.form)
          await this.$store.dispatch(GET_ADULT_MANAGE)
          this.setForm()
        }
      });
    },
    onCancel() {
      if(!this.$lodash.isEqual(this.form, this.adultSetting)) {
        this.$confirm('你確定放棄所有設定之變更嗎?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setForm()
        }).catch(() => {
        });
      }
      
    },
  },
  async created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_ADULT_MANAGE)
    this.setForm()
  }
}
</script>

<style lang="stylus">
</style>
