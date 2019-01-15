<template>
  <div id="MemberGame">
    <PageTitle title="修改遊戲設定"></PageTitle>
    <el-form v-if="form" label-position="top">
      <template v-for="g in gameSetting">
        <!-- 真人 -->
        <el-row v-if="g.gameType == 8" :gutter="30" :key="g.id" class="gameGroup">
          <el-col :span="24">
            <h4>{{g.name}}</h4>
          </el-col>
          <el-col :span="8">
            <el-form-item label="狀態">
              <!-- 僅開放「啟用」、「停用」 -->
              <el-select v-model="form[g.gameType].status" style="width: 100%" :disabled="!g.allowSetting">
                <el-option v-for="opt in statusOpts.filter(t => [1, 2].indexOf(t.id) > -1)" :label="opt.name" :value="opt.id" :key="opt.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" v-if="gameTplOpts[g.gameType] && gameTplOpts[g.gameType].roulette">
            <el-form-item>
              <slot name="label">
                SA真人視訊範本設定-輪盤
                <span class="text-danger"> ＊輪盤目前無法更改設定</span>
              </slot>
              <el-checkbox-group v-model="form[g.gameType].template_roulette.model" :disabled="!g.allowSetting || form[g.gameType].template_roulette.model_lock === 'disable'">
                <el-checkbox v-for="opt in gameTplOpts[g.gameType].roulette" :label="opt.id" :key="opt.id">{{opt.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="gameTplOpts[g.gameType] && gameTplOpts[g.gameType].all">
            <el-form-item>
              <slot name="label">
                SA真人視訊範本設定-全部（不含輪盤）
              </slot>
              <el-checkbox-group v-model="form[g.gameType].template_all.model" :disabled="!g.allowSetting || form[g.gameType].template_all.model_lock === 'disable'">
                <el-checkbox v-for="opt in gameTplOpts[g.gameType].all" :label="opt.id" :key="opt.id">{{opt.name}}</el-checkbox>
              </el-checkbox-group>
              
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else :gutter="30" :key="g.id" class="gameGroup">
          <el-col :span="24">
            <h4>{{g.name}}</h4>
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
              <span>{{g.name}}範本設定</span>
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
                  <el-input v-model="form[g.gameType].maxWin" :disabled="!g.allowSetting">
                    <template slot="append">{{$root.toCurrencyDecimal(form[g.gameType].result)}}</template>
                  </el-input>
                  <Validation name="最大贏額" :target="$v.form[g.gameType].maxWin" :patternMsg="VmaxWin.msg"></Validation>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="margin-top: 34px">
                <el-button :type="form[g.gameType].clear ? 'danger' : 'info'" @click="onReset($event, g.gameType)" :disabled="!g.allowSetting">重置<i v-if="form[g.gameType].clear" class="el-icon-circle-check el-icon--right"></i></el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" v-if="form[g.gameType].hasMinBet">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-form-item>
                  <span slot="label">最低下注額</span>
                  <span slot="label" class="text-danger"> ＊運彩最低下注額需≥100</span>
                  <el-input v-model="form[g.gameType].minBet" :disabled="!g.allowSetting"></el-input>
                  <Validation name="最低下注額" :target="$v.form[g.gameType].minBet" :patternMsg="VminBet.msg"></Validation>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
      
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
  GET_MEMBER_GAME_STATUS_OPTIONS,
  GET_GAME_TYPE_OPTIONS,
  GET_MEMBER_GAME_SETTING,
  GET_GAME_TEMPLATE_OPTIONS,
  EDIT_MEMBER_GAME_SETTING,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool';
import { required } from 'vuelidate/lib/validators'
import { VmaxWin, VminBet } from '@/vendor/FPKG-120000-Util/customValidate'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      initSetting: null,
      form: null,
      isSaved: false,
      VmaxWin,
      VminBet
    }
  },
  validations() {
    var form = {}
    this.gameSetting.forEach(g => {
      form[g.gameType] = {}
      if(g.hasMaxWin) {
        form[g.gameType].maxWin = {
          required,
          pattern: VmaxWin.test
        }
      }
      if(g.hasMinBet) {
        form[g.gameType].minBet = {
          required,
          pattern: VminBet.test
        }
      }
    })
    return {
      form
    }
  },
  computed: {
    ...mapState({
      statusOpts: state => state.Global.memberGameStatusOpts,
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
    async loadTemplates(index) {
      await this.$store.dispatch(GET_GAME_TEMPLATE_OPTIONS, this.gameSetting[index].gameType)
      if(this.gameSetting.length > index+1) {
        await this.loadTemplates(index+1)
      }
    },
    createGameForm() {
      this.form = this.gameSetting.reduce((obj, next) => {
        obj[next.gameType] = {
          ...next,
          clear: false // 重置按鈕
        }
        return obj
      }, {})
      this.initSetting = this.$lodash.cloneDeep(this.form)
    },
    onSubmit() {
      this.$v.form.$touch()
      if(this.$v.form.$invalid) {
        return
      }
      this.isSaved = true
      this.$store.dispatch(EDIT_MEMBER_GAME_SETTING, {
        id: this.$route.params.id,
        setting: this.$lodash.map(this.form)
      })
    },
    onReset(e, gameType) {
      this.form[gameType].result = 0
      this.form[gameType].clear = true
      e.currentTarget.blur()
    }
  },
  async mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_MEMBER_GAME_STATUS_OPTIONS)
    await this.$store.dispatch(GET_MEMBER_GAME_SETTING, this.$route.params.id)
    this.createGameForm()
    if(this.gameSetting.length > 0) {
      await this.loadTemplates(0)
      this.$forceUpdate()
    }
  },
  beforeRouteLeave(to, from, next) {
    if(!this.$lodash.isEqual(this.initSetting, this.form) && !this.isSaved) {
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
