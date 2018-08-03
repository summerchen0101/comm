<template>
  <div id="Money">
    <MenuComponent parent="Money"></MenuComponent>
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb></Breadcrumb>
      <div class="main-container">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
import { SET_BREADCRUMB } from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "存提管理"},
      ]
    }
  },
  

  mounted() {
    // this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  }
}
</script>

<style lang="stylus">
</style>
