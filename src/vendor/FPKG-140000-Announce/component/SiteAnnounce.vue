<template>
  <div id="SiteAnnounce">
    <PageTitle title="平台公告管理">
      <el-button slot="btns" type="primary" @click="onAddItem">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>

    <!-- 平台公告列表 -->
    <el-table
      :data="siteAnnounceList"
      stripe
      style="width: 100%">
      <el-table-column
        width="90"
        prop="lockTop">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.lockTop" type="danger">置頂</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="標題">
      </el-table-column>
      <el-table-column
        width="180"
        label="新增時間">
        <template slot-scope="scope">
          <span>{{toShortDateTimeNoSecond(scope.row.createdAt)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="更新時間">
        <template slot-scope="scope">
          <span>{{toShortDateTimeNoSecond(scope.row.updatedAt)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="onEditItem(scope.row)">修改</el-button>
          <el-button size="mini" type="warning" @click="onCopyItem(scope.row)">複製</el-button>
          <el-button size="mini" type="danger" @click="onDelItem(scope.row.id)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="siteAnnouncePager"
              :on-page-changed="onPageChanged"
              :count="siteAnnouncePager.count"
              :perpage="siteAnnouncePager.perpage"></Paginator>


    <!-- 新增平台公告 -->
    <SiteAnnounceFormDialog ref="SiteAnnounceFormDialog"></SiteAnnounceFormDialog>
  </div>
</template>

<script>
import SiteAnnounceFormDialog from '@/vendor/FPKG-140000-Announce/component/SiteAnnounceFormDialog.vue';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js';
import { 
  GET_SITE_ANNOUNCE_LIST, 
  SWITCH_SITE_ANNOUNCE_DIALOG,
  DEL_SITE_ANNOUNCE,
  SET_BREADCRUMB,
  GET_HISTORY,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  mixins: [commonTool],
  components: {
    SiteAnnounceFormDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "公告管理"},
        {name: null, title: "平台公告管理"},
      ]
    }
  },
  computed: {
    ...mapState({
      siteAnnounceList: state => state.Announce.SiteAnnounce.siteAnnounceList,
      siteAnnouncePager: state => state.Announce.SiteAnnounce.siteAnnouncePager,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_SITE_ANNOUNCE_DIALOG
    ]),
    onCheckHistory(id) {
      this.$store.dispatch(GET_HISTORY, {
          funcKey: this.$attrs.funcKey, 
          id,
          title: "平台公告修改歷程"
        })
    },
    onAddItem() {
      this.SWITCH_SITE_ANNOUNCE_DIALOG(true)
      this.$router.push({name: this.$route.name, query: {dia: 1}})
    },
    onEditItem(item) {
      this.SWITCH_SITE_ANNOUNCE_DIALOG(true)
      this.$router.push({name: this.$route.name, query: {dia: 2, id: item.id}})
      let formData = Object.assign({},
      this.$refs.SiteAnnounceFormDialog.form,
      item
      )
      this.$hub.$emit("Announce:siteAnnounceFormUpdate", formData)
    },
    onCopyItem(item) {
      this.SWITCH_SITE_ANNOUNCE_DIALOG(true)
      this.$router.push({name: this.$route.name, query: {dia: 3, id: item.id}})
      let formData = Object.assign({},
      this.$refs.SiteAnnounceFormDialog.form,
      item
      )
      this.$hub.$emit("Announce:siteAnnounceFormUpdate", formData)
    },
    async onDelItem(id) {
      this.$confirm('會員端公告會跟著一起被刪除', '你確定嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DEL_SITE_ANNOUNCE, id)
      }).catch(() => {        
      });
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_SITE_ANNOUNCE_LIST, {page})
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_SITE_ANNOUNCE_LIST)
  },
}
</script>

<style lang="stylus">
</style>
