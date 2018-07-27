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

    <div class="SearchBar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="編號">
          <el-input v-model="searchForm.number" placeholder="搜尋訂單編號"></el-input>
        </el-form-item>
        <el-form-item label="會員">
          <el-select v-model="searchForm.account" placeholder="搜尋帳號">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchSubmit">
            <font-awesome-icon icon="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_DEPOSIT_STATUS_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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
      }
    }
  },
  computed: {
    ...mapState({
      statusList: state => state.Money.depositStatusList,
    })
  },
  methods: {
    async onSearchSubmit() {

    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_DEPOSIT_STATUS_LIST)
  }
}
</script>

<style lang="stylus">
.SearchBar
  padding: 10px
  background-color: #efefef 
  border-radius: 3px
  margin-top: 10px
  .el-form-item--small.el-form-item, label
    margin-bottom: 0
</style>
