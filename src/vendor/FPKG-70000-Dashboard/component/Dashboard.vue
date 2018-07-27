<template>
<div id="Dashboard" :class="$store.state.Dashboard.themeName">
  <div id="header">
    <div class="fixed-container">
      <Logo></Logo>

      <!-- Web -->
      <HeaderMenuInfo></HeaderMenuInfo>

      <!-- Mobile -->
      <MobileHeaderMenuInfo></MobileHeaderMenuInfo>
    </div>
    
    
  </div>
  <div class="center">
    <LoadingCover :show="$store.state.Widget.displayLoadingCover"></LoadingCover>
    <router-view/>
    
  </div>
  <div id="footer">
    <FooterInfo></FooterInfo>
  </div>
</div>

</template>

<script>
import HeaderMenuInfo from './HeaderMenuInfo.vue'
import MobileHeaderMenuInfo from './MobileHeaderMenuInfo.vue'
import Logo from './Logo.vue'
import FooterInfo from './FooterInfo.vue'
import HeaderSysMenu from './HeaderSysMenu.vue'
import LoadingCover from '@/vendor/FPKG-110000-Widget/component/LoadingCover.vue'
import { SET_THEME } from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  components: {
    HeaderMenuInfo,
    MobileHeaderMenuInfo,
    FooterInfo,
    HeaderSysMenu,
    Logo,
    LoadingCover
  }
}
</script>


<style lang="stylus">


</style>
