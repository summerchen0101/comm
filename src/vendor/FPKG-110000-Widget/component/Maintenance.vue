<template>
  <div class="bg">
    <img src="@/assets/Maintenance-bg.jpg">
  </div>
</template>

<script>
import {
  GET_USER_INFO,
 } from '@/vendor/FPKG-40000-VuexStore/constants'
export default {
  async created() {
    await this.$store.dispatch(GET_USER_INFO)
    if(this.$store.state.Account.userInfo.account) {
      this.$router.push({name: 'Home'})
    }
  },
}

</script>

<style lang="stylus">
.bg
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index -999
  img 
    margin 0 auto
    min-height 100%
    width 100%
</style>
