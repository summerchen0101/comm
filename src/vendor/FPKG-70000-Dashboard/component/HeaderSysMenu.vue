<template>
  <div id="HeaderSysMenu">
    <div class="sys-container">
      <div class="sys-content">
        <router-link v-for="m,i in menu" :key="m.name" class="sys-item" :to="{name: m.name}">
          <span class="sys-icon lnr lnr-mustache"></span>
          <span class="sys-txt">{{m.title}}</span>
        </router-link>
      </div>
    </div>
    
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      menu: state => state.Dashboard.menu
    }),
  }
}
</script>


<style lang="stylus">

</style>
