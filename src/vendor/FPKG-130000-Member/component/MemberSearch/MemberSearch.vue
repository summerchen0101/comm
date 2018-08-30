<template>
  <div id="MemberSearch">
    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm">
        <el-form-item prop="account">
          <el-col :span="6">
            <el-radio v-model="searchForm.type" label="account">會員</el-radio>
          </el-col>
          <el-col :span="18">
            <el-input v-model.trim="searchForm.account" placeholder="搜尋帳號" :disabled="searchForm.type !== 'account'"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="phone">
          <el-col :span="6">
            <el-radio v-model="searchForm.type" label="phone">手機</el-radio>
          </el-col>
          <el-col :span="18">
            <el-input v-model.trim="searchForm.phone" placeholder="搜尋手機號碼" :disabled="searchForm.type !== 'phone'"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <div v-if="$store.state.Member.MemberSearch.isSearched">
      <el-row :gutter="30" v-if="$store.state.Member.MemberSearch.personalInfo">
        <el-col :span="12">
          <!-- 個人資訊 -->
          <PersonalInfo></PersonalInfo>
          <!-- 銀行帳戶資訊 -->
          <BankAccInfo></BankAccInfo>
        </el-col>
        <el-col :span="12">
          <!-- 點數資訊 -->
          <PointInfo></PointInfo>
          <!-- 佣金資訊 -->
          <CommissionInfo></CommissionInfo>
        </el-col>
      </el-row>
      <p v-else class="noData">(暫無資料)</p>
    </div>
    
  </div>
</template>

<script>
import { 
  SET_BREADCRUMB, 
  GET_SINGLE_MEMBER, 
  GET_MEMBER_DEPOSIT_LIMIT_OPTIONS,
  CLEAR_MEMBER_SEARCHED_DATA,
} from '@/vendor/FPKG-40000-VuexStore/constants'
import PersonalInfo from './PersonalInfo'
import PointInfo from './PointInfo'
import CommissionInfo from './CommissionInfo'
import BankAccInfo from './BankAccInfo'

export default {
  components: {
    PersonalInfo,
    PointInfo,
    CommissionInfo,
    BankAccInfo,
  },
  data() {
    return {
      breadcrumbPath: [
        {name: "Home", title: "首頁"},
        {name: null, title: "會員資訊"},
        {name: null, title: "會員搜尋"},
      ],
      searchForm: {
        type: "account",
        account: "",
        phone: ""
      }
    }
  },
  beforeDestroy() {
    this.$store.commit(CLEAR_MEMBER_SEARCHED_DATA)
  },
  methods: {
    onSearchSubmit() {
      this.$store.dispatch(GET_SINGLE_MEMBER, this.searchForm)
    }
  },

  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_MEMBER_DEPOSIT_LIMIT_OPTIONS)
  }
}
</script>

<style lang="stylus">
#MemberSearch 
  h5 
    font-size: 16px
    position: relative
    display: flex
    align-items center 
    justify-content center
    &:before 
      content: ""
      display: block
      border-bottom: 1px solid #ccc
      margin-right: 10px
      width: 20px
    &:after 
      content: ""
      display: block
      border-bottom: 1px solid #ccc
      flex-grow: 1
      margin-left: 10px

  p.noData
    color: #666
    font-size: 14px
      
  table 
    // margin-bottom: 25px
    th, td 
      font-size: 13px
      color: #555
    th 
      background-color: #eee 
      width: 170px
    td 
      .el-checkbox__input.is-disabled .el-checkbox__inner::after // 勾勾
        border-color: #666
      .el-checkbox__input.is-disabled .el-checkbox__inner // 勾勾框
        border-color: #ccc
        background-color: transparent
      .el-checkbox__input.is-disabled + span.el-checkbox__label // label的字
        color: #444
        font-size: 13px
</style>
