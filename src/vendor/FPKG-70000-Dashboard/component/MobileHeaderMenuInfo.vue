<template>
  <div id="MobileHeaderMenuInfo">
    <i class="el-icon-menu" style="margin-right: 15px; color: #fff" @click="onClick"></i>
    <el-dropdown trigger="click" style="cursor: pointer" @command="onUserNameClick">
      <span class="username">{{userInfo.account && userInfo.account.p5_ant_account}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="UserInfo">個人資訊</el-dropdown-item>
        <el-dropdown-item command="Logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { USER_INFO, SWITCH_MOBILE_MENU } from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  computed: {
    ...mapState({
      isShowMobileMenu: state => state.Dashboard.isShowMobileMenu,
      menu: state => state.Dashboard.menu
    }),
    ...mapGetters({
      userInfo: USER_INFO
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onClick(target) {
      this.$hub.$emit("mobile-menu-click")
      this.$store.commit(SWITCH_MOBILE_MENU, !this.isShowMobileMenu)
    },
    onUserNameClick(target) {
      this.$router.push({name: target})
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus">


</style>
