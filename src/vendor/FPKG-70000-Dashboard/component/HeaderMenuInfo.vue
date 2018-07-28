<template>
  <div id="HeaderMenuInfo">
    <!-- <i class="el-icon-menu" style="margin-right: 15px" @click="$store.commit('SWITCH_WEB_SYS_MENU', !showSysMenu)"></i>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <HeaderSysMenu v-if="showSysMenu"></HeaderSysMenu>
    </transition> -->
    
    <el-dropdown trigger="click" style="cursor: pointer" @command="onClick">
      <i class="el-icon-menu" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="m,i in menu" :key="m.name" :command="m.name">{{m.title}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click" style="cursor: pointer" @command="onClick">
      <span class="username">{{userInfo.name}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="PersonalProfile">個人資訊</el-dropdown-item>
        <el-dropdown-item command="Logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    
  </div>
</template>

<script>
import HeaderSysMenu from './HeaderSysMenu.vue'
import { USER_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    HeaderSysMenu: HeaderSysMenu,
  },
  props: [],
  computed: {
    ...mapState({
      showSysMenu: state => state.Dashboard.isShowWebSysMenu,
      menu: state => state.Dashboard.menu
    }),
    ...mapGetters({
      userInfo: USER_INFO
    })
  },
  methods: {
    onClick(target) {
      this.$router.push({name: target})
    }
  }
  
  
}
</script>

<style lang="stylus">

</style>
