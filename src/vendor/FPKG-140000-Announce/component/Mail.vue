<template>
  <div id="Mail">
    <PageTitle title="站內訊息管理">
      <el-button slot="btns" type="primary" @click="addMail()">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle>
    <el-table v-if="result" :data="result.data" style="width:100%;" stripe>
      <el-table-column label="標題" prop="title"></el-table-column>
      <el-table-column label="新增時間" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ toShortDateTimeNoSecond(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送出時間" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.send_at==='-'">-</span>
          <span v-else>{{ toShortDateTimeNoSecond(scope.row.send_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="sendMail(scope.row.id)" :disabled="scope.row.send_at!=='-'">送出</el-button>
          <el-button size="mini" type="danger" @click="editMail(scope.row.id)" :disabled="scope.row.send_at!=='-'">修改</el-button>
          <el-button size="mini" type="warning" @click="copyMail(scope.row.id)">複製</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Paginator v-if="result" :count="result.total" :perpage="result.perpage" :on-page-changed="changePage"></Paginator>
    <MailFormDialog :title="title" :id="id" :form.sync="form"></MailFormDialog>
  </div>
</template>

<script>
import MailFormDialog from '@/vendor/FPKG-140000-Announce/component/MailFormDialog.vue'
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'
import { mapState } from 'vuex'
import { 
  GET_MAIL_LIST,
  GET_MAIL,
  ADD_MAIL,
  EDIT_MAIL,
  SEND_MAIL,
  SET_MAIL_DIALOG_VISIBLE,
  SET_BREADCRUMB
} from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  mixins: [commonTool],
  components: {
    MailFormDialog,
  },
  data() {
    return {
      title: '',
      id: 0,
      form: {
        send_type: 3,
        target_account: '',
        title: '',
        description: ''
      },
      breadcrumbPath: [
        { name: 'Home', title: '首頁' },
        { name: null, title: '公告管理' },
        { name: null, title: '站內訊息管理' }
      ]
    }
  },
  computed: {
    ...mapState({
      result: state => state.Announce.Mail.result
    }),
  },
  methods: {
    setFormData(data) {
      this.form.send_type = data.send_type
      this.form.target_account = data.target_account
      this.form.title = data.title
      this.form.description = data.description
    },
    showDialog() {
      this.$store.commit(SET_MAIL_DIALOG_VISIBLE, true)
    },
    addMail() {
      this.title = '新增站內訊息'
      this.id = 0
      this.setFormData({ send_type: 3, target_account: '', title: '', description: '' })
      this.showDialog()
    },
    async sendMail(id) {
      await this.$store.dispatch(SEND_MAIL, id)
      await this.$store.dispatch(GET_MAIL_LIST, result.current_page)
    },
    async editMail(id) {
      const data = await this.$store.dispatch(GET_MAIL, id)
      this.title = '修改站內訊息'
      this.id = id
      this.setFormData(data)
      this.showDialog()
    },
    async copyMail(id) {
      const data = await this.$store.dispatch(GET_MAIL, id)
      this.title = '複製站內訊息'
      this.id = 0
      this.setFormData(data)
      this.showDialog()
    },
    async changePage(page) {
      await this.$store.dispatch(GET_MAIL_LIST, page)
    }
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_MAIL_LIST)
  }
}
</script>
