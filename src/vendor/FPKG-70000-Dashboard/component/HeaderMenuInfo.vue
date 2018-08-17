<template>
  <div id="HeaderMenuInfo">
    <!-- <el-dropdown trigger="click" style="cursor: pointer" @command="onClick">
      <i class="el-icon-menu" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="m,i in menu" :key="m.name" :command="m.name" :class="{'sys-menu-active': matchRoute(m.name)}">
          <span class="sys-menu-icon">
            <font-awesome-icon :icon="m.icon || 'th-large'" />
          </span>
          <span style="margin-left: 10px">{{m.title}}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <span class="username">{{userInfo.name}}</span>
    <!-- <el-dropdown trigger="click" style="cursor: pointer" @command="onClick">
      <span class="username">{{userInfo.name}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="PersonalProfile">個人資訊</el-dropdown-item>
        <el-dropdown-item command="Logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    
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
      // showSysMenu: state => state.Dashboard.isShowWebSysMenu,
      menu: state => state.Dashboard.menu
    }),
    ...mapGetters({
      userInfo: USER_INFO
    })
  },
  methods: {
    onClick(target) {
      this.$router.push({name: target})
    },
    matchRoute(name) {
      return this.$route.matched.findIndex(r => r.name === name) > -1
    }
  },
  mounted() {
    console.log(this.$route)
  }
  
  
}
</script>

<style lang="stylus">
.el-dropdown-menu__item.sys-menu-active,
.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus
  color: $TME-100-second-color
.sys-menu-icon
  display: inline-block 
  width: 14px
  text-align: center
</style>
