<template>
  <div id="MemberDetail">
    會員資訊
  </div>
</template>

<script>
import { 
  SET_BREADCRUMB,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
    }
  },
  
  computed: {
    ...mapState({
      statusOpts: state => state.Global.statusOpts,
    }),
    breadcrumbPath() {
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "會員資訊"},
        {name: "MemberManage", title: "會員管理"},
        {name: "MemberDetail", title: this.$route.params.acc},
      ]
    }
  },
  methods: {
    ...mapMutations({
    }),
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  }
}
</script>

<style lang="stylus">
</style>
