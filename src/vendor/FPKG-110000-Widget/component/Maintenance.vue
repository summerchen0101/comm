<template>
  <div id="Maintenance">
    <h2>維護中請稍候...<font-awesome-icon icon="spinner" spin /><br></h2>
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
#Maintenance
  display flex
  justify-content center
  align-items center
  height: 100vh
  h2 
    color #333
    letter-spacing 2px
</style>
