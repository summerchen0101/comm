<template>
  <div id="PersonalProfile">
    <!-- <MenuComponent></MenuComponent>
    <MobileMenu></MobileMenu> -->
    <div id="main">
      <Breadcrumb :path="breadcrumbPath"></Breadcrumb>
      <div class="main-container">
        <h2>個人資料</h2>
        <div v-if="userInfo.account" class="mt-4">
          <p>帳號：{{userInfo.account.p5_ant_account}}</p>
          <p>站台：{{userInfo.branch.p3_bch_name}}</p>
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import { USER_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "個人資料"},
      ]
    }
  },
  computed: {
    ...mapGetters({
      userInfo: USER_INFO
    })
  },
  

  mounted() {
  }
}
</script>

<style lang="stylus">
</style>
