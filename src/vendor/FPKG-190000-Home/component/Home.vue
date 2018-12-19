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
          <a>
            <div class="box box-margin">
              <span class="label text-primary">會員在線人數</span>
              <span class="number">{{$root.toCurrency(reviews.online)}}</span>
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
import storage from 'store2'

let initCount = 20
export default {
  mixins: [commonTool],
  components: {
  },
  data() {
    return {
      breadcrumbPath: [
        {name: null, title: "首頁"},
      ],
      count: initCount,
      interval: null,
      audio: new Audio("/static/ball.mp3")
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
      if(this.reviews.deposit || this.reviews.withdraw || this.reviews.dispense || this.reviews.bank) {
        this.audio.play()
      }
      this.count = initCount
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
    this.tick()
    if(storage.session("show_audio_alert")) {
      this.$alert("將為您開啟音效", "提示", {
          confirmButtonText: '確定',
          callback: action => {
            storage.session("show_audio_alert", false)
            this.getReviewList()
          }
        })
    }else {
      this.getReviewList()
    }
  },
  beforeDestroy() {
    clearTimeout(this.interval)
  },
  beforeRouteEnter(to, from, next) {
    if(!from.name) { // 沒有上一頁代表有「重整頁面」
      storage.session("show_audio_alert", true)
    }else {
      storage.session("show_audio_alert", false)
    }
    next()
  },
  // beforeRouteLeave(to, from, next) {

  // }
}
</script>

<style lang="stylus">
#Dashboard .center #Home #main {
  width: 100%;
}

#Home {
  .reviewBoxs {
    display: flex;
    margin-left: -20px;

    > .reload {
      margin-left: 10px;
      height: 40px;
      width: 40px;

      &:hover {
        color: #666;
      }

      .count {
        margin-right: 5px;
        font-size: 12px;
      }
    }

    > a, .box {
      flex: 1;
      text-decoration: none;
      // border: 1px solid #ccc
      border-radius: 8px;
      background-color: #efefefa3;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100px;

      &:hover {
        background-color: #dddddd;
      }

      .label {
        // 
      }

      .number {
        font-size: 32px;
        color: #666;
        // font-weight: bold
      }
    }

    > a {
      margin-left: 20px;
    }
  }
}
</style>
