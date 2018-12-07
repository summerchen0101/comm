<template>
  <div id="PlatformGame">
    遊戲管理
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_MEMBER_REPORT } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { toDate, toDateTime, startAtDay, endAtDay, dateAfter, dateBefore, getRangeLastDate } from '@/vendor/FPKG-120000-Util/time.js'
import { mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "平台管理"},
        {name: null, title: "遊戲管理"},
      ],
    }
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
  },
  created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  }
}
</script>

<style lang="stylus">
</style>
