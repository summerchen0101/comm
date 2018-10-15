<template>
<div id="Dashboard" :class="$store.state.Dashboard.themeName">
  <div id="header">
    <div class="fixed-container">
      <Logo></Logo>
      <HeaderAccount></HeaderAccount>
      <!-- Web -->
      <HeaderMenuInfo></HeaderMenuInfo>

      <!-- Mobile -->
      <MobileHeaderMenuInfo></MobileHeaderMenuInfo>
    </div>
    
    
  </div>
  <div class="center">
    <PasswdDialog></PasswdDialog>
    <LoadingCover></LoadingCover>
    <router-view/>
    
  </div>
  <div id="footer">
    <FooterInfo></FooterInfo>
  </div>
</div>

</template>

<script>
import HeaderAccount from './HeaderAccount.vue'
import HeaderMenuInfo from './HeaderMenuInfo.vue'
import MobileHeaderMenuInfo from './MobileHeaderMenuInfo.vue'
import Logo from './Logo.vue'
import FooterInfo from './FooterInfo.vue'
import HeaderSysMenu from './HeaderSysMenu.vue'
import { SET_THEME } from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  components: {
    HeaderAccount,
    HeaderMenuInfo,
    MobileHeaderMenuInfo,
    FooterInfo,
    HeaderSysMenu,
    Logo,
  }
}
</script>


<style lang="stylus">
</style>
