<template>
  <div id="MemberDetail">
    <PageTitle title="修改會員資訊"></PageTitle>
    <el-form label-position="top">
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="帳號(手機號碼)">
            <el-input :value="`${form.account} (${form.phone})`" disabled></el-input>
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
          <!-- <el-form-item label="手機號碼">
            <el-input v-model="form.phone" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="Line ID">
            <el-input v-model="form.lineID"></el-input>
            <Validation name="Line ID" :target="$v.form.lineID" :patternMsg="VlineID.msg"></Validation>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密碼">
            <el-input type="password" v-model="form.pw" placeholder="6-20英數字"></el-input>
            <Validation name="密碼" :target="$v.form.pw" :patternMsg="VmemberPw.msg"></Validation>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密碼確認">
            <el-input type="password" v-model="form.pw_confirm" placeholder="6-20英數字"></el-input>
            <Validation name="密碼確認" :target="$v.form.pw_confirm"></Validation>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item>
            <slot name="label">
              佔成設定 
              <small v-if="member.percentAllowModify" class="text-danger">＊設定值下週才會生效</small>
            </slot>
            <el-input v-if="member.percentAllowModify" v-model.trim="form.percent" @blur="$v.form.percent.$touch()">
              <template slot="append">{{member.currentWeekPercent}}</template>
            </el-input>
            <el-input v-else :value="member.currentWeekPercent" disabled></el-input>
            <Validation name="佔成" :target="$v.form.percent" :patternMsg="Vpercent.msg"></Validation>
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
            <el-input :value="$root.toCurrencyDecimal(form.point)" disabled></el-input>
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
              <el-checkbox class="mb-0" v-model="form.isLevelActive" :disabled="!member.allowSettingLevel">啟用</el-checkbox>
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
                    <el-option v-for="opt,i in startWeekOpts" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="結束日期">
                  <el-select v-model="form.commisionEndAt" style="width: 100%" :disabled="!form.isLevelActive">
                    <el-option v-for="opt,i in endWeekOpts" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :offset="8" :span="16">
                <div class="el-form-item__error my">
                  <label v-if="$v.form.commisionEndAt.date === false && $v.form.commisionEndAt.$dirty === true" class="validation-error-label">
                    <i class="el-icon-error"></i> 結束時間必需晚於開始時間
                  </label>
                </div>
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
  GET_COMMISSION_LEVEL_WEEKS_OPTIONS,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';
import PointModifyDialog from '@/vendor/FPKG-130000-Member/component/MemberManage/PointModifyDialog.vue';
import { memberLevel } from '@/vendor/FPKG-10000-Config/enum';
import { required, sameAs } from 'vuelidate/lib/validators'
import { VmemberPw, VlineID, Vpercent } from '@/vendor/FPKG-120000-Util/customValidate'

export default {
  mixins: [commonTool],
  components: {
    PointModifyDialog
  },
  data() {
    let weeks = this.getWeeksOfMonths(6)
    return {
      VmemberPw,
      VlineID,
      Vpercent,
      initSetting: null,
      form: {
        id: this.$route.params.id,
        account: "",
        status: "",
        phone: "",
        lineID: "",
        pw: "",
        pw_confirm: "",
        memberDepositLimit: 5000,
        point: 0,
        memo: "",
        isLevelActive: false,
        startLevel: 1,
        commisionStartAt: "",
        commisionEndAt: "",
        percent: 0,
      },
      memberLevelOpts: memberLevel,
      weekOpts: this.getWeeksOfMonths(6).map(w => ({...w, id: `${w.year}-${w.weekNum}`}))
    }
  },
  validations() {
    return {
      form: {
        pw: {
          required,
          pattern: VmemberPw.test,
        },
        pw_confirm: {
          required,
          sameAs: sameAs('pw')
        },
        percent: {
          required: !!(this.member && this.member.percentAllowModify),
          pattern: Vpercent.test
        },
        lineID: {
          pattern: VlineID.test
        },
        commisionEndAt: {
          date: (value, form) => {
            if(form.commisionStartAt.replace('-', '') > value.replace('-', '')) {
              return false
            }
            return true
          }
        }
      },
      basicGroup: ['form.lineID'],
      pwValidGroup: ['form.pw', 'form.pw_confirm'],
      commisionDateValidGroup: ['form.commisionEndAt'],
    }
  },
  computed: {
    ...mapState({
      levelOpts: state => state.Global.commissionLevelOpts,
      statusOpts: state => state.Global.memberStatusOpts,
      startWeekOpts: state => state.Global.commissionLevelStartWeeksOpts,
      endWeekOpts: state => state.Global.commissionLevelEndWeeksOpts,
      memberDepositLimitOpts: state => state.Global.memberDepositLimitOpts,
      member: state => state.Member.MemberManage.member,
      pointModify: state => state.Member.MemberManage.pointModify,
    }),
    breadcrumbPath() {
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "會員資訊"},
        {name: "MemberManage", title: "會員管理"},
        {name: "MemberDetail", title: this.$route.params.acc},
      ]
    },
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
      if(this.form.pw || this.form.pw_confirm) { // 若密碼或確認密碼有填的話則驗證
        this.$v.pwValidGroup.$touch()
        if(this.$v.pwValidGroup.$invalid) {
          return
        }
      }
      if(this.form.isLevelActive) { // 若有啟用會員等級
        this.$v.commisionDateValidGroup.$touch()
        if(this.$v.commisionDateValidGroup.$invalid) {
          return
        }
      }
      if(this.form.percentAllowModify) { // 若可編輯佔成
        this.$v.form.percent.$touch()
        if(this.$v.form.percent.$invalid) {
          return
        }
      }
      this.$v.basicGroup.$touch()
      if(this.$v.basicGroup.$invalid) {
        return
      }
      this.$store.dispatch(EDIT_MEMBER, this.form)
    },
    onPointModifyChanged() {
      this.form.point = this.$numeral(this.member.point).value() + this.$numeral(this.pointModify.add.point).value() - this.$numeral(this.pointModify.subtract.point).value()
    },
    async getMemberDetail() {
      await this.$store.dispatch(GET_MEMBER, this.$route.params.id)
      this.form = Object.assign({}, this.form, this.member)
      this.initSetting = this.$lodash.cloneDeep(this.form)
    }
  },
  async mounted() {
    this.$hub.$on("Member:pointModifyChanged", this.onPointModifyChanged)
    this.$hub.$on("Member:updateMemberDetail", this.getMemberDetail)
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.commit(CLEAR_MEMBER_POINT_MODIFY)
    this.$store.dispatch(GET_MEMBER_DEPOSIT_LIMIT_OPTIONS)
    this.$store.dispatch(GET_MEMBER_STATUS_OPTIONS)
    this.$store.dispatch(GET_COMMISSION_LEVEL_WEEKS_OPTIONS)
    this.getMemberDetail()
  },
  beforeRouteLeave(to, from, next) {
    if (!this.$lodash.isEqual(this.initSetting, this.form) && !this.isSaved) {
      this.$confirm('你確定放棄所有設定之變更嗎?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => {
      });
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus">
#MemberDetail {
  .pointBtns {
    margin-top: 33px;
    margin-left: -27px;

    button {
      padding: 9px 10px;
    }
  }
}
</style>
