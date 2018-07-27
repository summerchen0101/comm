<template>
  <div id="Marquee">
    <MenuComponent></MenuComponent>
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb :path="breadcrumbPath"></Breadcrumb>
      <div class="main-container">
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
            width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="onGetItem(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="onDelItem(scope.row.id)">刪除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="歷程"
            width="200">
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
    </div>

  </div>
</template>

<script>
import Menu from '@/vendor/FPKG-70000-Dashboard/component/Menu.vue';
import MobileMenu from '@/vendor/FPKG-70000-Dashboard/component/MobileMenu.vue';
import Validation from '@/vendor/FPKG-110000-Widget/component/Validation.vue';
import PageTitle from '@/vendor/FPKG-110000-Widget/component/PageTitle.vue';
import Paginator from '@/vendor/FPKG-110000-Widget/component/Paginator.vue';
import MarqueeFormDialog from '@/vendor/FPKG-140000-Announce/component/MarqueeFormDialog.vue';
import { 
  GET_MARQUEE_LIST, 
  SWITCH_MARQUEE_DIALOG,
  DEL_MARQUEE,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    MenuComponent: Menu,
    MobileMenu,
    PageTitle,
    MarqueeFormDialog,
    Paginator,
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "跑馬燈管理"},
      ]
    }
  },
  computed: {
    ...mapState({
      marqueeList: state => state.Announce.marqueeList,
      marqueePager: state => state.Announce.marqueePager,
      dialogVisible: state => state.Announce.dialogVisible,
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
      await this.$store.dispatch(DEL_MARQUEE, id)
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_MARQUEE_LIST, {page})
    }
  },
  mounted() {
    this.$store.dispatch(GET_MARQUEE_LIST)
  },
}
</script>

<style lang="stylus">
</style>
