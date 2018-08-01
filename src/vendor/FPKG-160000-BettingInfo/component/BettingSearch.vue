<template>
  <div id="BettingSearch">
    <SearchBar>
      <el-form :inline="true" 
                ref="searchForm"
                :model="searchForm"
                :rules="searchFormRules">
        <el-form-item label="類型">
          <el-input v-model="searchForm.type" placeholder="類型"></el-input>
        </el-form-item>
        <el-form-item label="注單編號">
          <el-input v-model="searchForm.number" placeholder="搜尋注單編號"></el-input>
        </el-form-item>
        <el-form-item class="float-right mr-0">
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </SearchBar>
    <div class="table-responsive mt-3">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>注單編號</th>
            <td></td>
          </tr>
          <tr>
            <th>下注時間</th>
            <td></td>
          </tr>
          <tr>
            <th>IP</th>
            <td></td>
          </tr>
          <tr>
            <th>帳號(暱稱)</th>
            <td></td>
          </tr>
          <tr>
            <th>遊戲</th>
            <td></td>
          </tr>
          <tr>
            <th>投注內容</th>
            <td></td>
          </tr>
          <tr>
            <th>投注金額</th>
            <td></td>
          </tr>
          <tr>
            <th>有效金額</th>
            <td></td>
          </tr>
          <tr>
            <th>中獎金額</th>
            <td></td>
          </tr>
          <tr>
            <th>會員結果</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>

<script>
import { SET_BREADCRUMB } from '@/vendor/FPKG-40000-VuexStore/constants'

export default {
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {link: "/", title: "首頁"},
        {link: null, title: "注單資訊"},
        {link: null, title: "注單查詢"},
      ],
      searchForm: {
        type: "",
        number: ""
      },
      searchFormRules: {
        type: [
          { required: true, message: '類型為必填', trigger: 'blur' },
        ],
        number: [
          { required: true, message: '注單編號為必填', trigger: 'blur' },
        ],
      }
    }
  },

  methods: {
    onSearchSubmit() {

    }
  },
  

  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
  }
}
</script>

<style lang="stylus">
@import '../style/component/BettingSearch'
</style>
