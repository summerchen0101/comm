<template>
  <div id="Money">
    <MenuComponent></MenuComponent>
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb :path="breadcrumbPath"></Breadcrumb>
      <div class="main-container">
      </div>
    </div>
    
  </div>
</template>

<script>
import Menu from '@/vendor/FPKG-70000-Dashboard/component/Menu.vue';
import MobileMenu from '@/vendor/FPKG-70000-Dashboard/component/MobileMenu.vue';
// import { } from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  components: {
    MenuComponent: Menu,
    MobileMenu: MobileMenu,
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "存款管理"},
      ]
    }
  },
  

  mounted() {
  }
}
</script>

<style lang="stylus">
</style>
