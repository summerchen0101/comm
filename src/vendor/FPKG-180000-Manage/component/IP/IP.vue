<template>
  <div id="IP">
    <PageTitle>
      <el-button slot="btns" type="primary" @click="SWITCH_IP_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>

    <!-- IP列表 -->
    <el-table
      :data="ipList"
      stripe
      style="width: 100%">
      <el-table-column
        width="180"
        prop="ip"
        label="IP">
      </el-table-column>
      <el-table-column
        width="200"
        prop="desc"
        label="描述">
      </el-table-column>
      <el-table-column
        width="80"
        prop="count"
        label="人數">
      </el-table-column>
      <el-table-column
        width="180"
        prop="createdAt"
        label="建立時間">
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
          <el-button size="mini" :class="{'history-active': scope.row.operation}" @click="onCheckHistory(scope.row.id)">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="ipPager"
              :on-page-changed="onPageChanged"
              :count="ipPager.count"
              :perpage="ipPager.perpage"></Paginator>


    <!-- 新增IP -->
    <IPFormDialog ref="IPFormDialog"></IPFormDialog>
    <HistoryDialog ref="HistoryDialog"></HistoryDialog>
  </div>
</template>

<script>
import IPFormDialog from '@/vendor/FPKG-180000-Manage/component/IP/IPFormDialog.vue';
import HistoryDialog from '@/vendor/FPKG-110000-Widget/component/HistoryDialog.vue';
import { 
  GET_IP_LIST, 
  GET_PERMISSION_GROUP_OPTIONS, 
  SWITCH_IP_DIALOG,
  DEL_IP,
  SET_BREADCRUMB,
  GET_HISTORY,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { status } from '@/vendor/FPKG-10000-Config/enum'

export default {
  components: {
    IPFormDialog,
    HistoryDialog,
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "後台管理"},
        {name: null, title: "IP管理"},
      ],
      statusOpts: status.concat({label: '全部', value: ''})
    }
  },
  computed: {
    ...mapState({
      ipList: state => state.Manage.IP.ipList,
      ipPager: state => state.Manage.IP.ipPager,
    }),
  },
  methods: {
    ...mapMutations([
      SWITCH_IP_DIALOG
    ]),
    onCheckHistory(id) {
      this.$store.dispatch(GET_HISTORY, {
          funcKey: this.$attrs.funcKey, 
          id,
          title: "IP修改歷程"
        })
    },
    onGetItem(item) {
      this.SWITCH_IP_DIALOG(true)
      let formData = Object.assign({},
      this.$refs.IPFormDialog.form,
      item
      )
      this.$hub.$emit("Manage:ipFormUpdate", formData)
    },
    async onDelItem(id) {
      this.$confirm('確定刪除後將無法復原', '你確定嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DEL_IP, id)
      }).catch(() => {        
      });
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_IP_LIST, {page})
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_IP_LIST)
  },
}
</script>

<style lang="stylus">
</style>
