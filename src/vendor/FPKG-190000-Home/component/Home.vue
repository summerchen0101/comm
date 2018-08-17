<template>
  <div id="Home">
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb></Breadcrumb>
      <div class="main-container">
        <div class="reviewBoxs">
          <div class="box">
            <span class="label text-primary">存款待審數</span>
            <span class="number">{{toCurrency(reviews.deposit)}}</span>
          </div>
          <div class="box">
            <span class="label text-primary">提款待審數</span>
            <span class="number">{{toCurrency(reviews.withdraw)}}</span>
          </div>
          <div class="box">
            <span class="label text-primary">出款待審數</span>
            <span class="number">{{toCurrency(reviews.dispense)}}</span>
          </div>
          <div class="box">
            <span class="label text-primary">銀行待審數</span>
            <span class="number">{{toCurrency(reviews.bank)}}</span>
          </div>
          <div class="box">
            <span class="label text-primary">簡訊點數</span>
            <span class="number">{{toCurrency(reviews.sms)}}</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { SET_BREADCRUMB, GET_REVIEW_LIST } from '@/vendor/FPKG-40000-VuexStore/constants'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import commonTool from '@/vendor/FPKG-120000-Util/mixins/commonTool.js'

export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: null, title: "首頁"},
      ]
    }
  },
  computed: {
    ...mapState({
      reviews: state => state.Home.reviews,
    })
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.$store.dispatch(GET_REVIEW_LIST)
  }
}
</script>

<style lang="stylus">
#Dashboard .center #Home #main
  width: 100%
#Home 
  .reviewBoxs
    display: flex 
    margin-left: -20px
    > .box 
      flex: 1
      // border: 1px solid #ccc 
      border-radius: 8px
      background-color: #efefefa3
      display: flex 
      justify-content space-around 
      align-items center
      height 100px
      margin-left: 20px
      .label 
        //
      .number 
        font-size: 32px
        color: #666
        // font-weight: bold
        
</style>
