<template>
  <transition name="fade">
    <div v-if="$store.state.Widget.displayLoadingCover" class="loading-cover">
      <div class="text-center">
        <h3>{{msg}}</h3>
        <font-awesome-icon icon="circle-notch" spin size="3x" /><br>
        <div class="mt-3 text-center">
          <el-button @click="$store.commit('SWITCH_LOADING_COVER', false)">關 閉</el-button>
        </div>
      </div>
      <slot></slot>
    </div>
  </transition>
  
</template>

<script>
export default {
  props: {
    msg: {
      default: "Loading", // 載入中請稍候...
      type: String
    },
  }
}

</script>

<style lang="stylus">
@import '../style/component/LoadingCover'
</style>
