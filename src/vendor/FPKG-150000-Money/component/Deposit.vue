<template>
  <div id="Deposit">
    <!-- <PageTitle title="存款管理">
      <el-button slot="btns" type="primary" @click="SWITCH_MARQUEE_DIALOG(true)">
        <font-awesome-icon icon="plus" />
      </el-button>
    </PageTitle> -->
    <el-select v-model="searchForm.status">
      <el-option
        v-for="opt in statusList"
        :key="opt.id"
        :label="opt.name"
        :value="opt.id">
      </el-option>
    </el-select>
    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="編號">
          <el-input v-model="searchForm.number" placeholder="搜尋訂單編號"></el-input>
        </el-form-item>
        <el-form-item label="會員">
          <el-input v-model="searchForm.account" placeholder="搜尋帳號"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <div class="CountBox">
      <div class="total">總點數：{{depositInfo.total}}</div>
      <div class="count">總筆數：{{depositInfo.count}}</div>
    </div>


  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_DEPOSIT_STATUS_LIST, GET_DEPOSIT_INFO } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
// import {  } from '@/vendor/FPKG-120000-Util/customValidate';

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "存提管理"},
        {link: null, title: "存款管理"},
      ],
      searchForm: {
        status: 1,
        number: "",
        account: "",
      },
      searchFormRules: {
        account: [
          { min: 4, max: 12, message: '至少需4~12碼英數字', trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    ...mapState({
      statusList: state => state.Money.depositStatusList,
      depositInfo: state => state.Money.depositInfo,
    })
  },
  methods: {
    async onSearchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(GET_DEPOSIT_INFO, this.searchForm)
        }
      });
      
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_DEPOSIT_STATUS_LIST)
  }
}
</script>

<style lang="stylus">
.CountBox
  display: flex
  justify-content: flex-end
  > div 
    font-size: 12px
    color: #333
    padding: 5px 10px
    margin: 10px 0
    margin-left: 5px
    &.count 
      background-color: #ddd
    &.total 
      background-color: #eee
</style>
