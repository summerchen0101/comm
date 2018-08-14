<template>
  <div id="MemberGame">
    <PageTitle title="修改遊戲設定"></PageTitle>
    <el-form v-if="form" label-position="top">
      <el-row :gutter="30" v-for="g in gameSetting" :key="g.id" class="gameGroup">
        <el-col :span="24">
          <h4>{{toOption(gameTypeOpts, g.gameType)}}</h4>
        </el-col>
        <el-col :span="8">
          <el-form-item label="狀態">
            <el-select v-model="form[g.gameType].status" style="width: 100%" :disabled="!g.allowSetting">
              <el-option v-for="opt in statusOpts.filter(t => t.id !== 0)" :label="opt.name" :value="opt.id" :key="opt.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form[g.gameType].template">
          <el-form-item>
            <a slot="label" href="">{{toOption(gameTypeOpts, g.gameType)}}範本設定</a>
            <el-select v-model="form[g.gameType].template" style="width: 100%" :disabled="!g.allowSetting">
              <el-option v-for="opt in gameTplOpts[g.gameType]" :label="opt.name" :value="opt.name" :key="opt.name"></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8" v-if="form[g.gameType].hasMaxWin">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-form-item>
                <span slot="label">最大贏額</span>
                <span slot="label" class="text-danger"> ＊設置0為無限制</span>
                <el-input v-model.number="form[g.gameType].maxWin" :disabled="!g.allowSetting">
                <template slot="append">{{toCurrencyDecimal(form[g.gameType].result)}}</template>
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="margin-top: 34px">
              <el-button type="info" @click="onReset(g.gameType)" :disabled="!g.allowSetting">重置</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <SubmitBar>
      <el-button @click="$router.push({name: 'MemberManage'})">取消</el-button>
      <el-button type="primary" @click="onSubmit" :disabled="gameSetting.findIndex(g => g.allowSetting) === -1">確定</el-button>
    </SubmitBar>

  </div>
</template>

<script>
import { 
  SET_BREADCRUMB,
  GET_MEMBER_STATUS_OPTIONS,
  GET_GAME_TYPE_OPTIONS,
  GET_MEMBER_GAME_SETTING,
  GET_GAME_TEMPLATE_OPTIONS,
  EDIT_MEMBER_GAME_SETTING,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      initSetting: null,
      form: null,
    }
  },
  computed: {
    ...mapState({
      statusOpts: state => state.Global.memberStatusOpts,
      gameTypeOpts: state => state.Global.gameTypeOpts,
      gameTplOpts: state => state.Global.gameTplOpts,
      member: state => state.Member.MemberManage.member,
      gameSetting: state => state.Member.MemberManage.gameSetting,
    }),
    breadcrumbPath() {
      return [
        {name: "Home", title: "首頁"},
        {name: null, title: "會員資訊"},
        {name: "MemberManage", title: "會員管理"},
        {name: "MemberGame", title: this.$route.params.acc},
      ]
    }
  },
  methods: {
    ...mapMutations({
    }),
    createGameForm() {
      this.form = this.gameSetting.reduce((obj, next) => {
        obj[next.gameType] = next
        this.$store.dispatch(GET_GAME_TEMPLATE_OPTIONS, next.gameType)
        return obj
      }, {})
      this.initSetting = this.$lodash.cloneDeep(this.form)
    },
    onSubmit() {
      this.$store.dispatch(EDIT_MEMBER_GAME_SETTING, {
        id: this.$route.params.id,
        setting: this.$lodash.map(this.form)
      })
    },
    onReset() {

    }
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_MEMBER_STATUS_OPTIONS)
    await this.$store.dispatch(GET_GAME_TYPE_OPTIONS)
    await this.$store.dispatch(GET_MEMBER_GAME_SETTING, this.$route.params.id)
    this.createGameForm()
  },
  beforeRouteLeave(to, from, next) {
    if(!this.$lodash.isEqual(this.initSetting, this.form)) {
      this.$confirm('你確定放棄所有設定之變更嗎?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => {
                
      });
    }else {
      next()
    }
    
  }
}
</script>

<style lang="stylus">
#MemberGame
  .gameGroup
    padding: 15px 0
    // margin-bottom: 10px
    border-top: 1px solid #eee
    border-bottom: 1px solid #eee
    margin-top: -1px
    h4 
      font-size: 18px
      margin-bottom: 0
</style>
