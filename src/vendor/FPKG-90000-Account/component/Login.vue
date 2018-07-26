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
                          placeholder="請輸入帳號">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input type="text"
                          v-model="form.password"
                          required
                          placeholder="請輸入密碼">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox-group>
              <b-form-checkbox v-model="form.remember">記住我</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <div class="submit-btn-group">
            <b-button type="submit" variant="primary">登入</b-button>
            <b-button type="reset" variant="secondary">重設</b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { DO_LOGIN } from '@/vendor/FPKG-40000-VuexStore/constants'
export default {
  data() {
    return {
      form: {
        account: "admin",
        password: "Ab12345",
        remember: false,
      }
    }
  },
  
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      let f = this.form
      let data = {
        p5_ant_account: f.account,
        p5_ant_passwd: f.password,
      }
      this.$store.dispatch(DO_LOGIN, data)
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
#Login
  background-color: #666
  height: 100vh
  display: flex
  justify-content center 
  align-items center
  .login-box 
    width: 300px 
    // height: 400px
    background-color: #333
    color: #fff
    padding: 25px
    border: 1px solid #555
    border-radius: 10px
    box-shadow: 0 0 10px rgba(#000, 0.2)
    .logo 
      font-size: 50px 
      line-height 100px
      text-align center
      color: $TME-100-second-color
    .submit-btn-group
      text-align: center
      button 
        margin: 0 5px
</style>
