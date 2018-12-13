<template>
  <div id="PlatformGame">
    <PageTitle title="遊戲狀態設定"></PageTitle>
    <div>
      <!-- <h5>＊遊戲狀態設定：</h5> -->
      <el-form :inline="true" :model="gameForm" ref="gameForm">
        <table class="table">
          <thead>
            <tr>
              <th width="180">遊戲名稱</th>
              <th>狀態設定</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g,i in gameForm.list" :key="g.id">
              <th>{{g.name}}</th>
              <td>
                <el-radio-group v-model="g.active">
                  <el-radio :label="1">開啟</el-radio>
                  <el-radio :label="2">維護 / 開啟時間：
                    <!-- <el-date-picker type="datetime" v-model="g.open_at"></el-date-picker> -->
                    <el-form-item
                      style="margin-bottom: 0; vertical-align: middle"
                      :prop="'list.' + i + '.open_at'"
                      :rules="{ validator: openTimeValidator, trigger: 'blur' }">
                        <el-date-picker type="datetime" v-model="g.open_at"></el-date-picker>
                    </el-form-item>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      
      <SubmitBar>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">確定</el-button>
      </SubmitBar>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_GAME_MAINTENANCE_LIST, SET_GAME_MAINTENANCE_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import moment, { toDate, toDateTime, startAtDay, endAtDay, dateAfter, dateBefore, getRangeLastDate } from '@/vendor/FPKG-120000-Util/time.js'
import { mapState } from 'vuex';
import { openTimeValidator } from '@/vendor/FPKG-120000-Util/customValidate'

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "平台管理"},
        {name: null, title: "遊戲管理"},
      ],
      gameForm: {
        list: []
      },
    }
  },
  computed: {
    ...mapState({
      gameMaintenanceList: state => state.Platform.PlatformGame.gameMaintenanceList
    }),
  },
  methods: {
    openTimeValidator,
    async onSubmit() {
      this.$refs.gameForm.validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch(SET_GAME_MAINTENANCE_LIST, this.gameForm.list)
          await this.$store.dispatch(GET_GAME_MAINTENANCE_LIST)
          this.setFormList()
        } else {
          return false;
        }
      });
      
    },
    onCancel() {
      if(!this.$lodash.isEqual(this.gameForm.list, this.gameMaintenanceList)) {
        this.$confirm('你確定放棄所有設定之變更嗎?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setFormList()
        }).catch(() => {
        });
      }
      
    },
    setFormList() {
      this.$refs.gameForm.clearValidate()
      this.gameForm.list = this.$lodash.cloneDeep(this.gameMaintenanceList)
    }
  },
  async created() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    await this.$store.dispatch(GET_GAME_MAINTENANCE_LIST)
    this.setFormList()
  },
  beforeRouteLeave(to, from, next) {
    if(!this.$lodash.isEqual(this.gameForm.list, this.gameMaintenanceList)) {
        this.$confirm('你確定放棄所有設定之變更嗎?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          next()
        }).catch(() => {
        });
      }
  }
}
</script>

<style lang="stylus">
</style>
