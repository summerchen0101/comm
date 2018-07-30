<template>
  <div id="Marquee">
    <PageTitle title="跑馬燈管理">
      <el-button slot="btns" type="primary" @click="SWITCH_MARQUEE_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>

    <!-- 跑馬燈列表 -->
    <el-table
      :data="marqueeList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="標題">
      </el-table-column>
      <el-table-column
        width="180px"
        prop="startAt"
        label="開始時間">
      </el-table-column>
      <el-table-column
        width="180px"
        prop="endAt"
        label="結束時間">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="onGetItem(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDelItem(scope.row.id)">刪除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="歷程"
        width="80">
        <template slot-scope="scope">
          <el-button size="mini">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="marqueePager"
              :on-page-changed="onPageChanged"
              :count="marqueePager.count"
              :perpage="marqueePager.perpage"></Paginator>


    <!-- 新增跑馬燈 -->
    <MarqueeFormDialog ref="MarqueeFormDialog"></MarqueeFormDialog>

  </div>
</template>

<script>
import MarqueeFormDialog from '@/vendor/FPKG-140000-Announce/component/MarqueeFormDialog.vue';
import { 
  GET_MARQUEE_LIST, 
  SWITCH_MARQUEE_DIALOG,
  DEL_MARQUEE,
  SET_BREADCRUMB,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    MarqueeFormDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "公告管理"},
        {link: null, title: "跑馬燈管理"},
      ]
    }
  },
  computed: {
    ...mapState({
      marqueeList: state => state.Announce.Marquee.marqueeList,
      marqueePager: state => state.Announce.Marquee.marqueePager,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_MARQUEE_DIALOG
    ]),
    onGetItem(item) {
      this.SWITCH_MARQUEE_DIALOG(true)
      let formData = Object.assign({},
      this.$refs.MarqueeFormDialog.form,
      item
      )
      this.$hub.$emit("Announce:marqueeFormUpdate", formData)
    },
    async onDelItem(id) {
      this.$confirm('確定刪除後將無法復原', '你確定嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DEL_MARQUEE, id)
      }).catch(() => {        
      });
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_MARQUEE_LIST, {page})
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_MARQUEE_LIST)
  },
}
</script>

<style lang="stylus">
</style>
