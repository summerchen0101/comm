<template>
  <transition name="fade">
    <div v-if="show" class="loading-cover">
      <h4>{{msg}}</h4>
      <!-- <font-awesome-icon :icon="['fas', 'fa-circle-notch', 'fa-spin', 'fa-3x']" /> -->
      <font-awesome-icon icon="circle-notch" spin size="2x" />
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
    show: {
      default: false,
      type: Boolean
    }
  }
}

</script>

<style lang="stylus">
@import '../style/component/LoadingCover'
</style>
