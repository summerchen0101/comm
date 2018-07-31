<template>
  <div id="Login">
    <div class="login-box">
      <div class="logo">LOGO</div>
      <div class="login-form">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group>
            <b-form-input type="text"
                          v-model="form.account"
                          required
                          placeholder="帳號">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input type="text"
                          v-model="form.password"
                          required
                          placeholder="密碼">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <el-col :span="11">
              <b-form-input type="text"
                          v-model="form.captcha"
                          required
                          placeholder="驗證碼">
              </b-form-input>
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
    <LoadingCover :show="$store.state.Widget.displayLoadingCover"></LoadingCover>
  </div>
</template>

<script>
import { DO_LOGIN } from '@/vendor/FPKG-40000-VuexStore/constants'
import Captcha from '@/vendor/FPKG-110000-Widget/component/Captcha.vue'
export default {
  components: {
    Captcha
  },
  data() {
    return {
      form: {
        account: "thothadmin",
        password: "password",
        remember: false,
        captcha: "",
        captchaUuid: "",
      }
    }
  },
  
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      let f = {
        ...this.form,
        captchaUuid: this.$store.state.Widget.captcha.captchaUuid
      }
      this.$store.dispatch(DO_LOGIN, f)
    },
    onReset (evt) {
      evt.preventDefault();
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
