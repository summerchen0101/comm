<template>
  <div id="MemberSearch">
    會員搜尋
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
        {name: null, title: "會員資訊"},
        {name: null, title: "會員搜尋"},
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
