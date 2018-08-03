<template>
  <div id="Demo">
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
// import { } from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "範例"},
      ]
    }
  },
  

  mounted() {
  }
}
</script>

<style lang="stylus">
</style>
