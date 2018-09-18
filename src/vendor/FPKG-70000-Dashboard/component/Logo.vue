<template>
  <div id="Logo">
    <el-dropdown trigger="click" style="cursor: pointer" @command="onClick">
      <i class="el-icon-caret-bottom" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="m,i in $store.state.Dashboard.menu" :key="m.name" :command="m.name" :class="{'sys-menu-active': matchRoute(m.name)}">
          <span class="sys-menu-icon">
            <font-awesome-icon :icon="m.icon || 'th-large'" />
          </span>
          <span style="margin-left: 10px">{{m.title}}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="pointer" @click="$router.push({name: 'Home'})">
      眾發後台管理
    </span>
  </div>
</template>

<script>

export default {
  methods: {
    onClick(target) {
      this.$router.push({name: target})
    },
    matchRoute(name) {
      return this.$route.matched.findIndex(r => r.name === name) > -1
    }
  }
}
</script>

<style lang="stylus">


</style>
