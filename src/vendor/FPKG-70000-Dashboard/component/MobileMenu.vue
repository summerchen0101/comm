<template>
  <div id="mobile-aside" :class="{isShow: isShowMobileMenu}">
    <el-menu
      :router="true"
      @select="onSelected"
      @open="handleOpen"
      @closed="handleClose">
      <template v-for="m1, i1 in menu">
        <el-submenu v-if="m1.children" :index="`${i1+1}`" :key="m1.path">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{m1.title}}</span>
          </template>
          <template v-for="m2, i2 in m1.children">
            <el-submenu v-if="m2.children" :index="`${i1+1}-${i2+1}`" :key="m2.path">
              <template slot="title">{{m2.title}}</template>
              <template v-for="m3, i3 in m2.children">
                <el-submenu v-if="m3.children" :index="`${i1+1}-${i2+1}-${i3+1}`" :key="m3.path">
                  <template slot="title">{{m3.title}}</template>
                  <template v-for="m4, i4 in m3.children">
                    <!-- <el-submenu v-if="m4.children" :index="`${i1+1}-${i2+1}-${i3+1}-${i4+1}`" :key="m4.path">
                      <template slot="title">{{m4.title}}</template>
                      //
                    </el-submenu> -->
                    <el-menu-item :index="`${i1+1}-${i2+1}-${i3+1}-${i4+1}`" :key="m4.path" :route="{name: m1.name}">
                      <span slot="title">{{m4.title}}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item v-else :index="`${i1+1}-${i2+1}-${i3+1}`" :key="m3.path" :route="{name: m1.name}">
                  <span slot="title">{{m3.title}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="`${i1+1}-${i2+1}`" :key="m2.path" :route="{name: m1.name}">
              <span slot="title">{{m2.title}}</span>
            </el-menu-item>
          </template>
          
        </el-submenu>
        <el-menu-item v-else :index="`${i1+1}`" :key="m1.path" :route="{name: m1.name}">
          <i class="el-icon-menu"></i>
          <span slot="title">{{m1.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      isShowMobileMenu: state => state.Dashboard.isShowMobileMenu,
      menu: state => state.Dashboard.menu
    }),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onSelected(key, keyPath) {
      console.log(key, keyPath);
      this.$store.commit("SWITCH_MOBILE_MENU", !this.isShowMobileMenu)
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus">

</style>
