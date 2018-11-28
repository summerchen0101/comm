<template>
  <div id="HeaderMenuInfo">
    <div style="display:inline-block; margin:0px 32px;">
      <span>今日：</span>
      <span style="display:inline-block; margin:0px 8px;">
        <el-button type="warning">註冊會員 {{today.register}}</el-button>
        <el-button type="danger">存款點數 {{today.deposit | currency}}</el-button>
        <el-button type="success">提款點數 {{today.withdrawal | currency}}</el-button>
      </span>
      <span style="display:inline-block; width:16px; margin:0px 4px;">{{count}}</span>
      <span style="display:inline-block; margin:0px 4px;">
        <font-awesome-icon icon="sync-alt" :spin="isLoading" @click="getTodayList"/>
      </span>
    </div>

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
    </el-dropdown>-->
    <span class="username mr-3 pointer" @click="onUserNameClicked">{{userInfo.name}}</span>
    <router-link :to="{name: 'Logout'}" style="color: #fff">
      <font-awesome-icon icon="sign-out-alt"/>
    </router-link>
    <!-- <el-dropdown trigger="click" style="cursor: pointer" @command="onClick">
      <span class="username">{{userInfo.name}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="PersonalProfile">個人資訊</el-dropdown-item>
        <el-dropdown-item command="Logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>-->
  </div>
</template>

<script>
import HeaderSysMenu from "./HeaderSysMenu.vue";
import {
  USER_INFO,
  SWITCH_PASSWD_DIALOG,
  GET_TODAY_LIST
} from "@/vendor/FPKG-40000-VuexStore/constants";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    HeaderSysMenu: HeaderSysMenu
  },
  props: [],
  data() {
    return {
      count: 60,
      interval: null
    };
  },
  computed: {
    ...mapState({
      // showSysMenu: state => state.Dashboard.isShowWebSysMenu,
      menu: state => state.Dashboard.menu,
      today: state => state.Dashboard.today,
      isLoading: state => state.Dashboard.isLoadingToday
    }),
    ...mapGetters({
      userInfo: USER_INFO
    })
  },
  filters: {
    currency: function(value) {
      value = 100000.00099
      if (!value) return 0;
      const texts = value.toString().split(".");
      let text = texts[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,");
      return text;
    }
  },
  methods: {
    onClick(target) {
      this.$router.push({
        name: target
      });
    },
    matchRoute(name) {
      return this.$route.matched.findIndex(r => r.name === name) > -1;
    },
    onUserNameClicked() {
      this.$store.commit(SWITCH_PASSWD_DIALOG, true);
    },
    async getTodayList() {
      await this.$store.dispatch(GET_TODAY_LIST);
      this.count = 60;
    },
    async tick() {
      this.count--;
      if (this.count === 0) {
        await this.getTodayList();
      }
      this.interval = setTimeout(this.tick, 1000);
    }
  },
  mounted() {
    this.getTodayList();
    this.tick();
  },
  beforeDestroy() {
    clearTimeout(this.interval);
  }
};
</script>

<style lang="stylus">
.el-dropdown-menu__item.sys-menu-active, .el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus {
  color: $TME-100-second-color;
}

.sys-menu-icon {
  display: inline-block;
  width: 14px;
  text-align: center;
}
</style>
