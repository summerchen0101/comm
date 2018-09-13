<template>
  <div id="Home">
    <MobileMenu></MobileMenu>
    <div id="main">
      <Breadcrumb></Breadcrumb>
      <div class="main-container">
        <div class="reviewBoxs">
          <router-link :to="{name: 'Deposit'}">
            <div class="box box-margin">
              <span class="label text-primary">存款待審數</span>
              <span class="number">{{$root.toCurrency(reviews.deposit)}}</span>
            </div>
          </router-link>
          <router-link :to="{name: 'Withdraw'}">
            <div class="box box-margin">
              <span class="label text-primary">提款待審數</span>
              <span class="number">{{$root.toCurrency(reviews.withdraw)}}</span>
            </div>
          </router-link>
          <router-link :to="{name: 'Dispense'}">
            <div class="box box-margin">
              <span class="label text-primary">出款待審數</span>
              <span class="number">{{$root.toCurrency(reviews.dispense)}}</span>
            </div>
          </router-link>
          <router-link :to="{name: 'BankAcc'}">
            <div class="box box-margin">
              <span class="label text-primary">銀行待審數</span>
                <span class="number">{{$root.toCurrency(reviews.bank)}}</span>
            </div>
          </router-link>
          <a href="https://www.twsms.com/" target="_blank">
            <div class="box box-margin">
              <span class="label text-primary">簡訊點數</span>
              <span class="number">{{$root.toCurrency(reviews.sms)}}</span>
            </div>
          </a>
          <div class="reload pointer" @click="getReviewList">
            <span class="count">{{count}}</span>
            <font-awesome-icon icon="sync-alt" :spin="isLoading" />
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
      ],
      count: 60,
      interval: null
    }
  },
  computed: {
    ...mapState({
      reviews: state => state.Home.reviews,
      isLoading: state => state.Home.isLoadingReviews,
    })
  },
  methods: {
    async getReviewList() {
      await this.$store.dispatch(GET_REVIEW_LIST)
      this.count = 60
    },
    async tick() {
      this.count--
      if(this.count === 0) {
        await this.getReviewList()
      }
      this.interval = setTimeout(this.tick, 1000)
    }
  },
  mounted() {
    this.$store.commit(SET_BREADCRUMB, this.breadcrumbPath)
    this.getReviewList()
    this.tick()
  },
  beforeDestroy() {
    clearTimeout(this.interval)
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
    > .reload
      margin-left: 10px
      height: 40px
      width: 40px
      &:hover
        color: #666
      .count
        margin-right: 5px
        font-size: 12px
    > a , .box
      flex: 1
      text-decoration: none
      // border: 1px solid #ccc
      border-radius: 8px
      background-color: #efefefa3
      display: flex
      justify-content space-around
      align-items center
      height 100px
      &:hover
        background-color: #dddddd
      .label
        //
      .number
        font-size: 32px
        color: #666
        // font-weight: bold
    > a
      margin-left: 20px
</style>
