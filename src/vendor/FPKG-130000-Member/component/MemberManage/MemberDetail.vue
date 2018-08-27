<template>
  <div id="MemberDetail">
    <PageTitle title="修改會員資訊"></PageTitle>
    <el-form label-position="top">
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="帳號">
            <el-input v-model="form.account" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="暱稱">
            <el-input v-model="form.nick"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="狀態">
            <el-select v-model="form.status" style="width: 100%">
              <el-option v-for="opt in statusOpts.filter(t => t.id !== 0)" :label="opt.name" :value="opt.id" :key="opt.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="手機號碼">
            <el-input v-model="form.phone" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密碼">
            <el-input v-model="form.pw"></el-input>
            <Validation name="密碼" :target="$v.form.pw" :patternMsg="VmemberPw.msg"></Validation>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密碼確認">
            <el-input v-model="form.pw_confirm"></el-input>
            <Validation name="密碼確認" :target="$v.form.pw_confirm"></Validation>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="Line ID">
            <el-input v-model="form.lineID" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="會員存款條件">
            <el-select v-model="form.memberDepositLimit" style="width: 100%">
              <el-option v-for="opt in memberDepositLimitOpts" :label="opt.name" :value="opt.id" :key="opt.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="錢包點數">
            <el-input :value="toCurrencyDecimal(form.point)" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="pointBtns">
          <el-button type="info" @click="onClickPointModify('add')">撥點</el-button>
          <el-button type="info" @click="onClickPointModify('subtract')">扣點</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="16">
          <el-form-item>
            <div slot="label">
              <el-checkbox class="mb-0" v-model="form.isLevelActive">啟用</el-checkbox>
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="會員起始級別">
                  <el-select v-model="form.startLevel" style="width: 100%" :disabled="!form.isLevelActive">
                    <el-option v-for="opt in memberLevelOpts" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="開始日期">
                  <el-select v-model="form.commisionStartAt" style="width: 100%" :disabled="!form.isLevelActive">
                    <el-option v-for="opt,i in weekOpts" :label="`${opt.start}-${opt.end}`" :value="opt.id" :key="opt.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="結束日期">
                  <el-select v-model="form.commisionEndAt" style="width: 100%" :disabled="!form.isLevelActive">
                    <el-option v-for="opt,i in weekOpts" :label="`${opt.start}-${opt.end}`" :value="opt.id" :key="opt.id"></el-option>
                  </el-select>
                </el-form-item>

              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="備註">
            <el-input type="textarea" v-model="form.memo" :rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="銀行帳戶資訊">
        <el-table
          :data="member.bankAccList"
          stripe
          style="width: 100%">
          <el-table-column
            width="150"
            prop="bankName"
            label="銀行代碼">
          </el-table-column>
          <el-table-column
            width="150"
            prop="branchName"
            label="分行名稱">
          </el-table-column>
          <el-table-column
            width="120"
            prop="accountName"
            label="戶名">
          </el-table-column>
          <el-table-column
            width="180"
            prop="bankAccount"
            label="銀行帳號">
          </el-table-column>
          <el-table-column
            width="180"
            prop="createdAt"
            label="申請時間">
          </el-table-column>
          <el-table-column
            label="狀態">
            <template slot-scope="scope">
              {{toEnum('bankAccStatus', scope.row.status)}}
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <SubmitBar>
      <el-button @click="$router.push({name: 'MemberManage'})">取消</el-button>
      <el-button type="primary" @click="onSubmit">確定</el-button>
    </SubmitBar>

    <!-- Popup -->
    <PointModifyDialog></PointModifyDialog>
  </div>
</template>

<script>
import { 
  SET_BREADCRUMB,
  GET_MEMBER,
  GET_MEMBER_DEPOSIT_LIMIT_OPTIONS,
  GET_MEMBER_STATUS_OPTIONS,
  SWITCH_POINT_DIALOG,
  EDIT_MEMBER,
  CLEAR_MEMBER_POINT_MODIFY,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';
import PointModifyDialog from '@/vendor/FPKG-130000-Member/component/MemberManage/PointModifyDialog.vue';
import { memberLevel } from '@/vendor/FPKG-10000-Config/enum';
import { required, sameAs } from 'vuelidate/lib/validators'
import { VmemberPw } from '@/vendor/FPKG-120000-Util/customValidate'

export default {
  mixins: [commonTool],
  components: {
    PointModifyDialog
  },
  data() {
    let weeks = this.getWeeksOfMonths(6)
    return {
      VmemberPw,
      form: {
        id: this.$route.params.id,
        account: "",
        status: "",
        phone: "",
        lineID: "",
        pw: "",
        pw_confirm: "",
        memberDepositLimit: 5000,
        memo: "",
        isLevelActive: false,
        startLevel: 1,
        commisionStartAt: "",
        commisionEndAt: "",
      },
      memberLevelOpts: memberLevel,
      weekOpts: this.getWeeksOfMonths(6).map(w => ({...w, id: `${w.year}-${w.weekNum}`}))
    }
  },
  validations: {
    form: {
      pw: { 
        required,
        pattern: VmemberPw.test,
      },
      pw_confirm: { 
        required, 
        sameAs: sameAs('pw')
      },
    }
  },
  computed: {
    ...mapState({
      statusOpts: state => state.Global.memberStatusOpts,
      memberDepositLimitOpts: state => state.Global.memberDepositLimitOpts,
      member: state => state.Member.MemberManage.member,
      pointModify: state => state.Member.MemberManage.pointModify
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
      SWITCH_POINT_DIALOG
    }),
    onClickPointModify(action) {
      this.$router.push({...this.$route, query: {action}})
      this.$store.commit(SWITCH_POINT_DIALOG, true)
    },
    onSubmit() {
      if(this.form.pw) { // 若密碼有填的話則驗證
        this.$v.form.$touch()
        if(this.$v.form.$invalid) {
          return
        }
      }
      
      this.$store.dispatch(EDIT_MEMBER, this.form)
    },
    onPointModifyChanged() {
      this.form.point = this.$numeral(this.member.point).value() + this.$numeral(this.pointModify.add.point).value() - this.$numeral(this.pointModify.subtract.point).value()
    }
  },
  async mounted() {
    this.$hub.$on("Member:pointModifyChanged", this.onPointModifyChanged)
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.commit(CLEAR_MEMBER_POINT_MODIFY)
    this.$store.dispatch(GET_MEMBER_DEPOSIT_LIMIT_OPTIONS)
    this.$store.dispatch(GET_MEMBER_STATUS_OPTIONS)
    await this.$store.dispatch(GET_MEMBER, this.$route.params.id)
    this.form = Object.assign({}, this.form, this.member)
  }
}
</script>

<style lang="stylus">
#MemberDetail 
  .pointBtns
    margin-top: 33px
    margin-left: -27px
    button
      padding: 9px 10px
</style>
