<template>
  <div class="page-title">
    <h2 v-if="title">{{title}}</h2>
    <div class="btns">
      <slot name="btns"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "",
      type: String
    }
  }
}

</script>

<style lang="stylus">
@import '../style/component/PageTitle'
</style>
