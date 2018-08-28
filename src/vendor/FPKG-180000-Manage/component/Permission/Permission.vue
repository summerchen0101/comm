<template>
  <div id="Permission">
    <PageTitle title="權限群組">
      <el-button slot="btns" type="primary" @click="onClickAdd">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>

    <!-- 權限群組列表 -->
    <el-table
      :data="perGroupList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="權限">
      </el-table-column>
      <el-table-column
        width="80"
        prop="count"
        label="人數">
      </el-table-column>
      <el-table-column
        width="180"
        label="建立時間">
        <template slot-scope="scope">
          {{toDateTime(scope.row.createdAt)}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="onClickEdit(scope.row)" :disabled="!scope.row.allowModify">修改</el-button>
          <el-button size="mini" type="danger" @click="onClickDel(scope.row.id)" :disabled="!scope.row.allowModify">刪除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="歷程"
        width="80">
        <template slot-scope="scope">
          <el-button size="mini" :class="{'history-active': scope.row.operation}" @click="onCheckHistory(scope.row.id)" :disabled="scope.row.id == 1">
            <font-awesome-icon icon="file-alt" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="perGroupPager"
              :on-page-changed="onPageChanged"
              :count="perGroupPager.count"
              :perpage="perGroupPager.perpage"></Paginator>
    <HistoryDialog ></HistoryDialog>
  </div>
</template>

<script>
import { 
  SET_BREADCRUMB,
  GET_PERMISSION_GROUP_LIST,
  DEL_PERMISSION_GROUP,
  GET_HISTORY,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "後台管理"},
        {name: null, title: "權限管理"},
      ]
    }
  },
  computed: {
    ...mapState({
      perGroupList: state => state.Manage.Permission.perGroupList,
      perGroupPager: state => state.Manage.Permission.perGroupPager,
    }),
  },
  methods: {
    onClickAdd() {
      this.$router.push({name: 'CreatePermission'})
    },
    onClickEdit(item) {
      this.$router.push({name: 'ModifyPermission', params: {id: item.id}})
    },
    onClickDel(id) {
      this.$confirm('確定刪除後將無法復原', '你確定嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DEL_PERMISSION_GROUP, id)
      }).catch(() => {        
      });
    },
    onPageChanged(page) {
      this.$store.dispatch(GET_PERMISSION_GROUP_LIST, { page })
    },
    onCheckHistory(id) {
      this.$store.dispatch(GET_HISTORY, {
          funcKey: this.$attrs.funcKey, 
          id,
          title: "權限修改歷程"
        })
    },
  },

  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_PERMISSION_GROUP_LIST)
  }
}
</script>

<style lang="stylus">
</style>
