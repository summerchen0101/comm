<template>
  <div id="OperatingLog">
    操作日誌
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
        {link: "/", title: "首頁"},
        {link: null, title: "後台管理"},
        {link: null, title: "操作日誌"},
      ]
    }
  },
  

  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  }
}
</script>

<style lang="stylus">
</style>
