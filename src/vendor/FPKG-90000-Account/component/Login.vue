<template>
  <div id="Login">
    <div class="login-box">
      <div class="logo">LOGO</div>
      <div class="login-form">
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-form-group>
            <b-form-input type="text"
                          v-model="form.account"
                          placeholder="帳號">
            </b-form-input>
            <p v-if="$v.form.$dirty && !$v.form.account.required" class="errorMsg">帳號為必填</p>
            <p v-else-if="$v.form.$dirty && !$v.form.account.pattern" class="errorMsg">帳號格式有誤</p>
          </b-form-group>
          <b-form-group>
            <b-form-input type="password"
                          v-model="form.password"
                          placeholder="密碼">
            </b-form-input>
            <p v-if="$v.form.$dirty && !$v.form.password.required" class="errorMsg">密碼為必填</p>
            <p v-else-if="$v.form.$dirty && !$v.form.password.pattern" class="errorMsg">密碼格式有誤</p>
          </b-form-group>
          <b-form-group>
            <el-col :span="11">
              <b-form-input type="text"
                          v-model="form.captcha"
                          placeholder="驗證碼">
              </b-form-input>
              <p v-if="$v.form.$dirty && !$v.form.captcha.required" class="errorMsg">驗證碼為必填</p>
              <p v-else-if="$v.form.$dirty && !$v.form.captcha.pattern" class="errorMsg">驗證碼格式有誤</p>
            </el-col>
            <el-col :span="11" :offset="2">
              <Captcha></Captcha>
            </el-col>
          </b-form-group>
          <!-- <b-form-group>
            <b-form-checkbox-group>
              <b-form-checkbox v-model="form.remember">記住我</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group> -->
          <div class="submit-btn-group">
            <b-button type="submit" variant="primary">登入</b-button>
            <b-button type="reset" variant="secondary">重設</b-button>
          </div>
        </b-form>
      </div>
    </div>
    <LoadingCover></LoadingCover>
  </div>
</template>

<script>
import { DO_LOGIN } from '@/vendor/FPKG-40000-VuexStore/constants'
import Captcha from '@/vendor/FPKG-110000-Widget/component/Captcha.vue'
import { required, sameAs } from 'vuelidate/lib/validators'
import { Vcaptcha, VuserPw, Vaccount } from '@/vendor/FPKG-120000-Util/customValidate'
export default {
  components: {
    Captcha
  },
  data() {
    return {
      form: {
        account: "",
        password: "",
        remember: false,
        captcha: "",
        captchaUuid: "",
      },
      
    }
  },
  validations: {
    form: {
      account: { 
        required,
        pattern: Vaccount.test,
      },
      password: { 
        required,
        pattern: VuserPw.test,
      },
      captcha: {
        required,
        pattern: Vcaptcha.test
      }
    }
  },
  methods: {
    onSubmit () {
      this.$v.form.$touch()
      if(this.$v.form.$invalid) {
        return
      }
      let f = {
        ...this.form,
        captchaUuid: this.$store.state.Widget.captcha.captchaUuid
      }
      this.$store.dispatch(DO_LOGIN, f)
    },
    onReset () {
      this.form = {
        account: "",
        password: "",
        remember: false,
      }
    }
  },

  mounted() {
    
  }
}
</script>

<style lang="stylus">
@import '../style/component/Login'
</style>
