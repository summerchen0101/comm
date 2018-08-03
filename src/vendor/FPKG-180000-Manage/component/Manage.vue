<template>
  <div id="Manage">
    <MenuComponent parent="Manage"></MenuComponent>
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb :path="breadcrumbPath"></Breadcrumb>
      <div class="main-container">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
// import { } from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "後台管理"},
      ]
    }
  },
  

  mounted() {
  }
}
</script>

<style lang="stylus">
</style>
