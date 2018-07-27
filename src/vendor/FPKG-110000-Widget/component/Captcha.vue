<template>
  <div class="captcha">
    <img v-if="captcha" :src="captcha.captchaUrl" alt="">
  </div>
</template>

<script>
import { GET_CAPTCH, CLEAR_CAPTCH } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  props: {
  },
  computed: {
    ...mapState({
      captcha: state => state.Widget.captcha
    })
  },
  methods: {
    getCaptch() {
      this.$store.dispatch(GET_CAPTCH)
    },
    onClickCaptcha() {
      this.$store.commit(CLEAR_CAPTCH)
      setTimeout(() => {
        this.getCaptch()
      })
      
      
    }
  },
  mounted() {
    this.getCaptch()
  }

}

</script>

<style lang="stylus">
.captcha 
  img 
    max-width: 100%
    // cursor: pointer
</style>
