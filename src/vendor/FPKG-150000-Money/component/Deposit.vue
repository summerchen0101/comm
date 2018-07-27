<template>
  <div id="Deposit">
    <PageTitle title="存款管理">
      <!-- <el-button slot="btns" type="primary" @click="SWITCH_MARQUEE_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button> -->
    </PageTitle>
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
        {link: null, title: "存提管理"},
        {link: null, title: "存款管理"},
      ]
    }
  },
  

  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    // this.$store.dispatch(GET_MARQUEE_LIST)
  }
}
</script>

<style lang="stylus">
</style>
