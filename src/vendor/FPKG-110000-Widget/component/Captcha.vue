<template>
  <div class="captcha">
    <img v-if="captcha" :src="captcha.captchaUrl" alt="">
  </div>
</template>

<script>
import { GET_CAPTCH } from '@/vendor/FPKG-40000-VuexStore/constants'
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
    async getCaptch() {
      await this.$store.dispatch(GET_CAPTCH)
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
</style>
