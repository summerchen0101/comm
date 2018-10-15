<template>
  <div style="margin-left:32px; margin-top:16px;">
    <el-form :inline="true" ref="searchForm">
      <el-form-item prop="account" style="margin-bottom:2px;">
        <el-col :span="6">
          <label style="color:#fff;">會員</label>
        </el-col>
        <el-col :span="18">
          <el-input v-model.trim="searchKey" placeholder="帳號/手機號碼"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="float-right">
        <el-button type="primary" @click="onSearchSubmit">
          <font-awesome-icon icon="search" />
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SET_MEMBER_SEARCH_KEY, GET_MEMBER_SEARCH_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      searchKey: ""
    }
  },
  methods: {
    ...mapMutations({
      SET_MEMBER_SEARCH_KEY
    }),
    async onSearchSubmit() {
      this.$store.dispatch(SET_MEMBER_SEARCH_KEY, this.searchKey)
      await this.$store.dispatch(GET_MEMBER_SEARCH_LIST, { search: this.searchKey })
      this.$router.push({ path: '/member/manage' })
    }
  },
}
</script>

